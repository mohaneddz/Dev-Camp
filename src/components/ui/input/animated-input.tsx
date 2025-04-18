import React, { useState } from 'react';
import { cn } from "@/lib/utils/cn";

export interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  visible?: string;
}

export const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({
    id,
    name,
    type = "text",
    placeholder = "",
    error = "",
    disabled = false,
    required = false,
    className = "",
    leftIcon,
    rightIcon,
    onChange,
    readOnly,
    onBlur,
    visible,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    return (
      <div className="group relative mb-[0.5rem] sm:mb-[1rem] w-full">
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            placeholder=""
            className={cn(`
              peer
              w-full 
              py-[15px] px-[15px]
              border-2 border-transparent 
              rounded-xl 
              bg-input
              outline-none 
              transition-all 
              duration-400 
              ease-in-out
              text-xs
              sm:text-md
              md:text-lg
              relative 
              z-[1]
              focus:border-primary-light
              focus:bg-tertiary-200
              focus:shadow-[0_10px_20px_rgba(147,51,234,0.2)]
              focus:scale-[1.05]
              ${leftIcon ? 'pl-12' : ''}
              ${rightIcon ? 'pr-12' : ''}
              ${error ? 'border-[#ff6b6b] animate-shake' : ''}
              ${visible === "none" ? 'pointer-events-none readonly' : ''}
            `, className)}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
          />

          <label
            htmlFor={id}
            className={`
              absolute 
              top-1/2 
              left-[15px] 
              -translate-y-1/2 
              text-[#aaa] 
              text-xs
              md:text-base 
              pointer-events-none 
              transition-all 
              duration-300 
              ease-in-out 
              opacity-70
              z-[2]
              group-focus-within:top-[-12px]
              group-focus-within:left-[15px]
              group-focus-within:text-[12px]
              group-focus-within:opacity-100
              group-focus-within:text-primary-light
              peer-[:not(:placeholder-shown)]:top-[-12px]
              peer-[:not(:placeholder-shown)]:left-[15px]
              peer-[:not(:placeholder-shown)]:text-[12px]
              peer-[:not(:placeholder-shown)]:opacity-100
              peer-[:not(:placeholder-shown)]:text-primary-light
            `}
          >
            {placeholder}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
              {rightIcon}
            </div>
          )}
        </div>

        {error && visible !== "none" && (
          <p
            id={`${id}-error`}
            className="mt-2 text-xs text-red-500/70 font-normal pl-1"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";

export default AnimatedInput; 