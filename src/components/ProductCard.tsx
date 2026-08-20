import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { Product } from "@/services/types";
import { formatPrice } from "@/lib/format";
import { mediaUrl } from "@/lib/media-url";

export function ProductCard({ product }: { product: Product }) {
  const image = mediaUrl(product.image_url);

  return (
    <article className="fade-up flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-200 hover:shadow-lg">
      {image ? (
        <img
          src={image}
          alt={`Naslovna ilustracija — ${product.title}`}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl">{product.title}</h3>
        <p className="flex-1 text-[15px] leading-relaxed text-muted-foreground">
          {product.short_description}
        </p>
        {product.price_amount ? (
          <p className="font-display text-lg font-bold text-primary">
            {formatPrice({ amount: product.price_amount, currency: product.price_currency })}
          </p>
        ) : null}
        <div className="pt-1">
          <Button asChild variant="hero" size="touch" className="w-full sm:w-auto">
            <Link to="/prirucnik/$slug" params={{ slug: product.slug }}>
              Saznaj više →
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
