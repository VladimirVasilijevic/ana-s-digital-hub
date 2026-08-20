import { supabase } from "@/integrations/supabase/client";

export type StorageFolder = "products" | "free-content" | "media";

function safeName(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-60);
}

/** Uploads a file and returns the storage path stored in the database. */
export async function uploadFile(folder: StorageFolder, file: File): Promise<string> {
  const path = `${folder}/${Date.now()}-${safeName(file.name)}`;
  const { error } = await supabase.storage.from("content").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

/** Removes a previously uploaded file. Bundled and external URLs are ignored. */
export async function removeFile(value?: string | null) {
  if (!value) return;
  if (value.startsWith("asset:") || value.startsWith("/") || /^https?:\/\//.test(value)) return;
  await supabase.storage.from("content").remove([value]);
}
