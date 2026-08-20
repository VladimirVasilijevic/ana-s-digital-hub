import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { text, useGlobalContent } from "@/lib/site-data";

export function SiteFooter() {
  const { texts, contact } = useGlobalContent();
  const name = text(texts, "hero.name", "Ana Vaspitač");

  return (
    <footer className="border-t border-border px-5 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 text-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ana Vaspitač logo" width={40} height={40} loading="lazy" className="h-10 w-10" />
          <span className="font-display font-bold">{name}</span>
        </Link>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/politika-privatnosti" className="hover:text-primary">
            Politika privatnosti
          </Link>
          <Link to="/uslovi-koriscenja" className="hover:text-primary">
            Uslovi korišćenja
          </Link>
          {contact?.instagram_url ? (
            <a href={contact.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              Instagram
            </a>
          ) : null}
          <Link to="/admin" className="hover:text-primary">
            Admin
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {name}. Sva prava zadržana.
        </p>
      </div>
    </footer>
  );
}
