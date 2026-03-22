import React from "react";
import type { TextareaFieldProps } from "../../interfaces/global.interface";

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ id, label, error, className = "", borderless = false, ...props }, ref) => {
    const baseTextarea = "w-full rounded-[8px] text-heading placeholder:text-placeholder focus:outline-none transition-all duration-150 resize-none";
    const standardTextarea = `bg-input border ${error ? 'border-heart' : 'border-edge'} p-4 text-[14px] font-normal focus:border-brand focus:shadow-[0_0_0_2px_rgba(13,147,242,0.2)]`;
    const borderlessTextarea = `bg-transparent border-none p-0 text-[18px] font-medium`;

    return (
      <div className="flex flex-col gap-[6px]">
        {label && (
          <label htmlFor={id} className="text-[14px] font-normal text-heading">
            {label}
          </label>
        )}
        <textarea
          {...props}
          ref={ref}
          id={id}
          className={`${baseTextarea} ${borderless ? borderlessTextarea : standardTextarea} ${className}`}
        />
        {error && <p className="text-[12px] font-normal text-heart">{error}</p>}
      </div>
    );
  }
);

TextareaField.displayName = 'TextareaField';
