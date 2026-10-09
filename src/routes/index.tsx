import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight, ArrowUp, Github, Linkedin, Mail, Menu, X, Code2, Server, Brain,
  Database, Wrench, Sparkles, Layout,
} from "lucide-react";
import photo from "@/assets/sathwik.jpg";
import medinear from "@/assets/medinear.jpg";
import campus from "@/assets/campus.jpg";

// Editable placeholders — replace with real values
const EMAIL = "parachikapu.sathwik@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/sathwik-parachikapu/";
const GITHUB = "https://github.com/sathwik-1096";
const MEDINEAR_LIVE = "https://medi-near.vercel.app/";
const MEDINEAR_REPO = "https://github.com/sathwik-1096/health-connect-hub";
const CAMPUS_LIVE = "";
const CAMPUS_REPO = "";

const TITLE = "Sathwik Parachikapu — Software Developer & AI Enthusiast";
const DESC =
  "Portfolio of Sathwik Parachikapu, a B.Tech CS student building web apps, backend systems and exploring Generative AI.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["home", "about", "skills", "projects", "journey", "contact"];

function Index() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(t);
  }, []);
  useReveal();
  return (
    <>
      <Loader done={!loading} />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Exploring />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Loader({ done }: { done: boolean }) {
  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-700 ${done ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center gap-5">
        <span className="font-display text-5xl font-bold text-gradient">SP</span>
        <div className="h-px w-32 overflow-hidden bg-border">
          <div className="animate-load-bar h-full bg-gradient-accent" />
        </div>
      </div>
    </div>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-gradient-accent" style={{ transform: `scaleX(${p})` }} />;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 20);
      for (const id of [...NAV].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) { setActive(id); break; }
      }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-5"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5" aria-label="Main">
        <a href="#home" className="font-display text-lg font-bold">SP<span className="text-cyan">.</span></a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n}>
              <a href={`#${n}`} className={`group relative text-sm capitalize transition-colors ${active === n ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {n}
                <span className={`absolute -bottom-1.5 left-0 h-px bg-gradient-accent transition-all duration-300 ${active === n ? "w-full" : "w-0 group-hover:w-full"}`} />
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden rounded-full bg-gradient-accent px-5 py-2 text-sm font-medium text-primary-foreground glow transition-transform hover:-translate-y-0.5 md:inline-block">Let's Connect</a>
        <button className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="glass mx-4 mt-3 rounded-2xl p-4 md:hidden">
          {NAV.map((n) => (
            <a key={n} href={`#${n}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 capitalize hover:bg-accent">{n}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-gradient-accent px-4 py-3 text-center font-medium text-primary-foreground">Let's Connect</a>
        </div>
      )}
    </header>
  );
}

function RotatingTitle() {
  const titles = ["Software Developer", "Backend Development Enthusiast", "AI Enthusiast"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % titles.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span key={i} className="animate-fade-up inline-block text-gradient">{titles[i]}</span>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan/15 blur-[120px]" />
      {[...Array(6)].map((_, k) => (
        <span key={k} className="animate-float absolute hidden h-1 w-1 rounded-full bg-cyan/60 md:block"
          style={{ left: `${10 + k * 15}%`, top: `${20 + ((k * 37) % 60)}%`, animationDelay: `${k * 0.8}s`, animationDuration: `${6 + k}s` }} />
      ))}
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground" style={{ animationDelay: "1.2s" }}><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> Computer Science Student | Building &amp; Learning</p>
          <p className="animate-fade-up font-mono text-xs tracking-[0.3em] text-cyan" style={{ animationDelay: "1.3s" }}>HELLO, I'M SATHWIK</p>
          <h1 className="animate-fade-up mt-5 text-5xl font-bold leading-[1.05] md:text-7xl" style={{ animationDelay: "1.45s" }}>
            Sathwik<br />Parachikapu
          </h1>
          <p className="animate-fade-up mt-5 h-9 text-2xl font-medium md:text-3xl" style={{ animationDelay: "1.6s" }}><RotatingTitle /></p>
          <p className="animate-fade-up mt-6 max-w-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "1.75s" }}>
            I'm a B.Tech Computer Science student passionate about software development, backend engineering, and Generative AI. I enjoy building practical applications, exploring emerging technologies, and transforming ideas into useful software.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap gap-4" style={{ animationDelay: "1.9s" }}>
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-gradient-accent px-7 py-3.5 font-medium text-primary-foreground glow transition-transform hover:-translate-y-0.5">
              Explore My Work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#contact" className="glass rounded-full px-7 py-3.5 font-medium transition-colors hover:border-primary">Let's Connect</a>
          </div>
          <div className="animate-fade-up mt-8 flex items-center gap-5 text-sm text-muted-foreground" style={{ animationDelay: "2.05s" }}>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground"><Github className="h-4 w-4" /> GitHub</a>
            <span className="h-4 w-px bg-border" />
            <a href={LINKEDIN || "#contact"} {...(LINKEDIN ? { target: "_blank", rel: "noreferrer" } : {})} className="flex items-center gap-2 hover:text-foreground"><Linkedin className="h-4 w-4" /> LinkedIn</a>
          </div>
        </div>
        <div className="animate-fade-up relative mx-auto w-full max-w-sm" style={{ animationDelay: "1.5s" }}>
          <div className="animate-spin-slow absolute -inset-8 rounded-full border border-dashed border-primary/30" />
          <div className="animate-float absolute -right-6 -top-6 h-16 w-16 rounded-2xl border border-cyan/40 glass" />
          <div className="animate-float absolute -bottom-6 -left-6 h-12 w-12 rounded-full border border-primary/50" style={{ animationDelay: "2s" }} />
          <div className="relative rounded-[2rem] bg-gradient-accent p-px glow">
            <div className="overflow-hidden rounded-[2rem] bg-background">
              <img src={photo} alt="Portrait of Sathwik Parachikapu in a black blazer and white shirt" className="aspect-[4/5] w-full object-cover object-[60%_center]" />
            </div>
          </div>
          <div className="glass absolute -bottom-5 right-6 flex items-center gap-2 rounded-full px-4 py-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-cyan" /> B.Tech · Computer Science
          </div>
        </div>
      </div>
      <a href="#about" aria-label="Scroll down" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"><span className="flex h-10 w-6 justify-center rounded-full border border-border pt-2"><span className="animate-float h-2 w-1 rounded-full bg-cyan" style={{ animationDuration: "1.6s" }} /></span></a>
    </section>
  );
}

function SectionHead({ k, title, sub }: { k: string; title: string; sub: string }) {
  return (
    <div className="reveal mb-14">
      <p className="font-mono text-xs tracking-[0.3em] text-cyan">{k}</p>
      <h2 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{sub}</p>
    </div>
  );
}

function About() {
  const cards = [
    ["01", "Software Development", "Exploring programming, application development, and modern software engineering practices."],
    ["02", "Backend Engineering", "Building an understanding of REST APIs, server-side logic, database integration, and application architecture."],
    ["03", "Generative AI", "Learning Python and exploring how Artificial Intelligence can be used to develop useful applications."],
  ];
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHead k="// ABOUT" title="About Me" sub="Curious by nature. Building through code." />
      <div className="grid gap-12 md:grid-cols-2">
        <div className="reveal space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>I'm a B.Tech Computer Science student interested in software development, backend engineering, and Artificial Intelligence. I enjoy developing practical projects, understanding how applications work behind the scenes, and continuously improving my programming skills.</p>
          <p>I'm currently exploring Python and Generative AI while strengthening my software development fundamentals.</p>
          <pre className="glass mt-6 overflow-x-auto rounded-xl p-5 font-mono text-sm text-foreground/80">
{`const sathwik = {
  focus: ["backend", "web", "gen-ai"],
  learning: true,
};`}
          </pre>
        </div>
        <div className="space-y-4">
          {cards.map(([n, t, d], i) => (
            <div key={n} className="reveal glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/50" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-cyan">{n}</span>
                <div>
                  <h3 className="text-xl font-semibold">{t}</h3>
                  <p className="mt-1.5 text-muted-foreground">{d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups: [string, typeof Code2, string[]][] = [
    ["Programming", Code2, ["Java", "Python", "JavaScript", "SQL"]],
    ["Frontend", Layout, ["HTML", "CSS", "React", "TypeScript"]],
    ["Backend", Server, ["Spring Boot", "REST APIs", "Java"]],
    ["Databases", Database, ["PostgreSQL"]],
    ["Developer Tools", Wrench, ["Git", "GitHub", "Postman", "VS Code", "IntelliJ IDEA"]],
    ["Currently Exploring", Sparkles, ["Generative AI", "Python libraries", "AI-powered applications"]],
  ];
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHead k="// SKILLS" title="My Technical Toolkit" sub="Technologies I use, practice, and explore." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([name, Icon, items], i) => (
          <div key={name} className="reveal glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:glow" style={{ transitionDelay: `${i * 70}ms` }}>
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-cyan"><Icon className="h-5 w-5" /></span>
              <h3 className="font-semibold">{name}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => (
                <span key={s} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm transition-colors hover:border-cyan/60">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LinkBtn({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const cls = `group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${primary ? "bg-gradient-accent text-primary-foreground" : "glass hover:border-primary"}`;
  if (!href)
    return <span className={`${cls} cursor-not-allowed opacity-50`} title="Link coming soon">{children} <ArrowUpRight className="h-4 w-4" /></span>;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function Projects() {
  const projects = [
    { n: "01", name: "MediNear", cat: "Pharmacy Technology Platform", img: medinear, live: MEDINEAR_LIVE, repo: MEDINEAR_REPO, liveLabel: "Live Demo",
      desc: "MediNear is a pharmacy platform designed to help users discover nearby pharmacies and explore medicine availability. It includes features for pharmacy inventory management and billing to support pharmacy operations.",
      features: ["Nearby pharmacy discovery", "Medicine availability exploration", "Pharmacy inventory management", "Billing functionality"],
      tech: ["React", "TypeScript", "Java", "Spring Boot", "REST APIs"] },
    { n: "02", name: "Campus Connect", cat: "Student Portal", img: campus, live: CAMPUS_LIVE, repo: CAMPUS_REPO, liveLabel: "View Project",
      desc: "Campus Connect is a student portal designed to improve campus communication through complaint registration, notices, events, clubs, and student-faculty interaction.",
      features: ["Complaint registration", "Campus notices", "Events and clubs", "Student-faculty communication"],
      tech: ["Java", "Spring Boot", "HTML", "CSS", "JavaScript", "PostgreSQL"] },
  ];
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHead k="// PROJECTS" title="Featured Projects" sub="Turning ideas into practical applications." />
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.name} className="reveal glass group overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:glow">
            <div className="relative overflow-hidden">
              <img src={p.img} alt={`${p.name} illustration`} loading="lazy" width={1280} height={800} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-xs">{p.n}</span>
            </div>
            <div className="p-7">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan">{p.cat}</p>
              <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.desc}</p>
              <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                {p.features.map((f) => <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan" />{f}</li>)}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => <span key={t} className="rounded-md bg-accent px-2.5 py-1 font-mono text-xs">{t}</span>)}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {p.live && <LinkBtn href={p.live} primary>{p.liveLabel}</LinkBtn>}
                {p.repo && <LinkBtn href={p.repo}><Github className="h-4 w-4" /> GitHub Repository</LinkBtn>}
                {!p.live && !p.repo && <span className="font-mono text-xs text-muted-foreground">Links coming soon</span>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Exploring() {
  const items: [typeof Brain, string, string][] = [
    [Layout, "Full-Stack Web Development", "Exploring how modern frontend interfaces communicate with backend services to create complete applications."],
    [Server, "Backend Engineering", "Learning about APIs, database integration, server-side logic, and application architecture."],
    [Brain, "Generative AI", "Exploring Python, AI concepts, and the possibilities of building AI-powered applications."],
    [Code2, "Practical Project Development", "Applying technical knowledge through hands-on projects and continuous experimentation."],
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <SectionHead k="// INTERESTS" title="What I'm Exploring" sub="Areas I'm learning and growing in." />
      <div className="relative">
        <svg className="absolute left-0 top-1/2 hidden h-px w-full lg:block" aria-hidden>
          <line x1="0" y1="0" x2="100%" y2="0" stroke="var(--primary)" strokeWidth="1" strokeDasharray="6 14" className="animate-dash" opacity="0.6" />
        </svg>
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([Icon, t, d], i) => (
            <div key={t} className="reveal glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-cyan/50" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-cyan transition-transform group-hover:scale-110"><Icon className="h-5 w-5" /></span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const steps = [
    ["Computer Science Engineering", "Building a foundation in computer science, programming, and software development."],
    ["Programming and DSA", "Practicing programming fundamentals, data structures, algorithms, and problem-solving techniques."],
    ["Full-Stack Projects", "Applying technical knowledge through projects such as MediNear and Campus Connect."],
    ["Python Development", "Strengthening Python fundamentals and exploring its libraries and practical applications."],
    ["Generative AI", "Beginning to explore Generative AI and how AI technologies can be used to build useful applications."],
  ];
  return (
    <section id="journey" className="mx-auto max-w-4xl px-5 py-28">
      <SectionHead k="// JOURNEY" title="My Learning Journey" sub="Learning, building, and improving one step at a time." />
      <ol className="relative ml-3 border-l border-border md:ml-0 md:border-0">
        <span aria-hidden className="absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-cyan to-transparent md:block" />
        {steps.map(([t, d], i) => (
          <li key={t} className={`reveal relative mb-10 pl-8 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`} style={{ transitionDelay: `${i * 80}ms` }}>
            <span className={`absolute top-5 h-3 w-3 rounded-full bg-cyan glow -left-[6.5px] ${i % 2 ? "md:-left-[6px]" : "md:left-auto md:-right-[6px]"}`} />
            <div className="glass rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/50">
              <p className="font-mono text-xs text-cyan">MILESTONE 0{i + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  const opts = [
    { Icon: Mail, label: "Email", value: EMAIL || "Email coming soon", href: EMAIL ? `mailto:${EMAIL}` : "" },
    { Icon: Linkedin, label: "LinkedIn", value: "sathwik-parachikapu", href: LINKEDIN },
    { Icon: Github, label: "GitHub", value: "sathwik-1096", href: GITHUB },
  ];
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-28">
      <div className="reveal glass relative overflow-hidden rounded-[2rem] p-8 md:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />
        <p className="font-mono text-xs tracking-[0.3em] text-cyan">// CONTACT</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold md:text-6xl">Let's Build Something <span className="text-gradient">Meaningful.</span></h2>
        <p className="mt-5 max-w-xl text-muted-foreground">I'm always interested in learning new technologies, building useful projects, collaborating with others, and exploring opportunities in software development and Artificial Intelligence.</p>
        <div className="relative mt-10 grid gap-4 md:grid-cols-3">
          {opts.map(({ Icon, label, value, href }) => {
            const inner = (
              <>
                <Icon className="h-6 w-6 text-cyan transition-transform group-hover:-translate-y-1 group-hover:scale-110" />
                <p className="mt-4 text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 font-medium">{value}</p>
              </>
            );
            const cls = "group block min-w-0 break-words rounded-2xl border border-border bg-secondary/60 p-6 transition-all";
            return href ? (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`${cls} hover:-translate-y-1 hover:border-primary/60`}>{inner}</a>
            ) : (
              <div key={label} className={`${cls} opacity-70`}>{inner}</div>
            );
          })}
        </div>
        <a href={EMAIL ? `mailto:${EMAIL}` : GITHUB} target={EMAIL ? undefined : "_blank"} rel="noreferrer" className="group relative mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-accent px-8 py-4 font-medium text-primary-foreground glow transition-transform hover:-translate-y-0.5">
          Send Me an Email <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display font-bold">Sathwik Parachikapu</p>
          <p className="text-sm text-muted-foreground">Software Developer | AI Enthusiast</p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm text-muted-foreground" aria-label="Footer">
          {NAV.filter((n) => n !== "journey").map((n) => <a key={n} href={`#${n}`} className="capitalize hover:text-foreground">{n}</a>)}
        </nav>
        <div className="flex items-center gap-4">
          <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground"><Github className="h-5 w-5" /></a>
          {LINKEDIN && <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-5 w-5" /></a>}
          <a href="#home" aria-label="Back to top" className="glass grid h-10 w-10 place-items-center rounded-full transition-transform hover:-translate-y-1"><ArrowUp className="h-4 w-4" /></a>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Sathwik Parachikapu. All rights reserved.</p>
    </footer>
  );
}
