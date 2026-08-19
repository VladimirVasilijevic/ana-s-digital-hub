import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
  tone = "default",
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-8 px-5 py-14 sm:py-16",
        tone === "muted" && "bg-muted",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl">
        {title ? (
          <header className="mb-7 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl">{title}</h2>
            {subtitle ? (
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{subtitle}</p>
            ) : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
