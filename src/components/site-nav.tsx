import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, LogIn, LogOut, Instagram, Leaf } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { AuthModal } from "./auth-modal";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

const links = [
  { to: "/about", label: "About" },
  { to: "/campaigns", label: "Campaigns" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
    } catch (e: any) {
      toast.error(e.message || "Error logging out");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-2xl shadow-black/40 border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Accent line at top */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-forest/60 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img src="/logo.png.jpeg" alt="Environment Club Logo" className="size-10 rounded-full object-cover ring-2 ring-forest/40 transition-all duration-300 group-hover:ring-forest group-hover:ring-4 group-hover:shadow-lg group-hover:shadow-forest/30" />
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-forest border-2 border-background animate-glow-pulse" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground group-hover:text-forest transition-colors duration-300">
            Environment Club
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-forest/10 hover:text-forest"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm font-medium text-forest bg-forest/10" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {user && user.email === "vanshjain50355@gmail.com" && (
            <Link
              to="/admin"
              className="flex items-center gap-2 rounded-full border border-forest/30 bg-forest/10 px-4 py-2 text-sm font-semibold text-forest hover:bg-forest hover:text-background transition-all duration-300 shadow-md shadow-forest/10 hover:shadow-lg hover:shadow-forest/20 cursor-pointer"
            >
              <Leaf className="size-4" />
              Admin Panel
            </Link>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-border glass p-1.5 pr-3 hover:border-forest/40 cursor-pointer transition-all duration-300 focus:outline-none select-none hover:shadow-lg hover:shadow-forest/10">
                <span className="grid size-8 place-items-center rounded-full bg-forest text-background text-sm font-bold uppercase">
                  {user.user_metadata?.name?.[0] || user.email?.[0] || "?"}
                </span>
                <span className="text-xs font-semibold text-foreground max-w-[12ch] truncate">
                  {user.user_metadata?.name || user.email?.split("@")[0]}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-1.5 shadow-2xl border border-white/10 glass">
                <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
                  Logged in as <span className="font-semibold text-foreground block truncate">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="-mx-1.5 my-1 border-white/10" />
                {user.email === "vanshjain50355@gmail.com" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm text-foreground focus:bg-forest/10 focus:text-forest cursor-pointer"
                      >
                        <Leaf className="size-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="-mx-1.5 my-1 border-white/10" />
                  </>
                )}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                >
                  <LogOut className="size-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border glass px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-forest/50 hover:text-forest hover:shadow-lg hover:shadow-forest/10 cursor-pointer"
            >
              <LogIn className="size-4" />
              Log In
            </button>
          )}

          <a
            href="https://www.instagram.com/environment_club_?igsh=bzdqcG03NDVoaGEw"
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-10 place-items-center rounded-full border border-border glass transition-all duration-300 hover:border-pink-500/50 hover:text-pink-400 hover:shadow-lg hover:shadow-pink-500/20 hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram className="size-4 text-pink-400" />
          </a>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeEHUaqvl-nNr_75heT3-fC_sYlcXQIPtDB21ZTq3gUfs5icQ/viewform?fbclid=PAZXh0bgNhZW0DMTAwAHNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp_yiAGyAByIT2tJhwpOLqkOb-OVdS6SqcWoVCJzSS1630Wlm_UdEJM2lLG3Q_aem_yWTZyf3lnuINVO5cO3zOHg&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-forest/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-forest/50 animate-glow-pulse overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-forest opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative z-10">Join Now</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="grid size-10 place-items-center rounded-full border border-border glass text-foreground transition-all duration-300 hover:border-forest/50"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute top-[84px] left-4 right-4 md:hidden animate-fade-up">
          <nav className="flex flex-col gap-1 rounded-3xl bg-background border border-white/10 shadow-2xl shadow-black/60 p-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-forest/10 hover:text-forest transition-all"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            <div className="my-3 border-t border-white/10" />

            {user ? (
              <div className="flex flex-col gap-2 rounded-2xl bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-forest text-background text-base font-bold uppercase">
                    {user.user_metadata?.name?.[0] || user.email?.[0] || "?"}
                  </span>
                  <div className="flex flex-col truncate">
                    <span className="text-sm font-semibold text-foreground truncate">
                      {user.user_metadata?.name || user.email?.split("@")[0]}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                  </div>
                </div>
                {user.email === "vanshjain50355@gmail.com" && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-forest/30 bg-forest/10 py-2.5 text-sm font-semibold text-forest hover:bg-forest/20 cursor-pointer transition-colors"
                  >
                    <Leaf className="size-4" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/20 cursor-pointer transition-colors"
                >
                  <LogOut className="size-4" />
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setOpen(false); setIsAuthOpen(true); }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-border glass py-2.5 text-sm font-semibold text-foreground hover:border-forest/50 hover:text-forest cursor-pointer transition-all"
              >
                <LogIn className="size-4" />
                Log In
              </button>
            )}

            <a
              href="https://www.instagram.com/environment_club_?igsh=bzdqcG03NDVoaGEw"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full border border-border glass px-5 py-2.5 text-sm font-medium text-pink-400 hover:border-pink-500/50 transition-all"
              onClick={() => setOpen(false)}
            >
              <Instagram className="size-4" />
              Instagram
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeEHUaqvl-nNr_75heT3-fC_sYlcXQIPtDB21ZTq3gUfs5icQ/viewform?fbclid=PAZXh0bgNhZW0DMTAwAHNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp_yiAGyAByIT2tJhwpOLqkOb-OVdS6SqcWoVCJzSS1630Wlm_UdEJM2lLG3Q_aem_yWTZyf3lnuINVO5cO3zOHg&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-forest px-5 py-3 text-center text-sm font-bold text-background shadow-lg shadow-forest/30"
              onClick={() => setOpen(false)}
            >
              Join Now
            </a>
          </nav>
        </div>
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}