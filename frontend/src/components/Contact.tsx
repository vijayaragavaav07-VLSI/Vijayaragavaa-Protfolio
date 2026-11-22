import React, { useState } from "react";
import type { ContactData } from "../types/portfolio";
import { SectionHeader } from "./SectionHeader";
import { Mail, Send, Check, Loader2, MessageSquare } from "lucide-react";
import { supabase } from "../lib/supabase";

interface ContactProps {
  data: ContactData;
}

export const Contact: React.FC<ContactProps> = ({ data }) => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = supabase as any;
      const { error } = await db.from("contact_messages").insert([{
        name: formData.name,
        email: formData.email,
        subject: formData.subject || null,
        message: formData.message,
        is_read: false,
      }]);

      if (error) throw error;

      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Failed to save message, falling back to mailto:", err);
      const sub = encodeURIComponent(formData.subject || "Portfolio Inquiry");
      const body = encodeURIComponent(
        `${formData.message}\n\n— Sent by: ${formData.name} (${formData.email})`
      );
      window.location.href = `mailto:${data.email || "vijayaragavaav@gmail.com"}?subject=${sub}&body=${body}`;
      setStatus("error");
      setErrorMsg("Direct send failed – email client opened as fallback.");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const socialChannels = [
    {
      title: "EMAIL",
      detail: data.email || "vijayaragavaav@gmail.com",
      action: "SEND DISPATCH →",
      link: data.email ? `mailto:${data.email}` : "mailto:vijayaragavaav@gmail.com",
      icon: <Mail className="w-4 h-4 text-[#00d9ff]" />,
    },
    {
      title: "LINKEDIN",
      detail: "/in/vijayaragavaa-v",
      action: "CONNECT →",
      link: data.linkedin || "https://www.linkedin.com/in/vijayaragavaa-v",
      icon: (
        <svg className="w-4 h-4 fill-[#00d9ff]" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      title: "GITHUB",
      detail: "@vijayaragavaav",
      action: "REPOSITORIES →",
      link: data.github || "https://github.com/vijayaragavaav",
      icon: (
        <svg className="w-4 h-4 fill-[#00d9ff]" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-10 md:py-14 border-t border-[#102a45]/80 relative" id="contact">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="10"
          label="OPEN DISPATCH"
          title="CONTACT"
          meta="RESPONSE WINDOW: 24–48 HRS"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#102a45] bg-[#051528] px-3 py-1 rounded-full text-xs font-mono text-[#00d9ff] tracking-wider mb-4 shadow-[0_0_12px_rgba(0,217,255,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse" />
                <span>OPEN FOR RTL & VERIFICATION ROLES</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
                Initiate Communication
              </h3>

              <p className="text-xs sm:text-sm text-[#8ea3bd] leading-relaxed mb-6 font-normal">
                Available for full-time engineering positions, RTL verification roles, FPGA prototyping, and technical hardware collaborations.
              </p>

              <div className="space-y-3 font-mono text-xs">
                {socialChannels.map((c) => (
                  <a
                    key={c.title}
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-tech p-3.5 flex items-center justify-between group hover:border-[#00d9ff]/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#051a2d] border border-[#102a45] flex items-center justify-center">
                        {c.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-[#00d9ff] transition-colors text-[11.5px]">
                          {c.title}
                        </div>
                        <div className="text-[#8ea3bd] text-[10.5px]">
                          {c.detail}
                        </div>
                      </div>
                    </div>
                    <span className="text-[#00d9ff] text-[10.5px] font-bold group-hover:translate-x-1 transition-transform">
                      {c.action}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 card-tech p-5 sm:p-7">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00d9ff] mb-4 pb-2 border-b border-[#102a45]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>TRANSMIT DISPATCH MESSAGE</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-mono text-[10.5px] uppercase text-[#8ea3bd] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Mercer"
                    className="w-full bg-[#051528] border border-[#102a45] rounded-md px-3 py-2 text-xs text-white font-mono placeholder-[#8ea3bd]/40 focus:border-[#00d9ff] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10.5px] uppercase text-[#8ea3bd] mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@semiconductor.com"
                    className="w-full bg-[#051528] border border-[#102a45] rounded-md px-3 py-2 text-xs text-white font-mono placeholder-[#8ea3bd]/40 focus:border-[#00d9ff] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10.5px] uppercase text-[#8ea3bd] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="RTL Design Collaboration / Interview Request"
                  className="w-full bg-[#051528] border border-[#102a45] rounded-md px-3 py-2 text-xs text-white font-mono placeholder-[#8ea3bd]/40 focus:border-[#00d9ff] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[10.5px] uppercase text-[#8ea3bd] mb-1">
                  Message Payload *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your requirements, project architecture, or interview timelines..."
                  className="w-full bg-[#051528] border border-[#102a45] rounded-md px-3 py-2 text-xs text-white font-mono placeholder-[#8ea3bd]/40 focus:border-[#00d9ff] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary min-h-[38px] px-5 text-xs"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : status === "sent" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span>Transmitted Successfully</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>

                {status === "sent" && (
                  <span className="font-mono text-xs text-[#34d399] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Message recorded in system
                  </span>
                )}
                {errorMsg && (
                  <span className="font-mono text-xs text-[#fbbf24]">
                    {errorMsg}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
