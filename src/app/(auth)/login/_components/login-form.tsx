"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/ui/input/input-form";
import { createClient } from "@/lib/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type LoginValuesType = z.infer<typeof loginFormSchema>;

const defaultValues: LoginValuesType = {
  email: "",
  password: "",
};

const LoginForm = () => {
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
    router.replace("/dashboard");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="w-full space-y-4"
      >
        <InputForm
          label=""
          name="email"
          placeholder="e-mail"
          description=""
          required
          className="bg-white/10 backdrop-blur-sm rounded-lg border-0 px-4 py-2.5 text-sm text-white placeholder:text-gray-300 focus:ring-1 focus:ring-white/50"
        />

        <InputForm
          type="password"
          label=""
          name="password"
          placeholder="password"
          description=""
          required
          className="bg-white/10 backdrop-blur-sm rounded-lg border-0 px-4 py-2.5 text-sm text-white placeholder:text-gray-300 focus:ring-1 focus:ring-white/50"
        />

        <Button 
          type="submit"
          className="w-full bg-white hover:bg-gray-100 text-[#1E0E2F] rounded-lg py-2.5 text-sm font-semibold transition-colors mt-2"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
