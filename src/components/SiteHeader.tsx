import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/contact";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ana Vaspitač logo" width={40} height={40} className="h-9 w-9" />
          <span className="font-display text-[15px] font-bold">Ana Vaspitač</span>
        </Link>
        <Button asChild variant="soft" size="sm" className="rounded-full px-4">
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </Button>
      </div>
    </header>
  );
}
