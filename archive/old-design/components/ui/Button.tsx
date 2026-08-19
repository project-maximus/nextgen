import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  // Gold fails contrast with white text (~1.8:1) — near-black text on the
  // gold fill passes at ~10:1 instead.
  primary:
    "bg-accent-600 text-neutral-900 hover:bg-accent-700 active:bg-accent-700 disabled:bg-neutral-200 disabled:text-neutral-400",
  secondary:
    "bg-white text-neutral-900 border border-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-200",
  ghost:
    "bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 disabled:text-neutral-400",
  link: "bg-transparent text-navy underline underline-offset-4 hover:text-navy-deep p-0 h-auto disabled:text-neutral-400",
  danger:
    "bg-error text-white hover:bg-error/90 active:bg-error/90 disabled:bg-neutral-200 disabled:text-neutral-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-base gap-2",
  lg: "h-13 px-8 text-lg gap-2.5",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out hover:-translate-y-px disabled:cursor-not-allowed disabled:translate-y-0 whitespace-nowrap";

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton
  extends SharedProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface ButtonAsLink extends SharedProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight,
    loading = false,
    className,
    children,
  } = props;

  const classes = cn(
    baseClasses,
    variant !== "link" && sizeClasses[size],
    variantClasses[variant],
    className,
  );

  const content = (
    <>
      {loading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        iconLeft
      )}
      <span className={loading ? "opacity-0" : undefined}>{children}</span>
      {!loading && iconRight}
    </>
  );

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props;
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} className={cn(classes, "relative")}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, iconLeft: _il, iconRight: _ir, loading: _l, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;

  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      aria-busy={loading || undefined}
      className={cn(classes, "relative")}
    >
      {content}
    </button>
  );
}
