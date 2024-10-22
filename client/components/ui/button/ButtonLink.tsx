"use client"
import { ReactNode, forwardRef, AnchorHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import LoadingSpinner from "../loader/Spinner";

export type LinkVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type LinkSize = 'default' | 'sm' | 'lg' | 'icon';

type LinkProps = {
  children?: ReactNode;
  className?: string;
  variant?: LinkVariant;
  size?: LinkSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  href: string; // Mandatory prop for links
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(({
  children = "Link",
  className,
  variant = 'default',
  size = 'default',
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  href,
  ...rest
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };

  return (
    <Link
      href={href}
      ref={ref}
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        isLoading && "cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          {loadingText || children}
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </Link>
  );
});

ButtonLink.displayName = "ButtonLink";

export default ButtonLink;
