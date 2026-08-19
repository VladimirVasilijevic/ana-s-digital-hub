import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "soft";
type Size = "md" | "lg";

const base =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.99] sm:w-auto";

const sizes: Record<Size, string> = {
  md: "min-h-11 py-2.5 text-[15px]",
  lg: "min-h-13 py-3.5",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90",
  outline:
    "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary",
  soft: "bg-secondary text-secondary-foreground hover:bg-primary-soft/60",
};

type StyleProps = { variant?: Variant; size?: Size; className?: string };

export const buttonClasses = ({ variant = "primary", size = "md", className }: StyleProps = {}) =>
  cn(base, sizes[size], variants[variant], className);

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: StyleProps & ComponentProps<"button"> & { children: ReactNode }) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: StyleProps & ComponentProps<"a"> & { children: ReactNode }) {
  const external = props.href?.startsWith("http");
  return (
    <a
      className={buttonClasses({ variant, size, className })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

export function ButtonRouterLink({
  variant,
  size,
  className,
  children,
  ...props
}: StyleProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
