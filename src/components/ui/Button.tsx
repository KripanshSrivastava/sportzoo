import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base = "btn disabled:opacity-45 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  // For use on dark (navy) sections — border/text tuned to sit on --color-accent-900.
  outline: "btn-outline-dark",
  ghost: "btn-ghost",
};

const sizes: Record<Size, string> = {
  md: "",
  lg: "px-7 py-3.5 text-[15px]",
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
