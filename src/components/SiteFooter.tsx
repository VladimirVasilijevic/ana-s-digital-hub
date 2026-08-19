import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { contact } from "@/data/contact";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 text-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ana Vaspitač logo" width={40} height={40} loading="lazy" className="h-10 w-10" />
          <span className="font-display font-bold">Ana Vaspitač</span>
        </Link>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/politika-privatnosti" className="hover:text-primary">
            Politika privatnosti
          </Link>
          <Link to="/uslovi-koriscenja" className="hover:text-primary">
            Uslovi korišćenja
          </Link>
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            Instagram
          </a>
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ana Vaspitač. Sva prava zadržana.
        </p>
      </div>
    </footer>
  );
}
