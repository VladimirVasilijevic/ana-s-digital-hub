import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { mediaUrl } from "@/lib/media-url";
import { uploadFile, type StorageFolder } from "@/services/storage";

export function AdminPage({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl">{title}</h1>
          {description ? (
            <p className="mt-1 text-[15px] text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">{children}</div>
  );
}

export function Field({
  label,
  hint,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function TextareaField({
  label,
  hint,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

/** Edits a string[] as one item per line. */
export function ListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <TextareaField
      label={label}
      hint="Jedna stavka po redu."
      rows={5}
      value={value.join("\n")}
      onChange={(text) => onChange(text.split("\n").map((l) => l.trim()).filter(Boolean))}
    />
  );
}

export function ToggleField({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-3">
      <div>
        <p className="text-[15px] font-medium">{label}</p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

/** Upload to storage, or paste an external URL. */
export function FileField({
  label,
  folder,
  value,
  onChange,
  accept = "image/*",
  preview = true,
}: {
  label: string;
  folder: StorageFolder;
  value: string | null;
  onChange: (value: string | null) => void;
  accept?: string;
  preview?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const url = mediaUrl(value);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const path = await uploadFile(folder, file);
      onChange(path);
      toast.success("Fajl je otpremljen.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Otpremanje nije uspelo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {preview && url ? (
        <img
          src={url}
          alt=""
          className="h-28 w-40 rounded-xl border border-border object-cover"
        />
      ) : null}
      <Input type="file" accept={accept} disabled={busy} onChange={(e) => handleFile(e.target.files?.[0])} />
      <Input
        placeholder="ili nalepi link (https://…)"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
      />
      {value ? (
        <Button variant="quiet" size="sm" onClick={() => onChange(null)}>
          Ukloni
        </Button>
      ) : null}
    </div>
  );
}

export function RowActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

export function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-dashed border-border p-5 text-[15px] text-muted-foreground">
      {text}
    </p>
  );
}
