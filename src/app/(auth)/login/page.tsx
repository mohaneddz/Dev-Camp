import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link";
import LoginForm from "./_components/login-form";

const LoginPage = () => {
  return (
    <section className=" flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg pt-12 p-6 space-y-6 transform transition-transform duration-300 hover:scale-105">
        <Button variant="outline" asChild>
          <Link href="/" className={cn("absolute left-4 top-4 flex items-center text-gray-600 dark:text-gray-200")}>
            <ChevronLeftCircle className="mr-2 h-5 w-5" />
            Back
          </Link>
        </Button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Enter your email and password to sign in to your account
          </p>
        </div>

        <LoginForm />

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <Link
              href="/register"
              className="text-green-600 dark:text-green-600 hover:text-green-700 dark:hover:text-green-500 font-semibold underline"
            >
              Don&apos;t have an account? Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
