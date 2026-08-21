import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-accent)] text-white hover:bg-[color:var(--color-accent-dark)]",
  secondary:
    "bg-emerald-600 text-white hover:bg-emerald-700",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-[color:var(--color-navy-900)]",
  ghost: "bg-[color:var(--color-navy-800)] text-white hover:bg-[color:var(--color-navy-700)]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  dataAttrs?: Record<string, string>;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  dataAttrs = {},
  ...rest
}: CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const dataProps = Object.fromEntries(Object.entries(dataAttrs).map(([k, v]) => [`data-${k}`, v]));

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...dataProps}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...dataProps}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  dataAttrs = {},
  ...rest
}: CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  const dataProps = Object.fromEntries(Object.entries(dataAttrs).map(([k, v]) => [`data-${k}`, v]));
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...dataProps} {...rest}>
      {children}
    </button>
  );
}
