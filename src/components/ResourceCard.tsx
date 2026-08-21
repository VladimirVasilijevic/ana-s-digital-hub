import { Button } from "@/components/ui/button";
import type { FreeResource } from "@/services/types";
import { mediaUrl } from "@/lib/media-url";

export function ResourceCard({ resource }: { resource: FreeResource }) {
  const image = mediaUrl(resource.image_url);
  const isDownload = Boolean(resource.file_url);
  const href = mediaUrl(resource.file_url) ?? resource.external_url ?? "#";

  return (
    <article className="fade-up flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-200 hover:shadow-lg">
      {image ? (
        <img
          src={image}
          alt={`Ilustracija — ${resource.title}`}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div>
          <h3 className="text-lg">{resource.title}</h3>
          {resource.meta ? (
            <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
              {resource.meta}
            </p>
          ) : null}
        </div>
        <p className="flex-1 text-[15px] leading-relaxed text-muted-foreground">
          {resource.description}
        </p>
        <Button
          asChild
          variant="soft"
          size="touch"
          className="w-full sm:w-auto"
        >
          <a
            href={href}
            {...(isDownload
              ? { download: true }
              : { target: "_blank", rel: "noopener noreferrer" })}
          >
            {resource.cta_label || "Preuzmi besplatno →"}
          </a>
        </Button>
      </div>
    </article>
  );
}
