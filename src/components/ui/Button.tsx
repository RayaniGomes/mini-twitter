import React from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  'data-testid'?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, 'data-testid': dataTestId, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-bold transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none";
    
    const variants = {
      primary: "bg-brand text-white hover:bg-[#0B7DD1] shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)] focus:ring-2 focus:ring-brand focus:ring-offset-2",
      outline: "bg-transparent border border-edge text-heading hover:bg-black/5 dark:hover:bg-white/5",
      ghost: "bg-transparent text-heading hover:bg-black/5 dark:hover:bg-white/5"
    };
    
    const sizes = {
      sm: "h-8 px-4 text-[14px] rounded-[8px]",
      md: "px-6 py-2 text-[16px] rounded-[8px]",
      lg: "h-[56px] px-8 text-[16px] rounded-full",
      full: "w-full h-[56px] text-[16px] rounded-full"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        data-testid={dataTestId}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
