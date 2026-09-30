// @ts-nocheck
import { useEffect, useState } from 'react'
import {
  profile,
  socials,
  skills,
  experiences,
  education,
  currentStudies,
  certifications,
  languages,
} from './data/resume'
import Icon from './Icon'

const NAV = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'skills', label: 'Skills' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'formacao', label: 'Formação' },
  { id: 'certificacoes', label: 'Certificações' },
  { id: 'contato', label: 'Contato' },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#inicio" className="logo" onClick={() => setOpen(false)}>
          GB<span>.</span>
        </a>
        <button
          className="menu-toggle"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function SectionTitle({ kicker, title }) {
  return (
    <div className="section-title reveal">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
    </div>
  )
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % profile.roles.length), 2800)
    return () => clearInterval(t)
  }, [])

  const stats = [
    { value: '2+', label: 'anos em suporte técnico' },
    { value: certifications.length, label: 'certificações' },
    { value: 'ADS', label: 'graduação concluída' },
  ]

  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <span className="badge">
            <span className="dot" /> Disponível para oportunidades
          </span>
          <h1>
            Olá, eu sou <br />
            <span className="gradient">{profile.shortName}</span>
          </h1>
          <p className="role" aria-live="polite">
            <span key={roleIndex} className="role-text">
              {profile.roles[roleIndex]}
            </span>
          </p>
          <p className="hero-lead">
            Do suporte técnico ao desenvolvimento: uso raciocínio analítico e foco no cliente para
            construir interfaces com React, JavaScript e Python.
          </p>
          <div className="hero-actions">
            <a href="#contato" className="btn btn-primary">
              <Icon name="mail" /> Entrar em contato
            </a>
            <a href="#experiencia" className="btn btn-ghost">
              Ver experiência <Icon name="arrow" />
            </a>
          </div>
          <div className="socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="hero-photo">
          <div className="photo-frame">
            <img src={profile.photo} alt={`Foto de ${profile.name}`} />
          </div>
          <div className="floating-card">
            <Icon name="pin" />
            <div>
              <strong>{profile.location}</strong>
              <small>Brasil</small>
            </div>
          </div>
        </div>
      </div>

      <div className="container stats">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="sobre" className="section">
      <div className="container">
        <SectionTitle kicker="01 · Sobre mim" title="Resumo profissional" />
        <div className="about-grid">
          <div className="about-text reveal">
            {profile.summary.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className="about-side reveal">
            <div className="card objective">
              <span className="card-label">
                <Icon name="target" /> Objetivo
              </span>
              <p>{profile.objective}</p>
            </div>
            <div className="card">
              <span className="card-label">
                <Icon name="globe" /> Idiomas
              </span>
              <ul className="languages">
                {languages.map((l) => (
                  <li key={l.name}>
                    <div className="lang-head">
                      <span>{l.name}</span>
                      <small>{l.level}</small>
                    </div>
                    <div className="bar">
                      <span style={{ width: `${l.value}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section alt">
      <div className="container">
        <SectionTitle kicker="02 · Stack" title="Linguagens e tecnologias" />
        <div className="skills-grid">
          {skills.map((s) => (
            <div key={s.group} className="card skill-card reveal">
              <h3>{s.group}</h3>
              <ul className="chips">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="card skill-card code-card reveal" aria-hidden="true">
            <pre>
              <code>
                <span className="c-key">const</span> dev = {'{'}
                {'\n'}  foco: <span className="c-str">'Front-end'</span>,
                {'\n'}  rumo: <span className="c-str">'Full Stack'</span>,
                {'\n'}  aprendendo: <span className="c-bool">true</span>
                {'\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experiencia" className="section">
      <div className="container">
        <SectionTitle kicker="03 · Carreira" title="Experiência profissional" />
        <ol className="timeline">
          {experiences.map((e) => (
            <li key={e.company} className="timeline-item reveal">
              <div className="card">
                <div className="exp-head">
                  <div>
                    <h3>{e.role}</h3>
                    <p className="company">{e.company}</p>
                  </div>
                  <span className="period">{e.period}</span>
                </div>
                <ul className="bullets">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <ul className="chips small">
                  {e.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="formacao" className="section alt">
      <div className="container">
        <SectionTitle kicker="04 · Formação" title="Formação acadêmica" />
        <div className="edu-grid">
          <div className="card edu-card reveal">
            <div className="edu-head">
              <div className="edu-icon">
                <Icon name="cap" />
              </div>
              <div>
                <h3>{education.course}</h3>
                <p className="company">{education.institution}</p>
              </div>
              <span className="status">
                <Icon name="check" /> {education.status}
              </span>
            </div>
            <p>{education.description}</p>
            <h4>Matérias desenvolvidas</h4>
            <ul className="subjects">
              {education.subjects.map((s) => (
                <li key={s}>
                  <span>{s}</span>
                  <small>160h</small>
                </li>
              ))}
            </ul>
          </div>

          <div className="card studying reveal">
            <span className="card-label">
              <Icon name="book" /> Atualmente cursando
            </span>
            <ul>
              {currentStudies.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong>
                  <small>{c.org}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Certifications() {
  const categories = ['Todas', ...new Set(certifications.map((c) => c.category))]
  const [filter, setFilter] = useState('Todas')
  const list = filter === 'Todas' ? certifications : certifications.filter((c) => c.category === filter)
  const totalHours = certifications.reduce((sum, c) => sum + parseInt(c.hours, 10), 0)

  return (
    <section id="certificacoes" className="section">
      <div className="container">
        <SectionTitle kicker="05 · Aprendizado contínuo" title="Certificações" />
        <p className="section-sub reveal">
          {certifications.length} certificações · {totalHours}h de carga horária em cloud, IA,
          desenvolvimento e fundamentos de TI.
        </p>
        <div className="filters reveal" role="tablist">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={filter === c ? 'active' : ''}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="cert-grid">
          {list.map((c) => (
            <article key={c.title} className="card cert-card">
              <div className="cert-meta">
                <span className={`cat cat-${c.category.toLowerCase()}`}>{c.category}</span>
                <span>
                  {c.year} · {c.hours}
                </span>
              </div>
              <h3>{c.title}</h3>
              <p className="org">{c.org}</p>
              <p>{c.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contato" className="section contact">
      <div className="container">
        <div className="contact-box reveal">
          <span className="kicker">06 · Contato</span>
          <h2>Vamos conversar?</h2>
          <p>
            Estou em busca de oportunidades como {profile.objective.toLowerCase()}. Se você tem uma
            vaga ou projeto em mente, me mande uma mensagem.
          </p>
          <a className="btn btn-primary btn-lg" href={`mailto:${profile.email}`}>
            <Icon name="mail" /> {profile.email}
          </a>
          <div className="contact-links">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                <Icon name={s.icon} /> {s.label}
              </a>
            ))}
            <span>
              <Icon name="pin" /> {profile.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} {profile.name} · Feito com React + Vite
        </div>
      </footer>
    </>
  )
}
