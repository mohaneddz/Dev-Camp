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
import Image from 'next/image';

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-gradient-to-b from-primary-dark-3/80 dark:from-primary-light/70 via-transparent-[90%] to-transparent ">

      <div className="py-4 px-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" width={10} height={10} alt={"logo"} />
            <div className="ml-2">
              <span className="font-medium text-tertiary dark:text-white">Foreseen</span>
              <span className="text-xs text-primary dark:text-primary-light">-AI</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-sm text-tertiary dark:text-white/70 hover:text-primary dark:text-black dark:hover:text-primary-light transition-colors">
            Dashboard
          </Link>
          <Link href="/about" className="text-sm text-tertiary dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors">
            About
          </Link>
          <Link href="/pricing" className="text-sm text-tertiary dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors">
            Pricings
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex">
            {!user && (
              <Link href="/login">
                <button className="text-black dark:text-white hover:text-slate-400 hover:cursor:pointer hover:scale-110">
                  Log In
                </button>
              </Link>
            )}
          </div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="text-tertiary hover:text-primary dark:hover:text-primary-light">
                  <User />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent sideOffset={5} className="bg-background dark:bg-background-dark">
                <DropdownMenuLabel className="text-tertiary dark:text-black">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link className="cursor-pointer text-tertiary dark:text-black hover:text-primary dark:hover:text-primary-light" href="/profile">
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
