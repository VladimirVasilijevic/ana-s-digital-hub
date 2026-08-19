export type MediaAppearance = {
  id: string;
  name: string;
  /** Optional logo/image URL. */
  image?: string;
  /** Link to the original article, video or episode. */
  url?: string;
  note?: string;
  enabled: boolean;
};

/**
 * Media appearances. Empty until Ana confirms real appearances —
 * nothing here should be invented.
 */
export const mediaAppearances: MediaAppearance[] = [];

export const getMediaAppearances = () =>
  mediaAppearances.filter((m) => m.enabled);
