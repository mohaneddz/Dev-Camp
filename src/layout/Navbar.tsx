import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { signOut } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/utils/supabase/server";
import { User } from "lucide-react";

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-primary/50 dark:bg-primary-dark-1/70">

      <div className="py-4 px-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5C17.3 5 14.7 5.8 12.5 7.3C10.3 8.8 8.6 10.9 7.7 13.4C6.7 15.9 6.5 18.6 7 21.2C7.5 23.8 8.8 26.1 10.6 27.9C12.4 29.7 14.7 31 17.3 31.5C19.9 32 22.6 31.8 25.1 30.8C27.6 29.9 29.7 28.2 31.2 26C32.7 23.8 33.5 21.2 33.5 18.5" stroke="#8fd1d8" strokeWidth="3" strokeLinecap="round" />
                <path d="M17.5 16.3C17.5 15.2 18 14.3 18.8 13.8C19.2 13.5 19.6 13.3 20 13.3C20.4 13.3 20.8 13.4 21.2 13.7C22 14.2 22.5 15.1 22.5 16.3C22.5 17.4 22 18.3 21.2 18.8C20.8 19.1 20.4 19.2 20 19.2C19.6 19.2 19.2 19.1 18.8 18.8C18 18.3 17.5 17.4 17.5 16.3Z" fill="#a143fd" />
                <path d="M22.5 23.8C22.5 22.7 22 21.8 21.2 21.3C20.8 21 20.4 20.8 20 20.8C19.6 20.8 19.2 20.9 18.8 21.2C18 21.7 17.5 22.6 17.5 23.8C17.5 24.9 18 25.8 18.8 26.3C19.2 26.6 19.6 26.7 20 26.7C20.4 26.7 20.8 26.6 21.2 26.3C22 25.8 22.5 24.9 22.5 23.8Z" fill="#a143fd" />
              </svg>
            </div>
            <div className="ml-2">
              <span className="font-medium text-tertiary dark:text-white">Foreseen</span>
              <span className="text-xs text-primary dark:text-primary-light">-AI</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm text-tertiary dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm text-tertiary dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors">
            About
          </Link>
          <Link href="/princing" className="text-sm text-tertiary dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors">
            Pricings
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex">
            {!user && (
              <Link href="/login">
                <Button variant="ghost" className="text-tertiary dark:text-white hover:text-primary dark:hover:text-primary-light">
                  Log In
                </Button>
              </Link>
            )}
          </div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="text-tertiary dark:text-white hover:text-primary dark:hover:text-primary-light">
                  <User />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent sideOffset={5} className="bg-background dark:bg-background-dark">
                <DropdownMenuLabel className="text-tertiary dark:text-white">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link className="cursor-pointer text-tertiary dark:text-white hover:text-primary dark:hover:text-primary-light" href="/profile">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0" asChild>
                  <form action={signOut}>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="rounded-sm w-full"
                      type="submit"
                    >
                      Logout
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
