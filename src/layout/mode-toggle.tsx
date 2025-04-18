"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="text-black dark:text-white hover:text-primary dark:hover:text-primary-light">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-black dark:text-white hover:text-primary dark:hover:text-primary-light">
          {resolvedTheme === 'light' ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={5} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value)}
        >
          <DropdownMenuRadioItem value="light" className="text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-light focus:bg-gray-100 dark:focus:bg-gray-700">
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-light focus:bg-gray-100 dark:focus:bg-gray-700">
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" className="text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-light focus:bg-gray-100 dark:focus:bg-gray-700">
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
