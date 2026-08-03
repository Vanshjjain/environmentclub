import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { 
  Loader2, Plus, Trash2, Image, Calendar, Users, 
  Lock, AlertTriangle, ShieldCheck, UploadCloud 
} from "lucide-react";
import { AuthModal } from "@/components/auth-modal";
import { TiltCard } from "@/components/ui/tilt-card";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"gallery" | "events" | "team">("gallery");

  // Content states
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [galleryList, setGalleryList] = useState<any[]>([]);
  const [teamList, setTeamList] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Form states
  const [submitting, setSubmitting] = useState(false);

  // Gallery form
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoCaption, setPhotoCaption] = useState("");

  // Events form
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(""); // e.g. "Oct 12"
  const [eventTime, setEventTime] = useState(""); // e.g. "4:00 PM"
  const [eventLocation, setEventLocation] = useState("");
  const [eventKind, setEventKind] = useState("Workshop"); // Workshop, Clean-up, Panel, Field, etc.
  const [eventYear, setEventYear] = useState(new Date().getFullYear());
  const [eventUpcoming, setEventUpcoming] = useState(true);

  // Team form
  const [teamName, setTeamName] = useState("");
  const [teamRole, setTeamRole] = useState("");

  // Base64 helper for image fallback
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Auth checker
  const checkAdmin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const currUser = session?.user ?? null;
      setUser(currUser);

      if (!currUser) {
        setIsAdmin(false);
        setLoadingAuth(false);
        return;
      }

      if (currUser.email?.toLowerCase() === "vanshjain50355@gmail.com") {
        setIsAdmin(true);
        setLoadingAuth(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", currUser.id)
        .single();

      if (!error && data?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setIsAdmin(false);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Lists from Supabase
  const fetchData = async () => {
    if (!isAdmin) return;
    setLoadingData(true);
    try {
      // Fetch Gallery
      const { data: galleryData, error: galleryErr } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      if (galleryErr) throw galleryErr;
      setGalleryList(galleryData || []);

      // Fetch Events
      const { data: eventsData, error: eventsErr } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });
      if (eventsErr) throw eventsErr;
      setEventsList(eventsData || []);

      // Fetch Team
      const { data: teamData, error: teamErr } = await supabase
        .from("team")
        .select("*")
        .order("created_at", { ascending: false });
      if (teamErr) throw teamErr;
      setTeamList(teamData || []);
    } catch (err: any) {
      toast.error("Error loading data: " + err.message);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  // Handle Photo Upload
  const handlePhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFile) {
      toast.error("Please select a photo file to upload.");
      return;
    }
    setSubmitting(true);

    try {
      let imageUrl = "";

      // Try uploading to Supabase Storage
      try {
        const fileExt = photoFile.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Attempt upload
        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(filePath, photoFile);

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from("gallery")
            .getPublicUrl(filePath);
          imageUrl = publicUrl;
        } else {
          console.warn("Storage upload error, using Base64 fallback:", uploadError.message);
        }
      } catch (storageErr) {
        console.warn("Storage exception, using Base64 fallback:", storageErr);
      }

      // If storage upload didn't succeed, fallback to base64 encoding inside DB
      if (!imageUrl) {
        imageUrl = await convertToBase64(photoFile);
      }

      // Save to gallery database table
      const { error: dbError } = await supabase.from("gallery").insert([
        { src: imageUrl, caption: photoCaption }
      ]);

      if (dbError) throw dbError;

      toast.success("Photo uploaded successfully!");
      setPhotoFile(null);
      setPhotoCaption("");
      fetchData();
    } catch (err: any) {
      toast.error("Upload failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Event Submit
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate || !eventTime || !eventLocation) {
      toast.error("Please fill in all event details.");
      return;
    }
    setSubmitting(true);

    try {
      const { error } = await supabase.from("events").insert([
        {
          title: eventTitle,
          date: eventDate,
          time: eventTime,
          location: eventLocation,
          kind: eventKind,
          year: Number(eventYear),
          upcoming: eventUpcoming
        }
      ]);

      if (error) throw error;

      toast.success("Event added successfully!");
      setEventTitle("");
      setEventDate("");
      setEventTime("");
      setEventLocation("");
      fetchData();
    } catch (err: any) {
      toast.error("Failed to add event: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Team Member Submit
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !teamRole) {
      toast.error("Please fill in name and role.");
      return;
    }
    setSubmitting(true);

    try {
      const { error } = await supabase.from("team").insert([
        { name: teamName, role: teamRole }
      ]);

      if (error) throw error;

      toast.success("Team member added successfully!");
      setTeamName("");
      setTeamRole("");
      fetchData();
    } catch (err: any) {
      toast.error("Failed to add team member: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete handlers
  const deleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
      toast.success("Photo deleted.");
      fetchData();
    } catch (err: any) {
      toast.error("Delete failed: " + err.message);
    }
  };

  const deleteEventItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      toast.success("Event deleted.");
      fetchData();
    } catch (err: any) {
      toast.error("Delete failed: " + err.message);
    }
  };

  const deleteTeamItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const { error } = await supabase.from("team").delete().eq("id", id);
      if (error) throw error;
      toast.success("Team member removed.");
      fetchData();
    } catch (err: any) {
      toast.error("Delete failed: " + err.message);
    }
  };

  if (loadingAuth) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-forest" />
      </div>
    );
  }

  // Not logged in or not admin view
  if (!user || !isAdmin) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <TiltCard maxRotation={4} className="glass rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col items-center">
          <div className="rounded-full bg-destructive/10 p-4 text-destructive mb-6 animate-pulse">
            <Lock className="size-12" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Access Required</h1>
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
            This dashboard is private. Only authorized coordinators and administrators (like <span className="font-semibold text-foreground block mt-1">vanshjain50355@gmail.com</span>) can view and modify events, rosters, or gallery images.
          </p>
          {!user ? (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="mt-8 rounded-full bg-forest dark:bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] shadow-md shadow-forest/20 cursor-pointer"
            >
              Sign In as Admin
            </button>
          ) : (
            <div className="mt-6 flex flex-col gap-2 w-full">
              <div className="text-xs text-destructive border border-destructive/20 bg-destructive/5 rounded-xl py-2 px-3 flex items-center justify-center gap-2">
                <AlertTriangle className="size-4 shrink-0" />
                Logged in as {user.email} (Non-Admin)
              </div>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  setIsAuthOpen(true);
                }}
                className="mt-3 rounded-full border border-white/20 glass px-6 py-2.5 text-xs font-semibold text-foreground hover:bg-white/10 cursor-pointer"
              >
                Log Out & Sign In with Admin Account
              </button>
            </div>
          )}
        </TiltCard>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    );
  }

  // Logged in Admin View
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-border pb-8 mb-10">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="size-4.5" />
            Administrator Panel
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-forest dark:text-primary">
            Club Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your environment club roster, timeline events, and gallery records.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Signed in as:</span>
          <div className="font-semibold text-forest dark:text-primary text-sm">{user.email}</div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all shrink-0 cursor-pointer w-full text-left ${
              activeTab === "gallery"
                ? "bg-forest dark:bg-primary text-primary-foreground shadow-md"
                : "glass border border-white/5 hover:bg-white/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Image className="size-4.5" />
            Gallery Uploads
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all shrink-0 cursor-pointer w-full text-left ${
              activeTab === "events"
                ? "bg-forest dark:bg-primary text-primary-foreground shadow-md"
                : "glass border border-white/5 hover:bg-white/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Calendar className="size-4.5" />
            Manage Events
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all shrink-0 cursor-pointer w-full text-left ${
              activeTab === "team"
                ? "bg-forest dark:bg-primary text-primary-foreground shadow-md"
                : "glass border border-white/5 hover:bg-white/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="size-4.5" />
            Club Roster (Team)
          </button>
        </div>

        {/* Tab Contents */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: GALLERY */}
          {activeTab === "gallery" && (
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="glass rounded-3xl p-6 border border-white/5 space-y-4">
                  <h2 className="font-display text-xl font-bold text-forest dark:text-primary mb-2 flex items-center gap-2">
                    <UploadCloud className="size-5 text-forest dark:text-primary" />
                    Upload Image
                  </h2>
                  <form onSubmit={handlePhotoSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Photo File</label>
                      <input
                        required
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                        className="w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-forest/10 file:text-forest hover:file:bg-forest/20 cursor-pointer file:cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Caption / Description</label>
                      <input
                        required
                        type="text"
                        value={photoCaption}
                        onChange={(e) => setPhotoCaption(e.target.value)}
                        placeholder="e.g. Tree plantation drive near park"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-forest dark:bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                      Upload to Gallery
                    </button>
                  </form>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="glass rounded-3xl p-6 border border-white/5 space-y-4">
                  <h2 className="font-display text-xl font-bold text-foreground">Gallery Items ({galleryList.length})</h2>
                  {loadingData ? (
                    <div className="flex justify-center py-10"><Loader2 className="size-6 animate-spin text-forest" /></div>
                  ) : galleryList.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-8">No photos stored in database. Upload one above!</p>
                  ) : (
                    <div className="grid gap-4 max-h-[450px] overflow-y-auto pr-2">
                      {galleryList.map((g) => (
                        <div key={g.id} className="flex items-center gap-4 rounded-2xl border border-border/40 p-3 bg-muted/10">
                          <img src={g.src} alt={g.caption} className="size-16 rounded-xl object-cover border border-border/50 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold truncate">{g.caption}</p>
                            <span className="text-[10px] text-muted-foreground block mt-1">Uploaded {new Date(g.created_at).toLocaleDateString()}</span>
                          </div>
                          <button
                            onClick={() => deleteGalleryItem(g.id)}
                            className="text-muted-foreground hover:text-destructive p-2 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer"
                            aria-label="Delete photo"
                          >
                            <Trash2 className="size-4.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EVENTS */}
          {activeTab === "events" && (
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="glass rounded-3xl p-6 border border-white/5 space-y-4">
                  <h2 className="font-display text-xl font-bold text-forest dark:text-primary mb-2 flex items-center gap-2">
                    <Calendar className="size-5 text-forest" />
                    Create New Event
                  </h2>
                  <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Title</label>
                      <input
                        required
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="e.g. Sustainable Urban Farming 101"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest"
                      />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Date (e.g. Oct 12)</label>
                        <input
                          required
                          type="text"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          placeholder="Oct 12"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Time (e.g. 4:00 PM)</label>
                        <input
                          required
                          type="text"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          placeholder="4:00 PM"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</label>
                      <input
                        required
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g. Campus Greenhouses"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest"
                      />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kind</label>
                        <select
                          value={eventKind}
                          onChange={(e) => setEventKind(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest"
                        >
                          <option value="Workshop">Workshop</option>
                          <option value="Clean-up">Clean-up</option>
                          <option value="Panel">Panel</option>
                          <option value="Field">Field</option>
                          <option value="Festival">Festival</option>
                          <option value="Campaign">Campaign</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Year</label>
                        <input
                          required
                          type="number"
                          value={eventYear}
                          onChange={(e) => setEventYear(Number(e.target.value))}
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        id="upcoming"
                        checked={eventUpcoming}
                        onChange={(e) => setEventUpcoming(e.target.checked)}
                        className="rounded border-border text-forest focus:ring-forest size-4"
                      />
                      <label htmlFor="upcoming" className="text-xs font-semibold text-foreground select-none cursor-pointer">Mark as Upcoming Event</label>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-forest dark:bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                      Create Event
                    </button>
                  </form>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="glass rounded-3xl p-6 border border-white/5 space-y-4">
                  <h2 className="font-display text-xl font-bold text-foreground">Club Events ({eventsList.length})</h2>
                  {loadingData ? (
                    <div className="flex justify-center py-10"><Loader2 className="size-6 animate-spin text-forest" /></div>
                  ) : eventsList.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-8">No events registered. Create one above!</p>
                  ) : (
                    <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2">
                      {eventsList.map((e) => (
                        <div key={e.id} className="flex items-center justify-between gap-4 rounded-2xl border border-border/40 p-4 bg-muted/10">
                          <div className="min-w-0 flex-1">
                            <span className="inline-block rounded-full bg-forest/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-forest mb-1">{e.kind}</span>
                            <h4 className="text-sm font-bold truncate">{e.title}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{e.date}, {e.year} at {e.time} — {e.location}</p>
                            <span className={`inline-block text-[9px] font-semibold mt-1 ${e.upcoming ? "text-emerald-400 bg-emerald-500/10" : "text-muted-foreground bg-muted"} px-1.5 py-0.2 rounded`}>
                              {e.upcoming ? "Upcoming" : "Past Event"}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteEventItem(e.id)}
                            className="text-muted-foreground hover:text-destructive p-2 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer shrink-0"
                            aria-label="Delete event"
                          >
                            <Trash2 className="size-4.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEAM */}
          {activeTab === "team" && (
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="glass rounded-3xl p-6 border border-white/5 space-y-4">
                  <h2 className="font-display text-xl font-bold text-forest dark:text-primary mb-2 flex items-center gap-2">
                    <Users className="size-5 text-forest" />
                    Add Core Member
                  </h2>
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                      <input
                        required
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. Dr. Meera Kapoor"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Role / Designation</label>
                      <input
                        required
                        type="text"
                        value={teamRole}
                        onChange={(e) => setTeamRole(e.target.value)}
                        placeholder="e.g. Faculty Coordinator / Outreach Lead"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-forest dark:bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                      Add Member
                    </button>
                  </form>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="glass rounded-3xl p-6 border border-white/5 space-y-4">
                  <h2 className="font-display text-xl font-bold text-foreground">Club Roster ({teamList.length})</h2>
                  {loadingData ? (
                    <div className="flex justify-center py-10"><Loader2 className="size-6 animate-spin text-forest" /></div>
                  ) : teamList.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-8">No team members registered. Add one above!</p>
                  ) : (
                    <div className="grid gap-4 max-h-[450px] overflow-y-auto pr-2">
                      {teamList.map((m) => (
                        <div key={m.id} className="flex items-center gap-4 rounded-2xl border border-border/40 p-3 bg-muted/10">
                          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-forest/10 font-display text-xs font-bold text-forest">
                            {m.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold truncate">{m.name}</p>
                            <span className="text-xs text-muted-foreground block truncate">{m.role}</span>
                          </div>
                          <button
                            onClick={() => deleteTeamItem(m.id)}
                            className="text-muted-foreground hover:text-destructive p-2 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer"
                            aria-label="Remove team member"
                          >
                            <Trash2 className="size-4.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
