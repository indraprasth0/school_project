"use client";

import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  
  const onSubmit = useCallback(() => {
    if (!token) {
      setSuccess(null);
      setError("Token is missing!");
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data?.success) {
          setError(null); // clear any previous error
          setSuccess(data.success);
        } else if (data?.error) {
          setSuccess(null); // clear any previous success
          setError(data.error);
        } else {
          setSuccess(null);
          setError("Unknown response from server.");
        }
      })
      .catch(() => {
        setSuccess(null);
        setError("Something went wrong in new-verification!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center">        
        {!success && !error && <BeatLoader color="#fff" size={15} />}
        {!!error && <FormError message={error} />}
        {!!success && <FormSuccess message={success} />}
      </div>
    </CardWrapper>
  );
};