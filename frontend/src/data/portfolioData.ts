import type { PortfolioData } from '../types/portfolio';
import profilePhoto from '../assets/profile_photo.jpg';
import dieShot from '../assets/die_shot.jpg';
import hackathonImg from '../assets/hackathons_0.jpg';
import galleryImg from '../assets/gallery_0.jpg';

export const initialPortfolioData: PortfolioData = {
  home: {
    name1: "VIJAYARAGAVAA",
    name2: "V",
    badge: "DIGITAL SYSTEM ARCHITECT | FPGA / ASIC TARGET",
    sub: "ELECTRONICS ENGINEERING – VLSI",
    role: "Aspiring RTL Design & Verification Engineer",
    desc: "Dedicated to designing robust digital architectures, hardware description models in Verilog/SystemVerilog, and synthesis-to-FPGA implementation with rigorous testbench verification.",
    tags: "VLSI, RTL DESIGN, VERILOG, FPGA, DIGITAL DESIGN, DESIGN VERIFICATION",
    eda: "Xilinx Vivado ML Edition\nModelSim / QuestaSim\nCadence Virtuoso Fundamentals\nGTKWave & Icarus Verilog",
    photo: profilePhoto,
    die: dieShot,
    cap: "RMKCET VLSI LAB"
  },
  about: {
    name: "VIJAYARAGAVAA V",
    role: "Aspiring RTL Design & Verification Engineer",
    inst: "RMK College of Eng. & Tech",
    spec: "Electronics – VLSI",
    focus: "Front-End Digital Design",
    hw: "Xilinx Artix-7 / Spartan FPGA",
    status: "AVAILABLE FOR INTERNSHIPS",
    disc: "Electronics & Communication (VLSI Specialization)",
    ptitle: "Silicon Engineering Philosophy",
    bio: "I am an electronics engineer intensely focused on the semiconductor domain. Rather than abstract high-level software, my passion lies in translating complex algorithmic specifications directly into optimized register-transfer level (RTL) architectures that operate deterministically at the silicon layer.\nI focus on timing closure, clock-domain crossing (CDC), minimal area footprints, and low-power dissipation, building digital blocks and FPGA implementations with verification-first discipline.",
    pr: "DETERMINISM | Synchronous state machine design with clean hazard-free transitions.\nROBUST CO-VERIFICATION | Self-checking directed testbenches with corner-case assertion coverage.\nPHYSICAL REALITY | Designing RTL with clear awareness of LUT utilization, wire delays & setup times."
  },
  skills: [
    {
      name: "Digital & RTL Design",
      tag: "FRONT-END",
      desc: "Core digital design and RTL architecture fundamentals.",
      items: "Digital Electronics | CMOS, K-Maps, FSM\nVLSI Design | ASIC Flow, Cell Libraries\nRTL Design | Pipelining, Datapath\nVerilog HDL | IEEE 1364-2001\nDigital Logic | Sequential & Combinational",
      foot: "PROFICIENCY: ADVANCED ACADEMIC & TAPE-READY RTL"
    },
    {
      name: "FPGA & Implementation",
      tag: "HARDWARE",
      desc: "RTL-to-bitstream flow on Xilinx devices.",
      items: "FPGA Fundamentals | CLBs, LUTs, BRAM, DSP\nXilinx Vivado | IP Integration & Bitstreams\nRTL-to-FPGA | Synthesis & Place & Route\nHardware Implementation | XDC Constraints, I/O Pins",
      foot: "BOARDS: XILINX BASYS-3 / NEXYS A7 TARGETING"
    },
    {
      name: "Verification & Debug",
      tag: "VALIDATION",
      desc: "Testbench architecture, simulation and waveform debug.",
      items: "Verification Fundamentals | Coverage & Corner Cases\nTestbench Concepts | Drivers, Monitors, Scoreboard\nSimulation | ModelSim / Questa / Vivado Sim\nDebugging | VCD Waveforms, Glitch Analysis",
      foot: "METHODOLOGY: ASSERTION-BASED DIRECTED & RANDOM"
    },
    {
      name: "Physical Design",
      tag: "BACK-END",
      desc: "Understanding physical realization, power distribution networks, and DRC/LVS.",
      items: "PD Fundamentals | Floorplanning & Placement\nClock Tree Synthesis | Skew & Jitter Optimization\nEDA Tools | Cadence & OpenROAD Basics",
      foot: "CONCEPTS: STATIC TIMING ANALYSIS (STA)"
    },
    {
      name: "Tools & Systems",
      tag: "ENVIRONMENT",
      desc: "Command line tooling, version management, and engineering script automation.",
      items: "Linux / Unix Shell | Bash, Shell Scripting\nGit / GitHub | RTL Versioning & Releases\nVS Code & Extensions | Verilog-HDL & Tcl Linting",
      foot: "OPERATING SYSTEMS: LINUX (UBUNTU), WSL2"
    },
    {
      name: "AI + Engineering & IoT",
      tag: "INTERSECTION",
      desc: "Edge intelligence, hardware accelerator interfaces, and telemetric sensor networks.",
      items: "AI + VLSI | Accelerators, Quantized RTL\nIoT Ecosystems | ESP32, Sensor Fusion\nEmbedded Systems | UART, I2C, SPI Protocols",
      foot: "FOCUS: EMBEDDED EDGE COMPUTING & AGRI-TECH"
    }
  ],
  projects: [
    {
      title: "PARKIFY",
      subtitle: "Smart Parking Management and Reservation Platform",
      tags: "React, Mobile, Supabase, IoT, ESP32-CAM, AI",
      desc: "A smart parking platform connecting customers, parking owners, and administrators. Parking owners manually update parking availability, while customers can discover and reserve available parking spaces. ESP32-CAM/CCTV is used for security monitoring rather than automatic parking-slot availability detection.",
      role: "Full-Stack & IoT Developer",
      status: "In Development",
      link: "#",
      img: ""
    },
    {
      title: "DIGITAL VOTING MACHINE",
      subtitle: "Secure Memory & Anti-Tamper Hardware Architecture",
      tags: "Verilog HDL, FPGA, Digital Logic, FSM",
      desc: "Synthesizable RTL architecture modeling an electronic voting system with encrypted ballot registers, synchronous debounced switch inputs, and finite-state machine control logic.",
      role: "RTL Design Lead",
      status: "Completed",
      link: "#",
      img: ""
    },
    {
      title: "SMART LIFT CONTROLLER",
      subtitle: "Priority Request Scheduler & Hardware State Controller",
      tags: "Digital Design, Verilog, Vivado, FSM",
      desc: "Multi-floor elevator scheduling controller implementing real-time directional priority algorithms, door safety interlocks, and emergency state override in synthesizable Verilog.",
      role: "Digital Logic Designer",
      status: "Completed",
      link: "#",
      img: ""
    }
  ],
  hackathons: [
    {
      award: "1ST PLACE / INNOVATION AWARD",
      level: "NATIONAL LEVEL HACKATHON",
      title: "AgriSense AI: Edge-Intelligent Precision Irrigation",
      desc: "Engineered an end-to-end hardware edge system capable of analyzing micro-soil hydrology and local environmental atmospheric telemetry. Developed custom sensor sampling algorithms on ESP32 running lightweight quantization routines to trigger automated sub-surface drip irrigation without human intervention.",
      role: "Hardware & Firmware Lead",
      team: "4 Engineers",
      outcome: "Gold Trophy & Grant",
      img: hackathonImg
    }
  ],
  achievements: [
    {
      title: "1st Place — Innovation Award",
      org: "National Level Hackathon",
      date: "2024",
      desc: "Won the innovation award for AgriSense AI, an edge-intelligent precision irrigation system.",
      link: "#",
      img: ""
    },
    {
      title: "Peer Learning Team Lead & Academic Mentor",
      org: "RMK College of Engineering & Technology",
      date: "2024",
      desc: "Selected as student mentor and lead for digital electronics & VLSI design peer learning teams.",
      link: "#",
      img: ""
    }
  ],
  certs: [
    {
      org: "IEEE / VLSI ACADEMY",
      title: "Verilog HDL for Digital Design & Verification",
      desc: "Comprehensive training on synthesizable Verilog constructs, blocking vs non-blocking nuances, and finite state machines.",
      year: "2024",
      cid: "#VLSI-8891",
      link: "#"
    },
    {
      org: "XILINX ADAPTIVE",
      title: "FPGA Design Flow using Vivado ML",
      desc: "Synthesis constraints (XDC), static timing analysis, block RAM instantiation, and hardware debugging with Integrated Logic Analyzers (ILA).",
      year: "2024",
      cid: "#FPGA-4402",
      link: "#"
    },
    {
      org: "NPTEL / IIT",
      title: "Digital IC Design & CMOS Fundamentals",
      desc: "In-depth transistor-level analysis of inverter delays, fan-out, dynamic power dissipation, and layout DRC rules.",
      year: "2023",
      cid: "#NPTEL-ECE99",
      link: "#"
    }
  ],
  education: [
    {
      inst: "RMK College of Engineering & Technology",
      degree: "B.E. Electronics & Communication Engineering",
      dept: "Electronics & Communication",
      dur: "Final Year",
      score: "CGPA: 8.5+",
      desc: "Specialization: VLSI. Coursework: Digital Electronics, VLSI Design, Verilog HDL, CMOS Fundamentals, Embedded Systems, Computer Architecture."
    }
  ],
  experience: [
    {
      org: "RMKCET VLSI & Embedded Systems Lab",
      role: "Student Research & RTL Developer",
      dur: "2023 – Present",
      desc: "Architecting synthesizable Verilog modules, running simulations on ModelSim/Vivado, and testing hardware blocks on FPGA development boards.",
      tech: "Verilog HDL, Xilinx Vivado, FPGA, ModelSim, Linux"
    }
  ],
  gallery: [
    {
      cap: "Live prototype bench",
      cat: "Hackathon",
      img: galleryImg
    },
    {
      cap: "Hardware testbench & telemetry setup",
      cat: "AgriSense AI",
      img: hackathonImg
    }
  ],
  contact: {
    cta1: "LET’S BUILD THE FUTURE OF",
    cta2: "DIGITAL DESIGN.",
    cdesc: "Currently preparing for upcoming RTL Design, Verification, and FPGA Hardware Engineering opportunities and internships. Whether you represent a semiconductor manufacturer, fabless IC design startup, or college research laboratory, I welcome your inquiry.",
    email: "vijayaragavaav@gmail.com",
    linkedin: "https://www.linkedin.com/in/vijayaragavaa-v",
    github: "https://github.com/vijayaragavaav",
    youtube: ""
  },
  resume: {
    fname: "VIJAYARAGAVAA_V_VLSI_RTL_RESUME.PDF",
    desc: "Download the comprehensive engineering dossier documenting verified RTL architectures, FPGA hardware implementations, academic transcripts, and technical publications.",
    file: "/resume.pdf"
  }
};
