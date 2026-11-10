import { VFSDirectory, VFSFile, VFSNode } from "./types";

export const INITIAL_VFS: VFSDirectory = {
  type: "dir",
  name: "/",
  permissions: "drwxr-xr-x",
  updatedAt: "2026-11-10 10:00",
  children: {
    home: {
      type: "dir",
      name: "home",
      permissions: "drwxr-xr-x",
      updatedAt: "2026-11-10 10:00",
      children: {
        bhagya: {
          type: "dir",
          name: "bhagya",
          permissions: "drwxr-xr-x",
          updatedAt: "2026-11-10 10:00",
          children: {
            "about.txt": {
              type: "file",
              name: "about.txt",
              permissions: "-rw-r--r--",
              size: 1420,
              updatedAt: "2026-11-10 10:00",
              content: `================================================================================
NAME:        Bhagya Dhingra
ROLE:        Full-Stack Web Architect & AI Systems Engineer
COLLEGE:     The LNM Institute of Information Technology (LNMIIT), Jaipur
DEGREE:      B.Tech. in Computer Science and Engineering (2023 – 2027)
CGPA:        7.98 / 10.0
LOCATION:    Jaipur, Rajasthan, India
STATUS:      Open for Summer 2026 Internships & Software Roles
================================================================================

SUMMARY:
Computer Science undergraduate with a passion for designing production-grade
web applications and low-latency AI-driven systems. Hands-on experience with
Retrieval-Augmented Generation (RAG) using pgvector and Gemini API, high-
throughput asynchronous backend microservices with FastAPI, and optimized audio
machine learning pipelines with Silero VAD, YAMNet, and ReDimNet2.

LEETCODE PROFILE:
Solved 600+ problems across Dynamic Programming, Graphs, Trees, and Complex
System Design. Focus on optimal algorithmic runtime and space complexity.

EXPERIENCE:
- Application Operations & Sustenance Intern @ Maruti Suzuki India Limited (May-June 2026)
- Web Development Lead @ ACM LNMIIT Student Chapter (Nov 2024 – Present)
- General Body Member @ CoSHA LNMIIT (2024 – Present)
`,
            },

            "skills.json": {
              type: "file",
              name: "skills.json",
              permissions: "-rw-r--r--",
              size: 1880,
              updatedAt: "2026-11-10 10:00",
              content: `{
  "languages": [
    "Python",
    "TypeScript",
    "JavaScript",
    "C/C++",
    "Java",
    "Kotlin",
    "SQL",
    "HTML5",
    "CSS3"
  ],
  "ai_and_backend": {
    "architectures": ["RAG (Retrieval-Augmented Generation)", "Vector Embeddings", "Microservices"],
    "frameworks": ["FastAPI", "Node.js", "Express.js", "Next.js API Routes"],
    "llm_tools": ["Gemini API", "pgvector", "Inngest Queue"],
    "databases": ["PostgreSQL", "Neon Serverless", "Redis", "Firebase", "MongoDB"],
    "orm_and_auth": ["SQLAlchemy", "Prisma", "JWT", "Bcrypt"]
  },
  "frontend": [
    "React.js (v18)",
    "Next.js",
    "Tailwind CSS (v4)",
    "TypeScript",
    "Framer Motion / Motion",
    "Shadcn UI",
    "Vite"
  ],
  "audio_ml_systems": [
    "Silero VAD",
    "YAMNet Audio Classifier",
    "ReDimNet2 Speaker Verification",
    "Dual-Confidence Cosine Scoring",
    "Sub-500ms Mobile CPU Inference"
  ],
  "cs_fundamentals": [
    "Data Structures & Algorithms (600+ LeetCode Solved)",
    "Object-Oriented Design (OOD)",
    "Operating Systems",
    "Database Management Systems (DBMS)",
    "Computer Networks",
    "Complexity Analysis"
  ]
}`,
            },

            "experience.md": {
              type: "file",
              name: "experience.md",
              permissions: "-rw-r--r--",
              size: 2100,
              updatedAt: "2026-11-10 10:00",
              content: `# PROFESSIONAL EXPERIENCE & LEADERSHIP

## 1. Maruti Suzuki India Limited
**Role:** Application Operations & Sustenance Intern
**Location:** Gurugram, Haryana, India
**Duration:** May 2026 – June 2026
- Analyzed historical IT service tickets to identify recurring incident trends, system bottlenecks, and understand enterprise support workflows.
- Collaborated with cross-functional technical teams to study operational data and identify concrete opportunities to improve application sustenance efficiency.

---

## 2. ACM LNMIIT Student Chapter
**Role:** Web Development Lead
**Location:** Jaipur, Rajasthan, India
**Duration:** November 2024 – Present
- Organize development sprints, hands-on workshops, and technical mentorship initiatives helping collegiate members build production-ready web applications.
- Spearhead technical initiatives and community projects using React, modern JavaScript, and web architecture standards.

---

## 3. CoSHA LNMIIT (Committee on Student Hostel Affairs)
**Role:** General Body Member
**Location:** Jaipur, Rajasthan, India
**Duration:** 2024 – Present
- Liaised between student body and administration to address residential welfare, campus facilities, and operational improvements through stakeholder coordination.
`,
            },

            "education.txt": {
              type: "file",
              name: "education.txt",
              permissions: "-rw-r--r--",
              size: 980,
              updatedAt: "2026-11-10 10:00",
              content: `================================================================================
ACADEMIC BACKGROUND
================================================================================

1. B.Tech. in Computer Science and Engineering
   Institution: The LNM Institute of Information Technology (LNMIIT)
   Location:    Jaipur, Rajasthan, India
   Batch:       August 2023 – May 2027 (Expected)
   Score:       7.98 / 10.0 CGPA
   Status:      Active, 3rd Year

2. Senior Secondary (Class XII) - Science & Mathematics
   Board:       CBSE (Central Board of Secondary Education)
   Year:        2023
   Score:       94.2%

3. National Examinations:
   - JEE Advanced 2023: AIR 12,307 (top percentile nationally)
`,
            },

            "achievements.txt": {
              type: "file",
              name: "achievements.txt",
              permissions: "-rw-r--r--",
              size: 1100,
              updatedAt: "2026-11-10 10:00",
              content: `================================================================================
HONORS, RECOGNITIONS & COMPETITIVE MILESTONES
================================================================================

[+] 600+ LeetCode Problems Solved
    Consistently practicing data structures, dynamic programming, graphs,
    segment trees, and system design patterns.
    Profile: https://leetcode.com/u/bhagya_0705

[+] JEE Advanced 2023
    Secured All India Rank 12,307 among 200,000+ qualifying applicants in India's
    most demanding engineering entrance exam.

[+] Flipkart GRiD 6.0
    Selected participant in Flipkart's flagship national technology campus hackathon.

[+] IICPC Competitive Programming (2024)
    Qualifying track participant in collegiate algorithmic programming challenge.
`,
            },

            "contact.txt": {
              type: "file",
              name: "contact.txt",
              permissions: "-rw-r--r--",
              size: 850,
              updatedAt: "2026-11-10 10:00",
              content: `================================================================================
COMMUNICATION CHANNELS & PROFILES
================================================================================

* Email:       dhingrabhagya@gmail.com
* Phone:       +91-7849965012
* Location:    Jaipur, Rajasthan, India
* LinkedIn:    https://www.linkedin.com/in/bhagya-dhingra-27b899204/
* GitHub:      https://github.com/bhagya0705
* LeetCode:    https://leetcode.com/u/bhagya_0705
* Portfolio:   https://bhagyadhingra.dev (or GUI mode via navbar)

* Current Status: Available for Summer 2026 Internships (Software Engineering,
  Full-Stack, Backend, AI Systems).
`,
            },

            "resume.pdf": {
              type: "file",
              name: "resume.pdf",
              permissions: "-rwxr-xr-x",
              size: 48920,
              updatedAt: "2026-11-10 10:00",
              downloadUrl: "/Bhagya_Resume.pdf",
              isExecutable: true,
              content: `Binary PDF Document: Bhagya_Resume.pdf [PDF-1.7, 48 KB]
Run 'resume' command or download directly from /Bhagya_Resume.pdf.
`,
            },

            projects: {
              type: "dir",
              name: "projects",
              permissions: "drwxr-xr-x",
              updatedAt: "2026-11-10 10:00",
              children: {
                "study-buddy.md": {
                  type: "file",
                  name: "study-buddy.md",
                  permissions: "-rw-r--r--",
                  size: 2450,
                  updatedAt: "2026-11-10 10:00",
                  category: "Full Stack / AI",
                  content: `# STUDY BUDDY — AI-Powered Learning Platform with RAG

**Category:** Full Stack / AI Systems
**Period:**   June 2026 – July 2026
**Repo:**     https://github.com/bhagya0705

## ARCHITECTURAL OVERVIEW
Study Buddy is a full-stack educational system that ingests user study materials
(PDFs, lecture notes, textbook chapters) and generates grounded summaries, flashcards,
practice quizzes, and real-time contextual Q&A with zero hallucination.

## KEY ENGINEERING HIGHLIGHTS
- Grounded Google Gemini API responses directly in uploaded documents using chunk-level
  vector embeddings and pgvector cosine similarity search.
- Engineered persistent chat history and client-side document caching for instantaneous query responses.
- Implemented secure JWT-based multi-user authorization ensuring strict tenant document isolation.
- Built with high-throughput FastAPI asynchronous endpoints and SQLAlchemy ORM on PostgreSQL.

## DATA PIPELINE
[PDF Upload] -> [Text Chunking (500 tokens)] -> [pgvector Index] -> [RAG Grounding + Gemini] -> [Flashcards & Contextual Q&A]

## TECH STACK
React.js, FastAPI, PostgreSQL, pgvector, SQLAlchemy, JWT, Gemini API, TailwindCSS
`,
                },

                "safeear.md": {
                  type: "file",
                  name: "safeear.md",
                  permissions: "-rw-r--r--",
                  size: 2890,
                  updatedAt: "2026-11-10 10:00",
                  category: "AI/ML Systems",
                  content: `# SAFEEAR — Intelligent Child Safety Surveillance System

**Category:** AI / ML Systems & Real-time Telemetry
**Period:**   January 2026 – April 2026
**Repo:**     https://github.com/bhagya0705/SafeEar

## ARCHITECTURAL OVERVIEW
SafeEar is a real-time, low-latency audio intelligence system built to protect
children by continuously monitoring environmental audio for distress cues, screaming,
abnormal sounds, and unauthorized voices, dispatching live GPS alerts within 2 seconds.

## KEY ENGINEERING HIGHLIGHTS
- Architected a 3-stage audio pipeline:
  1. Silero VAD (Voice Activity Detection) - isolates active human speech.
  2. YAMNet (Sound Classification) - detects distress and environmental acoustic threats.
  3. ReDimNet2 (Speaker Verification) - identifies unknown voices vs. authorized parents.
- Optimized pipeline for mobile CPU execution, achieving sub-500ms inference latency.
- Achieved 95% stranger-detection accuracy across Android SDK 26-35 using dual-confidence
  cosine similarity scoring, reducing false alarms by 15%.
- Built high-speed push notifications and GPS location dispatch in <2 seconds using
  FastAPI on Render, Redis caching, and Firebase Cloud Messaging (FCM).

## PERFORMANCE BENCHMARKS
- Audio Inference Latency: <500 ms on mobile CPU hardware
- GPS Push Alert Dispatch: <2 seconds via Redis + FCM
- Voice Recognition Accuracy: 95% stranger accuracy

## TECH STACK
Python, FastAPI, Kotlin (Android SDK 26-35), Redis, Firebase Cloud Messaging,
Silero VAD, YAMNet, ReDimNet2, PostgreSQL
`,
                },

                "sensai.md": {
                  type: "file",
                  name: "sensai.md",
                  permissions: "-rw-r--r--",
                  size: 2320,
                  updatedAt: "2026-11-10 10:00",
                  category: "AI Web Platform",
                  content: `# SENSAI — AI Career Coach & Job-Preparation Suite

**Category:** Full Stack AI Web Platform
**Period:**   June 2025 – July 2025
**Repo:**     https://github.com/bhagya0705/sensai
**Live Demo:** https://sensai-nine-amber.vercel.app/

## ARCHITECTURAL OVERVIEW
SensAI is an end-to-end career suite that provides automated, industry-tailored
resume generation, customized cover letter creation, and dynamic AI-powered interview
simulations based on user skills and target job descriptions.

## KEY ENGINEERING HIGHLIGHTS
- Created 3 modular full-stack utilities: dynamic resume builder, customized cover letter
  generator, and role-specific AI interview quiz system.
- Connected structured Gemini prompts to Next.js API routes to generate personalized
  industry guidance from user background data.
- Implemented Neon serverless PostgreSQL with Prisma ORM for resilient data persistence.
- Integrated Inngest for reliable background task orchestration and prompt processing.

## TECH STACK
Next.js, Neon Serverless PostgreSQL, Prisma ORM, Inngest Queue, Gemini AI, TailwindCSS
`,
                },

                "llm-shield.md": {
                  type: "file",
                  name: "llm-shield.md",
                  permissions: "-rw-r--r--",
                  size: 1950,
                  updatedAt: "2026-11-10 10:00",
                  category: "AI Security",
                  content: `# LLM-SHIELD — AI Application Guardrail & Input Sanitizer

**Category:** AI Security & Safety Guardrails
**Status:**   Research & Experimental Architecture

## ARCHITECTURAL OVERVIEW
A lightweight security intermediary proxy layer that inspects incoming user prompts
and outgoing model completions for:
- Prompt Injection & Jailbreak attempts
- PII (Personally Identifiable Information) tokenization and masking
- Toxicity and hallucination metric verification
- Latency and token consumption budgeting
`,
                },
              },
            },

            certs: {
              type: "dir",
              name: "certs",
              permissions: "drwxr-xr-x",
              updatedAt: "2026-11-10 10:00",
              children: {
                "jee-advanced-2023.txt": {
                  type: "file",
                  name: "jee-advanced-2023.txt",
                  permissions: "-rw-r--r--",
                  size: 420,
                  updatedAt: "2026-11-10 10:00",
                  content: `EXAMINATION: Joint Entrance Examination (Advanced) 2023
RESULT:      All India Rank 12,307
ORGANIZER:   IIT Guwahati
CANDIDATE:   Bhagya Dhingra
`,
                },
                "flipkart-grid.txt": {
                  type: "file",
                  name: "flipkart-grid.txt",
                  permissions: "-rw-r--r--",
                  size: 380,
                  updatedAt: "2026-11-10 10:00",
                  content: `EVENT:       Flipkart GRiD 6.0 - Flagship National Engineering Challenge
TRACK:       Software Development Challenge
YEAR:        2024
CANDIDATE:   Bhagya Dhingra
`,
                },
                "acm-leadership.txt": {
                  type: "file",
                  name: "acm-leadership.txt",
                  permissions: "-rw-r--r--",
                  size: 450,
                  updatedAt: "2026-11-10 10:00",
                  content: `POSITION:    Web Development Lead
ORGANIZATION: Association for Computing Machinery (ACM) LNMIIT Chapter
PERIOD:      November 2024 – Present
AWARDED TO:  Bhagya Dhingra
`,
                },
              },
            },
          },
        },
      },
    },
  },
};

/**
 * Resolves a given path string relative to current working directory.
 * Translates ~ to /home/bhagya.
 */
export function resolvePath(currentCwd: string, inputPath?: string): string {
  if (!inputPath || inputPath.trim() === "" || inputPath === "~") {
    return "/home/bhagya";
  }

  let target = inputPath.trim();

  // Handle ~ prefix
  if (target === "~" || target === "~/") {
    return "/home/bhagya";
  }
  if (target.startsWith("~/")) {
    target = `/home/bhagya/${target.slice(2)}`;
  }

  // Handle absolute path
  let segments: string[];
  if (target.startsWith("/")) {
    segments = target.split("/").filter(Boolean);
  } else {
    // Relative path to currentCwd
    const baseSegments = currentCwd.split("/").filter(Boolean);
    const targetSegments = target.split("/").filter(Boolean);
    segments = [...baseSegments];

    for (const part of targetSegments) {
      if (part === ".") continue;
      if (part === "..") {
        if (segments.length > 0) segments.pop();
      } else {
        segments.push(part);
      }
    }
  }

  return "/" + segments.join("/");
}

/**
 * Converts internal path (like /home/bhagya/projects) into pretty display path (~/projects)
 */
export function formatDisplayPath(path: string): string {
  if (path === "/home/bhagya") return "~";
  if (path.startsWith("/home/bhagya/")) {
    return "~/" + path.slice("/home/bhagya/".length);
  }
  return path;
}

/**
 * Retrieves a node from the virtual filesystem.
 */
export function getNode(vfs: VFSDirectory, path: string): VFSNode | null {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return vfs;

  let current: VFSNode = vfs;

  for (const seg of segments) {
    if (current.type !== "dir") return null;
    const next = current.children[seg];
    if (!next) return null;
    current = next;
  }

  return current;
}

/**
 * Lists the contents of a directory.
 */
export function listDirectory(
  vfs: VFSDirectory,
  path: string
): { files: VFSFile[]; dirs: VFSDirectory[] } | null {
  const node = getNode(vfs, path);
  if (!node || node.type !== "dir") return null;

  const files: VFSFile[] = [];
  const dirs: VFSDirectory[] = [];

  for (const child of Object.values(node.children)) {
    if (child.type === "file") files.push(child);
    else dirs.push(child);
  }

  return { files, dirs };
}

/**
 * Reads the content of a file at the given path.
 */
export function readFile(vfs: VFSDirectory, path: string): string | null {
  const node = getNode(vfs, path);
  if (!node || node.type !== "file") return null;
  return node.content;
}

/**
 * Generates an ASCII tree diagram of a directory.
 */
export function getTree(vfs: VFSDirectory, path: string): string {
  const node = getNode(vfs, path);
  if (!node) return `tree: ${path}: No such file or directory`;
  if (node.type !== "dir") return `${node.name} [file, ${node.size} bytes]`;

  const lines: string[] = [formatDisplayPath(path)];

  function traverse(dir: VFSDirectory, prefix: string) {
    const entries = Object.values(dir.children).sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    entries.forEach((entry, idx) => {
      const isLast = idx === entries.length - 1;
      const branch = isLast ? "└── " : "├── ";
      const nextPrefix = prefix + (isLast ? "    " : "│   ");

      if (entry.type === "dir") {
        lines.push(`${prefix}${branch}${entry.name}/`);
        traverse(entry, nextPrefix);
      } else {
        lines.push(`${prefix}${branch}${entry.name}`);
      }
    });
  }

  traverse(node, "");
  return lines.join("\n");
}

/**
 * Collects autocompletion suggestions for files and directories matching a prefix.
 */
export function getCompletionOptions(vfs: VFSDirectory, currentCwd: string, partial: string): string[] {
  let searchDir = currentCwd;
  let filePrefix = partial;

  if (partial.includes("/")) {
    const lastSlash = partial.lastIndexOf("/");
    const dirPart = partial.slice(0, lastSlash);
    filePrefix = partial.slice(lastSlash + 1);
    searchDir = resolvePath(currentCwd, dirPart);
  }

  const dirContent = listDirectory(vfs, searchDir);
  if (!dirContent) return [];

  const results: string[] = [];

  for (const d of dirContent.dirs) {
    if (d.name.toLowerCase().startsWith(filePrefix.toLowerCase())) {
      const completion = partial.includes("/")
        ? partial.slice(0, partial.lastIndexOf("/") + 1) + d.name + "/"
        : d.name + "/";
      results.push(completion);
    }
  }

  for (const f of dirContent.files) {
    if (f.name.toLowerCase().startsWith(filePrefix.toLowerCase())) {
      const completion = partial.includes("/")
        ? partial.slice(0, partial.lastIndexOf("/") + 1) + f.name
        : f.name;
      results.push(completion);
    }
  }

  return results;
}

