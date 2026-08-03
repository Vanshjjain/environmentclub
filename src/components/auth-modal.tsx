import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });

        if (error) throw error;

        // Double-check profile insertion on client side as backup for database triggers
        if (data.user) {
          try {
            await supabase.from("profiles").upsert({
              id: data.user.id,
              email: email,
              name: name || email.split("@")[0],
              role: email.toLowerCase() === "vanshjain50355@gmail.com" ? "admin" : "user",
            });
          } catch (profileErr) {
            console.error("Backup profile creation error:", profileErr);
          }
        }

        // Note: Supabase sometimes requires email verification depending on settings.
        // We handle this case cleanly.
        if (data.session) {
          toast.success("Account created and logged in successfully!");
          onClose();
        } else {
          toast.success("Sign up successful! Please check your email for verification link.");
          onClose();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success("Welcome back! Logged in successfully.");
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message || "An authentication error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md w-[90%] rounded-2xl p-6 md:p-8">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold font-display text-center text-forest dark:text-primary">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {isSignUp
              ? "Join the Environment Club and participate in green campaigns."
              : "Access your account to view your environmental contributions."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full rounded-xl border border-border bg-background py-3.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-forest dark:focus:border-primary focus:ring-1 focus:ring-forest/20"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl border border-border bg-background py-3.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-forest dark:focus:border-primary focus:ring-1 focus:ring-forest/20"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 6 characters)"
              minLength={6}
              className="w-full rounded-xl border border-border bg-background py-3.5 pl-10 pr-10 text-sm outline-none transition-all focus:border-forest dark:focus:border-primary focus:ring-1 focus:ring-forest/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-forest dark:bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-md"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          {isSignUp ? "Already have an account?" : "New to the club?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              // Clear fields
              setName("");
              setEmail("");
              setPassword("");
            }}
            className="font-semibold text-forest dark:text-primary hover:underline cursor-pointer focus:outline-none"
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
