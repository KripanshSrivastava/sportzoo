import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/**
 * The four corner registration marks used throughout the blueprint design
 * system. `color` overrides the default (dark-on-light) tick color — pass a
 * light neutral when the wrapper sits on a dark section.
 */
export function BlueprintCorners({ color }: { color?: string } = {}) {
  const style = color ? { color } : undefined;
  return (
    <>
      <i className="corner tl" style={style} aria-hidden="true" />
      <i className="corner tr" style={style} aria-hidden="true" />
      <i className="corner bl" style={style} aria-hidden="true" />
      <i className="corner br" style={style} aria-hidden="true" />
    </>
  );
}

type BlueprintProps<T extends ElementType> = {
  children: ReactNode;
  className?: string;
  as?: T;
  cornerColor?: string;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className" | "as">;

/** A hairline-bordered panel with corner marks — the system's default card/panel frame. */
export function Blueprint<T extends ElementType = "div">({
  children,
  className = "",
  as,
  cornerColor,
  ...rest
}: BlueprintProps<T>) {
  const Comp = (as ?? "div") as ElementType;
  return (
    <Comp className={`blueprint ${className}`} {...rest}>
      <BlueprintCorners color={cornerColor} />
      {children}
    </Comp>
  );
}
