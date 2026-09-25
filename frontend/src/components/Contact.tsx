import React, { useState } from 'react';
import type { ContactData } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Mail, Send, Check } from 'lucide-react';

interface ContactProps {
  data: ContactData;
}

export const Contact: React.FC<ContactProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Open mailto link
    const subject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `${formData.message}\n\n— Sent by: ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${data.email || 'vijayaragavaav@gmail.com'}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const socialChannels = [
    {
      title: 'EMAIL',
      action: 'SEND DISPATCH →',
      link: data.email ? `mailto:${data.email}` : 'mailto:vijayaragavaav@gmail.com',
      icon: (
        <Mail className="w-4 h-4 text-[#8ea3bd] group-hover:text-[#00d9ff] transition-colors" />
      ),
    },
    {
      title: 'LINKEDIN',
      action: 'CONNECT →',
      link: data.linkedin || 'https://www.linkedin.com/in/vijayaragavaa-v',
      icon: (
        <svg className="w-4 h-4 fill-current text-[#8ea3bd] group-hover:text-[#00d9ff] transition-colors" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      ),
    },
    {
      title: 'GITHUB',
      action: 'CODE REPOS →',
      link: data.github || 'https://github.com/vijayaragavaav',
      icon: (
        <svg className="w-4 h-4 fill-current text-[#8ea3bd] group-hover:text-[#00d9ff] transition-colors" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
        </svg>
      ),
    },
    {
      title: 'YOUTUBE',
      action: 'DEMOS →',
      link: data.youtube || 'https://youtube.com',
      icon: (
        <svg className="w-4 h-4 fill-current text-[#8ea3bd] group-hover:text-[#00d9ff] transition-colors" viewBox="0 0 24 24">
          <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 border-t border-[#0d2238] relative" id="contact">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="10"
          label="OPEN CHANNELS"
          title="CONTACT"
          meta="RESPONSE WINDOW: 24–48 HRS"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Headlines & Channels (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#10304d] bg-[#06182a] px-3.5 py-1.5 rounded text-xs font-mono text-[#00d9ff] tracking-wider mb-6">
                <span>VLSI • RTL • FPGA • VERIFICATION</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-tight mb-6">
                {data.cta1}{' '}
                <b className="text-[#00d9ff] drop-shadow-[0_0_28px_rgba(0,217,255,0.6)]">
                  {data.cta2}
                </b>
              </h2>

              <p className="text-base sm:text-lg text-[#8ea3bd] leading-relaxed mb-8 max-w-xl font-normal">
                {data.cdesc}
              </p>
            </div>

            {/* Social / Direct Channel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialChannels.map((ch) => {
                return (
                  <a
                    key={ch.title}
                    href={ch.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-tech p-5 flex items-center justify-between font-mono text-xs font-semibold tracking-wider text-white hover:border-[#00d9ff] hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      {ch.icon}
                      <span>{ch.title}</span>
                    </div>
                    <span className="text-[#00d9ff] group-hover:translate-x-1 transition-transform">
                      {ch.action}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Form (5 cols) */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleSubmit}
              className="card-tech p-7 sm:p-8 space-y-4 shadow-[0_0_30px_rgba(0,217,255,0.06)]"
            >
              <div>
                <label className="block font-mono text-[11px] text-[#8ea3bd] uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#040c16] border border-[#10304d] rounded p-3 font-mono text-sm text-[#e8f1fb] focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff]/50 transition-all placeholder:text-[#8ea3bd]/40"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[#8ea3bd] uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#040c16] border border-[#10304d] rounded p-3 font-mono text-sm text-[#e8f1fb] focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff]/50 transition-all placeholder:text-[#8ea3bd]/40"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[#8ea3bd] uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="RTL Design / Internship / Verification Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#040c16] border border-[#10304d] rounded p-3 font-mono text-sm text-[#e8f1fb] focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff]/50 transition-all placeholder:text-[#8ea3bd]/40"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[#8ea3bd] uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your project, specifications, or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#040c16] border border-[#10304d] rounded p-3 font-mono text-sm text-[#e8f1fb] focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff]/50 transition-all placeholder:text-[#8ea3bd]/40 resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center mt-2 shadow-[0_0_20px_rgba(0,217,255,0.4)]"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4 text-[#001018]" />
                    <span>OPENING EMAIL CLIENT…</span>
                  </>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
