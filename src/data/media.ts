/**
 * Media appearances (YouTube). Add new entries here — the UI renders
 * whatever is enabled. Nothing here should be invented: entries marked
 * `sample: true` are visual placeholders until Ana potvrdi prave linkove.
 */
export type MediaAppearance = {
  id: string;
  title: string;
  /** YouTube video id — used for the thumbnail and the link. */
  youtubeId?: string;
  /** Explicit image/link override (used for sample cards without a video id). */
  image: string;
  url: string;
  /** Channel / show name. */
  source?: string;
  note?: string;
  /** Placeholder card, not a confirmed appearance. */
  sample?: boolean;
  enabled: boolean;
};

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const watch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const entries: (Omit<MediaAppearance, "image" | "url"> & {
  image?: string;
  url?: string;
})[] = [
  {
    id: "ridja-izvrtica-tehnologija",
    youtubeId: "oNq5jxuZudE",
    title: "„Tehnologija kao alat, ne kao bebisiterka“",
    source: "Riđa izvrtica",
    note: "Razgovor o ekranima, granicama i roditeljstvu bez osuđivanja.",
    enabled: true,
  },
  {
    id: "sample-podkast",
    youtubeId: "oNq5jxuZudE",
    title: "Primer: gostovanje u podkastu",
    source: "Primer kartice",
    note: "Placeholder — zameni pravim YouTube linkom kada bude potvrđen.",
    sample: true,
    enabled: true,
  },
  {
    id: "sample-emisija",
    youtubeId: "oNq5jxuZudE",
    title: "Primer: TV/YouTube emisija",
    source: "Primer kartice",
    note: "Placeholder — zameni pravim YouTube linkom kada bude potvrđen.",
    sample: true,
    enabled: true,
  },
];

export const mediaAppearances: MediaAppearance[] = entries.map((entry) => ({
  ...entry,
  image: entry.image ?? (entry.youtubeId ? thumb(entry.youtubeId) : ""),
  url: entry.url ?? (entry.youtubeId ? watch(entry.youtubeId) : "#"),
}));

export const getMediaAppearances = () => mediaAppearances.filter((m) => m.enabled);
