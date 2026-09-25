import React from 'react';
import type { GalleryItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { ZoomIn } from 'lucide-react';

interface GalleryProps {
  gallery: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ gallery, onOpenLightbox }) => {
  return (
    <section className="py-24 border-t border-[#0d2238] relative" id="gallery">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="09"
          label="VISUAL LOG"
          title="GALLERY"
          meta="BENCH, EVENTS & HARDWARE"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {gallery.filter((g) => !g.hide).map((item, idx) => (
            <div
              key={idx}
              onClick={() => onOpenLightbox(item)}
              className="group relative aspect-[4/3] overflow-hidden rounded-md border border-[#10304d] bg-[#06121f] cursor-pointer hover:border-[#00d9ff] hover:shadow-[0_0_25px_rgba(0,217,255,0.25)] transition-all"
            >
              <img
                src={item.img}
                alt={item.cap}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#00d9ff]/20 border border-[#00d9ff] flex items-center justify-center text-[#00d9ff]">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#030609]/90 backdrop-blur-sm px-3.5 py-2 border-t border-[#10304d]/70 font-mono text-[11px] text-[#e8f1fb] tracking-wide flex justify-between items-center">
                <span className="truncate">{item.cap}</span>
                {item.cat && (
                  <span className="text-[#00d9ff] text-[10px] ml-2 shrink-0">
                    {item.cat}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
