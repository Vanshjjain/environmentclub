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
  const [user, setUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-forest/30 shadow-2xl shadow-black/80">
      {/* Accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-forest via-accent to-leaf" />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/logo.png.jpeg"
              alt="Environment Club Logo"
              className="size-10 rounded-full object-cover ring-2 ring-forest/40 transition-all duration-300 group-hover:ring-accent group-hover:ring-4"
            />
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-accent border-2 border-background animate-pulse" />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
            Environment Club
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative rounded-full px-4 py-2 text-sm font-bold text-foreground/90 transition-all duration-300 hover:bg-forest/20 hover:text-accent"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm font-bold text-accent bg-forest/20 border border-forest/40" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <a
            href="https://www.instagram.com/environment_club_?igsh=bzdqcG03NDVoaGEw"
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-9 place-items-center rounded-full border border-forest/30 bg-muted/60 text-foreground/90 hover:border-accent hover:text-accent transition-colors duration-300"
            aria-label="Instagram Page"
          >
            <Instagram className="size-4" />
          </a>

          {user && user.email === "vanshjain50355@gmail.com" && (
            <Link
              to="/admin"
              className="flex items-center gap-2 rounded-full border border-forest/30 bg-forest/15 px-4 py-2 text-sm font-semibold text-accent hover:bg-forest hover:text-primary-foreground transition-all duration-300 shadow-md cursor-pointer"
            >
              <Leaf className="size-4" />
              Admin Panel
            </Link>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-border bg-muted/80 p-1.5 pr-3 hover:border-accent cursor-pointer transition-all duration-300 focus:outline-none select-none">
                <span className="grid size-8 place-items-center rounded-full bg-forest text-primary-foreground text-sm font-bold uppercase">
                  {user.user_metadata?.name?.[0] || user.email?.[0] || "?"}
                </span>
                <span className="text-xs font-bold text-foreground max-w-[12ch] truncate">
                  {user.user_metadata?.name || user.email?.split("@")[0]}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-1.5 shadow-2xl border border-border bg-card">
                <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
                  Logged in as <span className="font-semibold text-foreground block truncate">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="-mx-1.5 my-1 border-border" />
                {user.email === "vanshjain50355@gmail.com" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm text-foreground focus:bg-forest/10 focus:text-accent cursor-pointer"
                      >
                        <Leaf className="size-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="-mx-1.5 my-1 border-border" />
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
              className="flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-2 text-sm font-bold text-foreground hover:bg-forest/20 hover:text-accent transition-all duration-300 cursor-pointer"
            >
              <LogIn className="size-4" />
              Log In
            </button>
          )}

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeEHUaqvl-nNr_75heT3-fC_sYlcXQIPtDB21ZTq3gUfs5icQ/viewform?fbclid=PAZXh0bgNhZW0DMTAwAHNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp_yiAGyAByIT2tJhwpOLqkOb-OVdS6SqcWoVCJzSS1630Wlm_UdEJM2lLG3Q_aem_yWTZyf3lnuINVO5cO3zOHg&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-accent hover:text-accent-foreground cursor-pointer overflow-hidden border border-accent/40"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Join Now
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="grid size-10 place-items-center rounded-xl border border-border bg-muted/60 text-foreground hover:border-accent hover:text-accent md:hidden transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden shadow-2xl">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-bold text-foreground hover:bg-forest/15 hover:text-accent transition-colors"
                activeProps={{ className: "rounded-xl px-4 py-3 text-base font-bold text-accent bg-forest/20" }}
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-border">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-1">
                    <span className="grid size-9 place-items-center rounded-full bg-forest text-primary-foreground font-bold">
                      {user.user_metadata?.name?.[0] || user.email?.[0] || "?"}
                    </span>
                    <span className="text-sm font-semibold text-foreground truncate">{user.email}</span>
                  </div>
                  {user.email === "vanshjain50355@gmail.com" && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-xl bg-forest/20 px-4 py-3 text-sm font-bold text-accent"
                    >
                      <Leaf className="size-4" /> Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive"
                  >
                    <LogOut className="size-4" /> Log Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/60 px-4 py-3 text-sm font-bold text-foreground"
                >
                  <LogIn className="size-4" /> Log In
                </button>
              )}

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeEHUaqvl-nNr_75heT3-fC_sYlcXQIPtDB21ZTq3gUfs5icQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3 text-center text-sm font-bold text-primary-foreground shadow-lg"
              >
                Join Now
              </a>
            </div>
          </nav>
        </div>
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}