-- ============================================================
-- Seed: 002_seed_portfolio.sql
-- Portfolio: VIJAYARAGAVAA V — RTL / VLSI Engineer
-- Description: Initial seed data matching the Stitch/Phase 1 design
-- Run this AFTER 001_initial_schema.sql
-- ============================================================

-- Profile
insert into public.profiles (full_name, role, institution, specialization, bio)
values (
  'VIJAYARAGAVAA V',
  'Aspiring RTL Design & Verification Engineer',
  'RMK College of Engineering & Technology',
  'Electronics – VLSI',
  'I am an electronics engineer intensely focused on the semiconductor domain. Rather than abstract high-level software, my passion lies in translating complex algorithmic specifications directly into optimized register-transfer level (RTL) architectures that operate deterministically at the silicon layer.'
);

-- Site Settings
insert into public.site_settings (site_title, site_description, primary_email, linkedin_url, github_url)
values (
  'VIJAYARAGAVAA V — RTL / VLSI Portfolio',
  'Professional engineering portfolio for VIJAYARAGAVAA V — Aspiring RTL Design & Verification Engineer specializing in VLSI, FPGA, and Digital Design.',
  'vijayaragavaav@gmail.com',
  'https://www.linkedin.com/in/vijayaragavaa-v',
  'https://github.com/vijayaragavaav'
);

-- Home Content
insert into public.home_content (badge_text, hero_title, hero_highlight, hero_description, email, linkedin_url, github_url, resume_url, visible)
values (
  'DIGITAL SYSTEM ARCHITECT | FPGA / ASIC TARGET',
  'VIJAYARAGAVAA',
  'V',
  'Dedicated to designing robust digital architectures, hardware description models in Verilog/SystemVerilog, and synthesis-to-FPGA implementation with rigorous testbench verification.',
  'vijayaragavaav@gmail.com',
  'https://www.linkedin.com/in/vijayaragavaa-v',
  'https://github.com/vijayaragavaav',
  '/resume.pdf',
  true
);

-- About Content
insert into public.about_content (section_title, short_bio, engineering_philosophy, institution, specialization, primary_focus, target_hardware, visible)
values (
  'About',
  'I am an electronics engineer intensely focused on the semiconductor domain. Rather than abstract high-level software, my passion lies in translating complex algorithmic specifications directly into optimized register-transfer level (RTL) architectures that operate deterministically at the silicon layer. I focus on timing closure, clock-domain crossing (CDC), minimal area footprints, and low-power dissipation.',
  'DETERMINISM | Synchronous state machine design with clean hazard-free transitions. ROBUST CO-VERIFICATION | Self-checking directed testbenches with corner-case assertion coverage. PHYSICAL REALITY | Designing RTL with clear awareness of LUT utilization, wire delays & setup times.',
  'RMK College of Eng. & Tech',
  'Electronics – VLSI',
  'Front-End Digital Design',
  'Xilinx Artix-7 / Spartan FPGA',
  true
);

-- Skills
insert into public.skills (category, name, description, technology, sort_order, visible) values
('Digital & RTL Design',    'Digital Electronics',     'CMOS, K-Maps, FSM fundamentals',                         'Digital Electronics | CMOS, K-Maps, FSM',                0, true),
('Digital & RTL Design',    'VLSI Design',             'ASIC flow, cell libraries, standard cell concepts',      'VLSI Design | ASIC Flow, Cell Libraries',                1, true),
('Digital & RTL Design',    'RTL Design',              'Pipelining, datapath microarchitecture',                 'RTL Design | Pipelining, Datapath',                      2, true),
('Digital & RTL Design',    'Verilog HDL',             'IEEE 1364-2001 synthesizable RTL',                       'Verilog HDL | IEEE 1364-2001',                           3, true),
('Digital & RTL Design',    'Digital Logic',           'Sequential and combinational circuit design',            'Digital Logic | Sequential & Combinational',             4, true),
('FPGA & Implementation',   'FPGA Fundamentals',       'CLBs, LUTs, BRAM, DSP slices',                          'FPGA Fundamentals | CLBs, LUTs, BRAM, DSP',             10, true),
('FPGA & Implementation',   'Xilinx Vivado',           'IP integration and bitstream generation',                'Xilinx Vivado | IP Integration & Bitstreams',           11, true),
('FPGA & Implementation',   'RTL-to-FPGA Flow',        'Synthesis and place & route',                           'RTL-to-FPGA | Synthesis & Place & Route',               12, true),
('FPGA & Implementation',   'Hardware Implementation', 'XDC constraints and I/O pin assignment',                'Hardware Implementation | XDC Constraints, I/O Pins',   13, true),
('Verification & Debug',    'Verification Fundamentals','Coverage metrics and corner case planning',             'Verification Fundamentals | Coverage & Corner Cases',   20, true),
('Verification & Debug',    'Testbench Concepts',      'Drivers, monitors, scoreboard architecture',             'Testbench Concepts | Drivers, Monitors, Scoreboard',    21, true),
('Verification & Debug',    'Simulation',              'ModelSim / Questa / Vivado Sim flows',                  'Simulation | ModelSim / Questa / Vivado Sim',           22, true),
('Verification & Debug',    'Debugging',               'VCD waveforms and glitch analysis',                     'Debugging | VCD Waveforms, Glitch Analysis',            23, true),
('Physical Design',         'PD Fundamentals',         'Floorplanning and placement concepts',                  'PD Fundamentals | Floorplanning & Placement',           30, true),
('Physical Design',         'Clock Tree Synthesis',    'Skew and jitter optimization techniques',               'Clock Tree Synthesis | Skew & Jitter Optimization',     31, true),
('Physical Design',         'EDA Tools',               'Cadence and OpenROAD basics',                           'EDA Tools | Cadence & OpenROAD Basics',                 32, true),
('Tools & Systems',         'Linux / Unix Shell',      'Bash scripting and shell automation',                   'Linux / Unix Shell | Bash, Shell Scripting',            40, true),
('Tools & Systems',         'Git / GitHub',            'RTL versioning and releases',                           'Git / GitHub | RTL Versioning & Releases',              41, true),
('Tools & Systems',         'VS Code & Extensions',    'Verilog-HDL and Tcl linting tools',                    'VS Code & Extensions | Verilog-HDL & Tcl Linting',     42, true),
('AI + Engineering & IoT',  'AI + VLSI',               'Accelerators and quantized RTL designs',                'AI + VLSI | Accelerators, Quantized RTL',               50, true),
('AI + Engineering & IoT',  'IoT Ecosystems',          'ESP32 and sensor fusion systems',                       'IoT Ecosystems | ESP32, Sensor Fusion',                 51, true),
('AI + Engineering & IoT',  'Embedded Systems',        'UART, I2C, SPI communication protocols',               'Embedded Systems | UART, I2C, SPI Protocols',          52, true);

-- Projects
insert into public.projects (title, short_description, description, technologies, role, status, sort_order, published) values
(
  'PARKIFY',
  'Smart Parking Management and Reservation Platform',
  'A smart parking platform connecting customers, parking owners, and administrators. Parking owners manually update parking availability, while customers can discover and reserve available parking spaces. ESP32-CAM/CCTV is used for security monitoring rather than automatic parking-slot availability detection.',
  ARRAY['React', 'Mobile', 'Supabase', 'IoT', 'ESP32-CAM', 'AI'],
  'Full-Stack & IoT Developer',
  'In Development',
  0, true
),
(
  'DIGITAL VOTING MACHINE',
  'Secure Memory & Anti-Tamper Hardware Architecture',
  'Synthesizable RTL architecture modeling an electronic voting system with encrypted ballot registers, synchronous debounced switch inputs, and finite-state machine control logic.',
  ARRAY['Verilog HDL', 'FPGA', 'Digital Logic', 'FSM'],
  'RTL Design Lead',
  'Completed',
  1, true
),
(
  'SMART LIFT CONTROLLER',
  'Priority Request Scheduler & Hardware State Controller',
  'Multi-floor elevator scheduling controller implementing real-time directional priority algorithms, door safety interlocks, and emergency state override in synthesizable Verilog.',
  ARRAY['Digital Design', 'Verilog', 'Vivado', 'FSM'],
  'Digital Logic Designer',
  'Completed',
  2, true
);

-- Hackathons
insert into public.hackathons (title, award, level, description, role, team_size, outcome, sort_order, published) values
(
  'AgriSense AI: Edge-Intelligent Precision Irrigation',
  '1ST PLACE / INNOVATION AWARD',
  'NATIONAL LEVEL HACKATHON',
  'Engineered an end-to-end hardware edge system capable of analyzing micro-soil hydrology and local environmental atmospheric telemetry. Developed custom sensor sampling algorithms on ESP32 running lightweight quantization routines to trigger automated sub-surface drip irrigation without human intervention.',
  'Hardware & Firmware Lead',
  '4 Engineers',
  'Gold Trophy & Grant',
  0, true
);

-- Achievements
insert into public.achievements (title, organization, description, achievement_date, sort_order, published) values
(
  '1st Place — Innovation Award',
  'National Level Hackathon',
  'Won the innovation award for AgriSense AI, an edge-intelligent precision irrigation system.',
  '2024',
  0, true
),
(
  'Peer Learning Team Lead & Academic Mentor',
  'RMK College of Engineering & Technology',
  'Selected as student mentor and lead for digital electronics & VLSI design peer learning teams.',
  '2024',
  1, true
);

-- Certifications
insert into public.certifications (organization, title, certificate_id, description, issued_date, sort_order, published) values
(
  'IEEE / VLSI ACADEMY',
  'Verilog HDL for Digital Design & Verification',
  '#VLSI-8891',
  'Comprehensive training on synthesizable Verilog constructs, blocking vs non-blocking nuances, and finite state machines.',
  '2024',
  0, true
),
(
  'XILINX ADAPTIVE',
  'FPGA Design Flow using Vivado ML',
  '#FPGA-4402',
  'Synthesis constraints (XDC), static timing analysis, block RAM instantiation, and hardware debugging with Integrated Logic Analyzers (ILA).',
  '2024',
  1, true
),
(
  'NPTEL / IIT',
  'Digital IC Design & CMOS Fundamentals',
  '#NPTEL-ECE99',
  'In-depth transistor-level analysis of inverter delays, fan-out, dynamic power dissipation, and layout DRC rules.',
  '2023',
  2, true
);

-- Education
insert into public.education (institution, degree, department, specialization, end_date, description, sort_order, published) values
(
  'RMK College of Engineering & Technology',
  'B.E. Electronics & Communication Engineering',
  'Electronics & Communication',
  'VLSI',
  'Final Year',
  'Specialization: VLSI. Coursework: Digital Electronics, VLSI Design, Verilog HDL, CMOS Fundamentals, Embedded Systems, Computer Architecture. CGPA: 8.5+',
  0, true
);

-- Experience
insert into public.experience (organization, position, description, start_date, end_date, technologies, sort_order, published) values
(
  'RMKCET VLSI & Embedded Systems Lab',
  'Student Research & RTL Developer',
  'Architecting synthesizable Verilog modules, running simulations on ModelSim/Vivado, and testing hardware blocks on FPGA development boards.',
  '2023',
  'Present',
  ARRAY['Verilog HDL', 'Xilinx Vivado', 'FPGA', 'ModelSim', 'Linux'],
  0, true
);

-- Contact Settings
insert into public.contact_settings (email, linkedin_url, github_url, contact_enabled) values
(
  'vijayaragavaav@gmail.com',
  'https://www.linkedin.com/in/vijayaragavaa-v',
  'https://github.com/vijayaragavaav',
  true
);

-- Resume
insert into public.resume (file_name, file_url, is_active) values
(
  'VIJAYARAGAVAA_V_VLSI_RTL_RESUME.PDF',
  '/resume.pdf',
  true
);
