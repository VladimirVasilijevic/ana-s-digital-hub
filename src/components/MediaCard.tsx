import type { MediaAppearance } from "@/services/types";
import { mediaUrl } from "@/lib/media-url";

/** Derives a YouTube thumbnail when no explicit image is stored. */
function youtubeThumb(url: string): string | undefined {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return match ? `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg` : undefined;
}

export function MediaCard({ item }: { item: MediaAppearance }) {
  const image = mediaUrl(item.image_url) ?? youtubeThumb(item.url);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="fade-up group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={`Naslovna slika — ${item.title}`}
            loading="lazy"
            width={480}
            height={360}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="aspect-video w-full bg-secondary" />
        )}
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-11 w-16 items-center justify-center rounded-xl bg-card/90 shadow-soft transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-primary" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Video{item.source ? ` · ${item.source}` : ""}
        </p>
        <h3 className="text-base leading-snug group-hover:text-primary">{item.title}</h3>
        {item.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        ) : null}
      </div>
    </a>
  );
}
