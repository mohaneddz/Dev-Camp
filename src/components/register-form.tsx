"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AnimatedInputForm } from "@/components/ui/input/animated-input-form";
import { createClient } from "@/lib/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Link from "next/link";

export const registerFormSchema = z.object({
  email: z.string().email(),
  phone_number: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  niche: z.string().min(1, {
    message: "Please select a niche.",
  }),
});

type RegisterValuesType = z.infer<typeof registerFormSchema>;

const defaultValues: RegisterValuesType = {
  email: "",
  phone_number: "",
  name: "",
  niche: "",
};

const nicheOptions = [
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "electronics", label: "Electronics" },
  { value: "home", label: "Home & Living" },
  { value: "fitness", label: "Fitness" },
  { value: "food", label: "Food & Beverage" },
];

type LoginFormProps = {
  onSuccess?: () => void;
};

const RegisterForm = ({ onSuccess }: LoginFormProps) => {
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<RegisterValuesType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });

  async function handleRegister(values: RegisterValuesType) {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: "temporary-password", // This should be handled properly in a real app
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
        data: {
          name: values.name,
          phone_number: values.phone_number,
          niche: values.niche,
        },
      },
    });

    if (error) return toast.error(error.message);
    toast.success("Account created successfully!");
    router.replace("/dashboard");
    // onSuccess && onSuccess();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="w-full space-y-6 "
      >
        <AnimatedInputForm
          name="email"
          placeholder="Email"
        />

        <AnimatedInputForm
          name="phone_number"
          placeholder="Phone Number"
        />

        <AnimatedInputForm
          name="name"
          placeholder="User Name"
        />

        <select
          {...form.register("niche")}
          className="w-full bg-input rounded-lg shadow-sm border-0 px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#FF6B6B] transition-all text-gray-500"
        >
          <option value="">Products type</option>
          {nicheOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Button
          type="button"
          variant="outline"
          className="font-bold py-4 w-full cursor-pointer text-white bg-secondary-dark dark:bg-tertiary rounded-lg py-2.5 text-sm font-normal border-0 shadow-sm hover:bg-secondary-dark/90 dark:hover:bg-tertiary/90 hover:scale-105 active:scale-95 hover:shadow-lg dark:hover:shadow-tertiary/20 transition-all duration-200"
        >
          Connect to your shop
        </Button>

        <Button
          type="button"
          variant="outline"
          className="font-bold py-4 w-full cursor-pointer text-white bg-secondary-dark dark:bg-tertiary rounded-lg py-2.5 text-sm font-normal border-0 shadow-sm hover:bg-secondary-dark/90 dark:hover:bg-tertiary/90 hover:scale-105 active:scale-95 hover:shadow-lg dark:hover:shadow-tertiary/20 transition-all duration-200"
        >
          Connect to your meta account
        </Button>
        <div className="flex justify-center items-center">
        <Button
          type="submit"
          className="w-max bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold transition-all duration-200 mt-2 px-6 py-4 hover:scale-105 active:scale-95 hover:shadow-lg dark:hover:shadow-primary/20"
        >
          Sign Up
        </Button>
        </div>
        <div className="text-center pt-1">
          <p className="text-xs text-gray-400">
            You already have an account?{" "}
            <button onClick={onSuccess} className="text-primary font-medium hover:underline">
              log in to your account
            </button>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
