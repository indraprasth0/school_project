"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isShowTwoFactor, setIsShowTwoFactor] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (typeof data?.success === "string") {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.isTwoFactor) {
            setIsShowTwoFactor(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setError(`Something went wrong! in login: error: ${error}`);
        });
    });
  };

  return (
    <div>
      {isShowTwoFactor ? (        
        <CardWrapper
          headerLabel="Please code confirmation"
          backButtonLabel="Back to login or Refresh page"
          backButtonHref="/login"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-p800"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="123456"
                          className="text-p950 shadow-sm  placeholder:text-p950/40"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
              <Button
                variant="yellowed"
                className="w-full"
                type="submit"
                disabled={isPending}
              >
                Confirm
              </Button>
            </form>
          </Form>
        </CardWrapper>
      ) : (
        <CardWrapper
          headerLabel="Welcome back"
          backButtonLabel="Don't have an account"
          backButtonHref="/register"
          showSocial
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-p800"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="result@resultplus.com"
                          type="email"
                          className="text-p950 shadow-sm  placeholder:text-p950/40"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                          className="text-p950 shadow-sm placeholder:text-p950/40"
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0 text-p800 hover:text-yellow-300"
                        asChild
                      >
                        <Link href="/reset">Forgot Password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
              <Button
                variant="yellowed"
                className="w-full"
                type="submit"
                disabled={isPending}
              >
                Login
              </Button>
            </form>
          </Form>
        </CardWrapper>
      )}
    </div>
  );
};