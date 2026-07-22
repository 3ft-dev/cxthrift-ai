import Link from "next/link";

const VARIANTS = {
  grad: "grad-bg text-white shadow-[0_8px_24px_rgba(10,92,255,.22)] hover:shadow-[0_12px_32px_rgba(10,92,255,.28)] hover:-translate-y-px",
  dark: "bg-ink text-white hover:opacity-90",
  outline: "bg-white border border-line text-ink hover:border-ink",
};

export default function Pill({
  href,
  onClick,
  type = "button",
  variant = "outline",
  size = "md",
  className = "",
  disabled = false,
  children,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all active:scale-[.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";
  const sizeCls = size === "sm" ? "px-3.5 py-2 text-[12.5px]" : "px-5 py-[11px] text-sm";
  const cls = `${base} ${sizeCls} ${VARIANTS[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
