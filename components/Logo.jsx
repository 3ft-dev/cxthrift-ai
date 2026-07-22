import Image from "next/image";

export default function Logo({ size = 32, showWordmark = true }) {
  return (
    <span className="flex items-center gap-2 font-extrabold text-[20px] tracking-tight text-ink">
      <Image src="/logo.png" alt="cxThrift" width={size} height={size} className="rounded-full" priority />
      {showWordmark && (
        <span>
          cx<span className="grad-text">Thrift</span>
        </span>
      )}
    </span>
  );
}
