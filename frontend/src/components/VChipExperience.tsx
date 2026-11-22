import React, { useState, useEffect } from 'react';

export const VChipExperience: React.FC = () => {
  // Phase: 'loading' (0 - 2000ms) -> 'transitioning' (2000ms - 2800ms) -> 'floating' (permanent)
  const [phase, setPhase] = useState<'loading' | 'transitioning' | 'floating'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation from 0% to 100% across 2000ms
    const intervalTime = 20; // 50 updates
    const increment = 100 / (2000 / intervalTime);
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, intervalTime);

    // EXACT 2000ms timer
    const transitionTimer = setTimeout(() => {
      clearInterval(progressTimer);
      setProgress(100);
      setPhase('transitioning');
    }, 2000);

    // After transition completes (800ms transition), lock into permanent floating mode
    const floatingTimer = setTimeout(() => {
      setPhase('floating');
    }, 2800);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(transitionTimer);
      clearTimeout(floatingTimer);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const isFullscreen = phase === 'loading';
  const isTransitioning = phase === 'transitioning';
  const isFloating = phase === 'floating';

  return (
    <>
      {/* ── 1. FULL-SCREEN DARK BACKDROP (ONLY ACTIVE DURING 2000ms LOADING) ── */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02060d] transition-opacity duration-700 pointer-events-none ${
          isFullscreen ? 'opacity-100 pointer-events-auto' : 'opacity-0'
        }`}
        style={{
          display: isFloating ? 'none' : 'flex',
        }}
      >
        {/* Subtle background tech grid & ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.12)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 217, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 217, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Ambient circuit traces (decorative lines) */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d9ff]/30 to-transparent -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#00d9ff]/30 to-transparent -translate-x-1/2 pointer-events-none" />

        {/* Loading status & progress text (positioned below the centered chip) */}
        <div className="absolute bottom-16 sm:bottom-20 flex flex-col items-center gap-3 text-center px-4 z-10">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-[#00d9ff] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00d9ff] animate-ping" />
            <span>LOADING...</span>
            <span className="text-[#8ea3bd] font-normal">[{Math.round(progress)}%]</span>
          </div>

          {/* Precision cyber progress bar */}
          <div className="w-64 sm:w-80 h-1.5 bg-[#06182a] border border-[#10304d] rounded-full overflow-hidden p-[1px] shadow-[0_0_15px_rgba(0,217,255,0.2)]">
            <div
              className="h-full bg-gradient-to-r from-[#0099ff] via-[#00d9ff] to-[#38bdf8] rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_#00d9ff]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Subtext */}
          <p className="font-mono text-xs text-[#8ea3bd] tracking-wide mt-1">
            Initializing <span className="text-white font-semibold">VIJAYARAGAVAA V</span> Experience...
          </p>

          <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-[#00d9ff]/70 tracking-widest mt-1">
            <span>[SYS_INIT: OK]</span>
            <span>•</span>
            <span>[RTL_CORE: ONLINE]</span>
            <span>•</span>
            <span>[CLK: 4.8 GHz]</span>
          </div>
        </div>
      </div>

      {/* ── 2. THE 3D V-CHIP (ANIMATES FROM CENTER TO BOTTOM-RIGHT, THEN FLOATS PERMANENTLY) ── */}
      <div
        onClick={isFloating ? handleScrollToTop : undefined}
        title={isFloating ? 'VIJAYARAGAVAA V • RTL SILICON CORE (Click to scroll top)' : undefined}
        className={`fixed z-50 group cursor-pointer select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFullscreen
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 sm:scale-110 pointer-events-none'
            : isTransitioning
            ? 'top-[calc(100vh-92px)] left-[calc(100vw-92px)] -translate-x-0 -translate-y-0 scale-[0.42] pointer-events-none'
            : 'bottom-4 right-4 sm:bottom-6 sm:right-6 scale-[0.42] sm:scale-[0.46] hover:scale-[0.5] pointer-events-auto'
        }`}
        style={{
          width: '260px',
          height: '260px',
          transformOrigin: 'bottom right',
        }}
      >
        {/* Floating Tooltip (visible only in floating mode on hover) */}
        {isFloating && (
          <div className="absolute -top-10 right-0 bg-[#061423]/95 border border-[#00d9ff]/60 px-3 py-1 rounded text-[11px] font-mono text-[#00d9ff] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-[0_0_15px_rgba(0,217,255,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d9ff] inline-block mr-1.5 animate-pulse" />
            RTL CORE ONLINE • ⌃ TOP
          </div>
        )}

        {/* ── HOLOGRAPHIC ROTATING ENERGY RINGS ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Ring 1 (Outer fine dashed ring - slow clockwise rotation) */}
          <div
            className="absolute w-[250px] h-[250px] rounded-full border border-dashed border-[#00d9ff]/35 animate-[spin_18s_linear_infinite]"
            style={{
              boxShadow: '0 0 20px rgba(0, 217, 255, 0.15)',
            }}
          />

          {/* Ring 2 (Middle segmented holographic ring - counter-clockwise rotation) */}
          <div
            className="absolute w-[214px] h-[214px] rounded-full border-2 border-t-[#00d9ff] border-r-transparent border-b-[#00d9ff]/60 border-l-transparent animate-[spin_10s_linear_infinite_reverse]"
            style={{
              boxShadow: '0 0 25px rgba(0, 217, 255, 0.25)',
            }}
          />

          {/* Ring 3 (Inner precision telemetry ring - fast clockwise rotation) */}
          <div className="absolute w-[176px] h-[176px] rounded-full border border-[#38bdf8]/50 animate-[spin_6s_linear_infinite]">
            {/* Orbital nodes on the ring */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00d9ff] shadow-[0_0_8px_#00d9ff]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8]" />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00d9ff] shadow-[0_0_6px_#00d9ff]" />
          </div>

          {/* Radiating atmospheric aura pulse */}
          <div className="absolute w-[140px] h-[140px] rounded-full bg-[#00d9ff]/15 blur-xl animate-pulse" />
        </div>

        {/* ── THE 3D SEMICONDUCTOR PROCESSOR CHIP (CENTER) ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[124px] h-[124px] bg-gradient-to-br from-[#0c243d] via-[#051322] to-[#020b14] border-2 border-[#00d9ff] rounded-xl shadow-[0_0_35px_rgba(0,217,255,0.45),inset_0_0_15px_rgba(0,217,255,0.2)] p-2.5 flex flex-col items-center justify-center group-hover:shadow-[0_0_45px_rgba(0,217,255,0.7)] transition-shadow">

            {/* Chip pins: Top edge (6 pins) */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-2 bg-gradient-to-t from-[#00d9ff] to-[#38bdf8] rounded-t-xs shadow-[0_0_4px_#00d9ff]" />
              ))}
            </div>

            {/* Chip pins: Bottom edge (6 pins) */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-2 bg-gradient-to-b from-[#00d9ff] to-[#38bdf8] rounded-b-xs shadow-[0_0_4px_#00d9ff]" />
              ))}
            </div>

            {/* Chip pins: Left edge (6 pins) */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-1.5 bg-gradient-to-l from-[#00d9ff] to-[#38bdf8] rounded-l-xs shadow-[0_0_4px_#00d9ff]" />
              ))}
            </div>

            {/* Chip pins: Right edge (6 pins) */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-1.5 bg-gradient-to-r from-[#00d9ff] to-[#38bdf8] rounded-r-xs shadow-[0_0_4px_#00d9ff]" />
              ))}
            </div>

            {/* Chip corner registration crosshairs */}
            <div className="absolute top-1 left-1.5 text-[8px] font-mono text-[#00d9ff]/70 leading-none">+</div>
            <div className="absolute top-1 right-1.5 text-[8px] font-mono text-[#00d9ff]/70 leading-none">+</div>
            <div className="absolute bottom-1 left-1.5 text-[8px] font-mono text-[#00d9ff]/70 leading-none">+</div>
            <div className="absolute bottom-1 right-1.5 text-[8px] font-mono text-[#00d9ff]/70 leading-none">+</div>

            {/* Die Substrate Inner Bevel */}
            <div className="w-full h-full rounded-lg bg-[#040e1a]/90 border border-[#10304d] flex flex-col items-center justify-center relative overflow-hidden">
              {/* Circuit traces on silicon die */}
              <svg
                className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path d="M10 20 H30 V40 H10" stroke="#00d9ff" strokeWidth="1" />
                <path d="M90 20 H70 V40 H90" stroke="#00d9ff" strokeWidth="1" />
                <path d="M10 80 H30 V60 H10" stroke="#00d9ff" strokeWidth="1" />
                <path d="M90 80 H70 V60 H90" stroke="#00d9ff" strokeWidth="1" />
                <circle cx="30" cy="40" r="2" fill="#00d9ff" />
                <circle cx="70" cy="40" r="2" fill="#00d9ff" />
                <circle cx="30" cy="60" r="2" fill="#00d9ff" />
                <circle cx="70" cy="60" r="2" fill="#00d9ff" />
              </svg>

              {/* ── THE PROMINENT CAPITAL "V" ── */}
              <div className="relative z-10 flex items-center justify-center">
                <span
                  className="font-mono font-black text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#e8faff] via-[#00d9ff] to-[#0088cc] drop-shadow-[0_0_15px_rgba(0,217,255,0.9)] tracking-tighter"
                  style={{
                    filter: 'drop-shadow(0 0 8px #00d9ff)',
                    fontFamily: "'Space Grotesk', 'JetBrains Mono', sans-serif",
                  }}
                >
                  V
                </span>
              </div>

              {/* Silicon Die Micro-label */}
              <div className="absolute bottom-1 font-mono text-[7px] text-[#00d9ff]/80 tracking-widest uppercase">
                RTL•VLSI
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
