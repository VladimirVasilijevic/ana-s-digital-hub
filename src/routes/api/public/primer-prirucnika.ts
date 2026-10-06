import { createFileRoute } from "@tanstack/react-router";

const GUIDE_PREVIEW_URL =
  "https://ana-link-warmth.lovable.app/__l5e/assets-v1/217c193d-f57d-4f8c-954f-59a5801f8ddf/primer-postavi-granice.pdf";

export const Route = createFileRoute("/api/public/primer-prirucnika")({
  server: {
    handlers: {
      GET: async () => {
        const upstream = await fetch(GUIDE_PREVIEW_URL);

        if (!upstream.ok || !upstream.body) {
          return new Response("Primer priručnika trenutno nije dostupan.", { status: 502 });
        }

        return new Response(upstream.body, {
          headers: {
            "content-type": "application/pdf",
            "content-disposition": 'inline; filename="primer-postavi-granice.pdf"',
            "cache-control": "public, max-age=86400",
          },
        });
      },
    },
  },
});