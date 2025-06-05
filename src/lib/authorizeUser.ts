"use server";
import { LoginSchema } from "@/schemas";
import { getUserByEmailPasswordWithMatch } from "@/data/user";

interface Credentials {
  email: string;
  password: string;
}

export async function authorizeUser(credentials: Credentials) {
  const validated = LoginSchema.safeParse(credentials);

  if (!validated.success) return null;

  const { email, password } = validated.data;
  const user = await getUserByEmailPasswordWithMatch(email, password);
  if (!user) return { success: false, message: "User not found" };

  // console.log("User authorized successfully:", user);

  return { success: true, data: user.data };
}

// export async function authorizeUserAction(
//   credentials: Partial<Record<string, unknown>>
// ): Promise<IActionResponce> {
//   let validatedData: yup.InferType<typeof LoginSchema>;
//   try {
//     validatedData = await LoginSchema.validate(credentials, {
//       abortEarly: false,
//       stripUnknown: true,
//       strict: true,
//     });
//   } catch (error: any) {
//     throw new Error("Invalid data.");
//   }

//   const { email, password } = validatedData;

//   const user: IUser | null = await getUserWithPasswordByEmail(email).catch(
//     (error: any) => {
//       throw new Error("Something went wrong " + error.message);
//     }
//   );
//   if (!user) {
//     return { success: false, message: "User not found" };
//   }

//   if (user && !user.password) {
//     return {
//       success: false,
//       message:
//         "User cannot login with credentials. Use other authorization method.",
//     };
//   }
//   const isPasswordMatch = await bcrypt.compare(password, user.password!);
//   if (!isPasswordMatch) {
//     return { success: false, message: "Username and password do not match." };
//   }
//   const plainObjectUser: { id: string } = {
//     id: user._id.toString(),
//   };

//   return { success: true, data: plainObjectUser };
// }