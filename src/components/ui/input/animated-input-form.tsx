import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils/cn";
import { AnimatedInput } from "./animated-input";

export interface AnimatedInputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  containerClassName?: string;
  control?: any;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const AnimatedInputForm = React.forwardRef<HTMLInputElement, AnimatedInputFormProps>(
  (
    {
      className,
      containerClassName,
      name,
      label,
      control,
      description,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const form = useFormContext();
    const formControl = control || form?.control;

    return (
      <FormField
        control={formControl}
        name={name}
        render={({ field, formState }) => (
          <FormItem className={cn("w-full space-y-1", containerClassName)}>
            {label && (
              <div className="text-sm font-medium">
                {label}{" "}
                {props?.required && <span className="text-destructive">*</span>}
              </div>
            )}

            <FormControl>
              <AnimatedInput
                {...field}
                ref={ref}
                {...props}
                name={name}
                disabled={formState.isSubmitting}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
              />
            </FormControl>

            {description && <div className="text-sm text-muted-foreground">{description}</div>}

            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

AnimatedInputForm.displayName = "AnimatedInputForm";

export { AnimatedInputForm }; 