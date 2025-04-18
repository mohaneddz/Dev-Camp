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

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
});

type LoginValuesType = z.infer<typeof loginFormSchema>;

const defaultValues: LoginValuesType = {
  email: "",
  password: "",
};

type LoginFormProps = {
  onSuccess?: () => void;
};

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<LoginValuesType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  async function handleLogin(values: LoginValuesType) {
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) return toast.error(error.message);

    toast.success("Successfully signed in!");
    console.log("Successfully signed in!");
    router.replace("/dashboard");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="w-full space-y-8 justify-center itmes-center content-center"
      >
        <AnimatedInputForm
          name="email"
          placeholder="Email"
          required
        />

        <AnimatedInputForm
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <div className="flex justify-center items-center content-center">
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              color1="#FF6B6B"
              color2="#FF8E8E"
              className="w-max rounded-full text-sm font-semibold transition-all duration-200 mt-2 px-6 py-4"
            >
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
