import React, { useState } from 'react';
import type { GalleryItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { ZoomIn } from 'lucide-react';

interface GalleryProps {
  gallery: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ gallery, onOpenLightbox }) => {
  const [filter, setFilter] = useState('ALL');

  const visibleGallery = gallery.filter((g) => !g.hide);
  const categories = ['ALL', ...Array.from(new Set(visibleGallery.map((g) => g.cat).filter(Boolean)))];

  const filteredGallery = filter === 'ALL'
    ? visibleGallery
    : visibleGallery.filter((g) => g.cat === filter);

  return (
    <section className="py-10 md:py-14 border-t border-[#102a45]/80 relative" id="gallery">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
        <SectionHeader
          num="09"
          label="VISUAL LOG"
          title="LAB & HARDWARE GALLERY"
          meta="BENCH, PROTOTYPES & DIE SHOTS"
        />

        {/* Filter pills if multiple categories */}
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as string)}
                className={`font-mono text-xs px-3 py-1 rounded uppercase tracking-wider transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#00d9ff] text-[#020812] font-bold shadow-[0_0_10px_rgba(0,217,255,0.4)]'
                    : 'bg-[#051528] text-[#8ea3bd] border border-[#102a45] hover:border-[#00d9ff]/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onOpenLightbox(item)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-[#102a45] bg-[#051424] cursor-pointer hover:border-[#00d9ff] hover:shadow-[0_0_24px_rgba(0,217,255,0.25)] transition-all"
            >
              <img
                src={item.img}
                alt={item.cap}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#020812]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#00d9ff]/20 border border-[#00d9ff] flex items-center justify-center text-[#00d9ff]">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#02060d]/90 backdrop-blur-sm px-3 py-2 border-t border-[#102a45]/80 font-mono text-[11px] text-[#e2e8f0] tracking-wide flex justify-between items-center">
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
