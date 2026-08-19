import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const { cta } = product;

  return (
    <article className="fade-up flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-200 hover:shadow-lg">
      {product.image ? (
        <img
          src={product.image}
          alt={`Naslovna ilustracija — ${product.title}`}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl">
          {product.emoji ? <span aria-hidden="true">{product.emoji} </span> : null}
          {product.title}
        </h3>
        <p className="flex-1 text-[15px] leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
        {product.price ? (
          <p className="font-display text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </p>
        ) : null}
        <div className="pt-1">
          {cta.to ? (
            <Button asChild variant="hero" size="touch" className="w-full sm:w-auto">
              <Link to={cta.to}>{cta.label}</Link>
            </Button>
          ) : (
            <Button asChild variant="hero" size="touch" className="w-full sm:w-auto">
              <a href={cta.href} target="_blank" rel="noopener noreferrer">
                {cta.label}
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
