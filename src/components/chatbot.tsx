import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Loader2,
  Calendar,
  Users,
  Image as ImageIcon,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Message {
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

const CLUB_KNOWLEDGE = [
  {
    keywords: ["why choose", "why this website", "why this club", "benefit", "value", "why do", "advantage", "reason to", "better than", "why choose your website", "why should i join", "why join", "join you", "join your club"],
    answer: "Choosing our website and club means choosing active, hands-on grassroots impact! Unlike traditional organizations that only talk, we get our hands dirty: planting native forests, conducting campus waste audits, hosting urban farming workshops, and open-sourcing low-cost engineering blueprints. You get to make a real, visible difference on campus!"
  },
  {
    keywords: ["creator", "who made", "who developed", "who built", "developer", "author", "programmer"],
    answer: "This website was built for the Environment Club by a team of dedicated student developers, including Vansh Jain, Abhishek Paliwal, and Mayank Tamta, using React, Vite, TanStack Router, and Supabase."
  },
  {
    keywords: ["feature", "what does", "what can", "functionality", "capabilities", "page", "what is on this site", "website details"],
    answer: "This platform is fully dynamic and features:\n1. 📅 A Live Events calendar linked to Supabase.\n2. 👥 A Dynamic Team roster displaying leaders.\n3. 📸 An Interactive Gallery with lightbox zooms.\n4. 🌿 Campaigns & Initiatives tracking.\n5. 🛡️ An Admin Dashboard for authorized updates.\n6. 💬 This Voice-Enabled AI Assistant!"
  },
  {
    keywords: ["tech", "stack", "react", "supabase", "database", "vite", "language", "code", "how is it made"],
    answer: "The platform uses a premium, modern tech stack:\n- Frontend: React 19, TypeScript, and TanStack Router.\n- Styling: Tailwind CSS & Framer Motion for interactive 3D mouse-tilt animations.\n- Backend: Supabase Auth, PostgreSQL Database, and Storage buckets."
  },
  {
    keywords: ["farming", "agriculture", "plant", "tree", "forest", "sapling", "seed", "grow"],
    answer: "We run projects in native tree reforestation and Sustainable Urban Farming. We maintain greenhouses, run organic composting workshops, and help students set up low-cost urban farming patches."
  },
  {
    keywords: ["plastic", "audit", "waste", "recycle", "garbage", "trash"],
    answer: "We conduct physical campus plastic audits where student volunteers weigh and document waste from hostels to publish recommendations for plastic-free alternatives and recycling systems."
  },
  {
    keywords: ["admin", "dashboard", "upload", "delete", "control", "modify", "edit"],
    answer: "The Admin Dashboard (accessible at /admin for authorized administrators like vanshjain50355@gmail.com) allows creating new events, uploading gallery pictures (with base64 database fallback), and adding new coordinators to the roster."
  },
  {
    keywords: ["contact", "email", "address", "reach", "phone", "help", "support", "location"],
    answer: "You can write to us at info@environmentclub.org, visit our Contact page to send a message, or drop by our office at the Campus Greenhouse. We are always happy to help!"
  },
  {
    keywords: ["how to join", "how do i join", "how can i join", "where to register", "membership signup", "sign up as a volunteer", "registration form"],
    answer: "To join, click the 'Join Now' button in the navigation header to access our Google Registration Form. You can also sign up for a profile on this website to receive email notifications of upcoming campaigns."
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "Hi there! 🌿 I am your Environment Club assistant. How can I help you restore our campus ecosystem today? Ask me about upcoming events, team members, or gallery photos!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // References for speech API
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = "en-US";
      rec.interimResults = false;

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendQuery(transcript);
      };

      rec.onerror = (e: any) => {
        console.error("Speech recognition error:", e);
        setIsListening(false);
        toast.error("Could not understand audio. Please try again.");
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Voice synthesis speaker
  const speak = (text: string) => {
    if (!isSpeakingEnabled) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      const voices = window.speechSynthesis.getVoices();
      // Try to find a premium/natural English voice
      const naturalVoice =
        voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Natural") || v.name.includes("Google"))
        ) || voices.find((v) => v.lang.startsWith("en")) || voices[0];
      
      if (naturalVoice) utterance.voice = naturalVoice;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Speech synthesis failed:", err);
    }
  };

  // Toggle Microphone
  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in this browser. Try Chrome or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      window.speechSynthesis.cancel(); // Stop talking while listening
      recognitionRef.current.start();
    }
  };

  // Main chatbot response brain linked to Supabase dynamic context
  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    // Add user message
    const userMsg: Message = { sender: "user", text: queryText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const q = queryText.toLowerCase();
      let response = "";

      // First check our CLUB_KNOWLEDGE local engine
      const matchedKnowledge = CLUB_KNOWLEDGE.find(k => 
        k.keywords.some(kw => q.includes(kw))
      );

      if (matchedKnowledge) {
        response = matchedKnowledge.answer;
      }
      // 1. Check database for dynamic Events queries
      else if (q.includes("event") || q.includes("timing") || q.includes("upcoming") || q.includes("schedule") || q.includes("calendar")) {
        const { data: dbEvents, error } = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const upcoming = dbEvents?.filter((e) => e.upcoming) || [];
        if (upcoming.length > 0) {
          response = `We have ${upcoming.length} upcoming event(s) scheduled:\n\n` +
            upcoming
              .slice(0, 3)
              .map((e) => `• ${e.title} (${e.kind}): Scheduled for ${e.date} at ${e.time} (Location: ${e.location}).`)
              .join("\n") +
            `\n\nWould you like to register? You can view the full schedule on our Events page.`;
        } else {
          response = "There are no upcoming events scheduled at the moment, but we are designing clean-up drives and webinars. Check back soon!";
        }
      } 
      // 2. Check database for dynamic Team / President queries
      else if (q.includes("president") || q.includes("team") || q.includes("coordinator") || q.includes("leader") || q.includes("member") || q.includes("who is")) {
        const { data: dbTeam, error } = await supabase
          .from("team")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;

        if (dbTeam && dbTeam.length > 0) {
          const president = dbTeam.find((t) => t.role.toLowerCase().includes("president"));
          const coordinators = dbTeam.filter((t) => t.role.toLowerCase().includes("coordinator"));

          response = `Here is our team roster:\n`;
          if (president) {
            response += `👑 President: ${president.name}\n`;
          }
          if (coordinators.length > 0) {
            response += `👥 Coordinators: ${coordinators.map((c) => c.name).join(", ")}\n`;
          }
          response += `\nCurrently, we have ${dbTeam.length} registered core members working hard behind the scenes. You can see their bios on our About page!`;
        } else {
          response = "The club roster is currently empty in the database. Head to the admin panel to add the student leaders!";
        }
      } 
      // 3. Check database for Gallery queries
      else if (q.includes("gallery") || q.includes("photo") || q.includes("picture") || q.includes("image")) {
        const { data: dbGallery, error } = await supabase
          .from("gallery")
          .select("id, caption");

        if (error) throw error;

        if (dbGallery && dbGallery.length > 0) {
          response = `We have ${dbGallery.length} active photos uploaded in our database gallery. Some highlights include: "${dbGallery[0].caption}".\n\nYou can view all of them on our interactive Gallery page!`;
        } else {
          response = "The gallery is empty right now. Head over to the admin panel to upload pictures of your local nature campaigns!";
        }
      } 
      // 4. Greetings
      else if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("greetings") || q.includes("how are you")) {
        response = "Hello! 🌿 I am doing great, powered by sustainable energy and code. How can I assist you with the Environment Club today?";
      } 

      else if (q.includes("contact") || q.includes("email") || q.includes("address") || q.includes("reach")) {
        response = "You can contact the Environment Club by writing to us at info@environmentclub.org or visiting our Contact page to send a direct message. We respond within 24 hours!";
      }
      else if (q.includes("about") || q.includes("what is") || q.includes("purpose") || q.includes("mission")) {
        response = "The Environment Club is a student-led movement dedicated to restoring local ecosystems, planting native flora, conducting campus plastic waste audits, and sharing sustainable blueprints with hostels.";
      }
      // 6. Fallback response
      else {
        response = "I'm not sure about that, but I'm learning! You can ask me about: \n🌿 'Upcoming events'\n👥 'Team members & leaders'\n📸 'Gallery photos'\n📬 'How to join or contact us'";
      }

      // Simulate a small delay for typing response
      setTimeout(() => {
        const botMsg: Message = { sender: "assistant", text: response, timestamp: new Date() };
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
        speak(response);
      }, 600);

    } catch (err: any) {
      console.error(err);
      setIsLoading(false);
      const errorMsg = "Sorry, I had trouble reaching the database server. Please check your Supabase connection and try again!";
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: errorMsg, timestamp: new Date() },
      ]);
      speak(errorMsg);
    }
  };

  const handleQuickReply = (text: string) => {
    handleSendQuery(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            layoutId="chatbot-panel"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="group relative flex size-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-forest to-leaf text-background shadow-2xl shadow-forest/40"
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-forest/30 animate-ping opacity-60" />
            <MessageSquare className="size-6 transition-transform group-hover:rotate-12" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="chatbot-panel"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className={`flex flex-col rounded-3xl border border-border bg-background shadow-2xl shadow-black/80 overflow-hidden transition-all duration-300 ${
              isExpanded ? "h-[680px] w-[500px]" : "h-[520px] w-[360px]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-forest/80 to-leaf/80 px-5 py-4 text-background">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="grid size-9 place-items-center rounded-full bg-white/20">
                    <Sparkles className="size-4 animate-glow-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 border-2 border-forest" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Eco-Assistant</h3>
                  <span className="text-[10px] text-white/70">Online & Voice-Enabled</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Speaker Toggle */}
                <button
                  onClick={() => setIsSpeakingEnabled(!isSpeakingEnabled)}
                  className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  title={isSpeakingEnabled ? "Mute audio" : "Unmute audio"}
                >
                  {isSpeakingEnabled ? (
                    <Volume2 className="size-4" />
                  ) : (
                    <VolumeX className="size-4 opacity-60" />
                  )}
                </button>
                {/* Maximize / Minimize Toggle */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  title={isExpanded ? "Minimize panel" : "Maximize panel"}
                >
                  {isExpanded ? (
                    <Minimize2 className="size-4" />
                  ) : (
                    <Maximize2 className="size-4" />
                  )}
                </button>
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-md transition-all ${
                      m.sender === "user"
                        ? "bg-forest text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground border border-border rounded-tl-none leading-relaxed whitespace-pre-line"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-muted border border-border px-4 py-2.5 text-xs text-muted-foreground rounded-tl-none">
                    <Loader2 className="size-3.5 animate-spin text-forest" />
                    Eco-assistant is typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none">
              <button
                onClick={() => handleQuickReply("Upcoming events")}
                className="flex items-center gap-1.5 shrink-0 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium hover:border-forest hover:text-forest transition-colors cursor-pointer"
              >
                <Calendar className="size-3" /> Upcoming events
              </button>
              <button
                onClick={() => handleQuickReply("Who is the president?")}
                className="flex items-center gap-1.5 shrink-0 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium hover:border-forest hover:text-forest transition-colors cursor-pointer"
              >
                <Users className="size-3" /> Who leads?
              </button>
              <button
                onClick={() => handleQuickReply("Tell me about the gallery")}
                className="flex items-center gap-1.5 shrink-0 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium hover:border-forest hover:text-forest transition-colors cursor-pointer"
              >
                <ImageIcon className="size-3" /> Gallery stats
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuery(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 bg-background/40 p-3"
            >
              {/* Mic trigger */}
              <button
                type="button"
                onClick={toggleListening}
                className={`relative grid size-10 shrink-0 place-items-center rounded-full border transition-all cursor-pointer ${
                  isListening
                    ? "border-red-500 bg-red-500/10 text-red-500 ring-4 ring-red-500/15"
                    : "border-border hover:border-forest hover:text-forest hover:bg-forest/5"
                }`}
                title={isListening ? "Stop listening" : "Ask by speaking"}
              >
                {isListening ? (
                  <>
                    <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                    <MicOff className="size-4" />
                  </>
                ) : (
                  <Mic className="size-4" />
                )}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask a question..."}
                disabled={isListening}
                className="flex-1 bg-transparent border-0 px-1 py-2 text-sm focus:outline-none focus:ring-0 placeholder:text-muted-foreground disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || isListening}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-forest text-primary-foreground transition-all duration-300 disabled:opacity-30 disabled:scale-95 cursor-pointer hover:bg-leaf hover:shadow-lg hover:shadow-forest/20"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
