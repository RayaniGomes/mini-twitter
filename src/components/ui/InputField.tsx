import React, { useState } from "react";
import type { InputFieldProps } from "../../interfaces/global.interface";
import { Eye, EyeSlash } from "iconsax-react";

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, type, placeholder, icon, error, borderless = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const baseInput = "w-full rounded-[8px] text-heading placeholder:text-placeholder focus:outline-none transition-all duration-150";
    const standardInput = `h-[57px] bg-input border ${error ? 'border-heart' : 'border-edge'} px-4 ${icon || isPassword ? 'pr-12' : 'pr-4'} text-[14px] font-normal focus:border-brand focus:shadow-[0_0_0_2px_rgba(13,147,242,0.2)]`;
    const borderlessInput = `h-[45px] bg-transparent border-none px-0 text-[16px] font-bold`;

    return (
      <div className="flex flex-col gap-[6px]">
        {label && (
          <label htmlFor={id} className="text-[14px] font-normal text-heading">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            {...props}
            ref={ref}
            id={id}
            type={inputType}
            placeholder={placeholder}
            className={`${baseInput} ${borderless ? borderlessInput : standardInput}`}
          />
          {(icon || isPassword) && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
              {isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="flex items-center justify-center text-muted hover:text-heading transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeSlash size={24} color="#62748E" /> : <Eye size={24} color="#62748E" />}
                </button>
              ) : (
                icon
              )}
            </div>
          )}
        </div>
        {error && <p className="text-[12px] font-normal text-heart">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';