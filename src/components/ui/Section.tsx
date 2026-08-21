import { CSSProperties, ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  containerClassName = "",
  style,
  id,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  style?: CSSProperties;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-[88px] ${className}`} style={style}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <h6 style={{ color: "var(--color-accent-700)" }}>{eyebrow}</h6>}
      <h2 className="mt-1.5">{title}</h2>
      {description && <p className="text-muted mt-2 text-[15px]">{description}</p>}
    </div>
  );
}
