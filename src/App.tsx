import BrandMark from './components/BrandMark'
import EmmanuelPage from './pages/EmmanuelPage'
import EmilioPage from './pages/EmilioPage'
import FiorellaPage from './pages/FiorellaPage'
import FedericoPage from './pages/FedericoPage'
import JosefinaPage from './pages/JosefinaPage'
import NahuelPage from './pages/NahuelPage'
import { members } from './memberConfig'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'

const nodes = [
  { x: '7%', y: '24%', delay: '0s' },
  { x: '19%', y: '68%', delay: '-1.6s' },
  { x: '35%', y: '14%', delay: '-3.1s' },
  { x: '58%', y: '77%', delay: '-2.3s' },
  { x: '74%', y: '18%', delay: '-4.2s' },
  { x: '89%', y: '57%', delay: '-.8s' },
]

const posters = [
  {
    number: '01',
    title: 'Póster oficial del ABP',
    subtitle: 'Arquitectura de las Computadoras · Gym Master VR',
    image: '/posters/gym-master-vr-oficial.png',
  },
  {
    number: '02',
    title: 'Póster para la defensa',
    subtitle: 'Versión visual para exposición oral',
    image: '/posters/gym-master-vr-defensa.png',
  },
] as const

function TrainingFigures() {
  return (
    <div className="background-figures" aria-hidden="true">
      <svg className="training-figure figure-strike" viewBox="0 0 320 620">
        <defs>
          <linearGradient id="athlete-fill-left" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4FC3F7" stopOpacity=".3" />
            <stop offset="1" stopColor="#0F4C81" stopOpacity=".08" />
          </linearGradient>
        </defs>
        <g className="figure-motion">
          <path className="body-plane" d="M139 164c22-13 56-8 69 18l24 105-58 31-65-32 9-87z" />
          <path className="limb limb-back" d="M127 199 72 243 29 223M122 279 82 385 49 506" />
          <path className="limb" d="m202 201 53 16 44-33M190 297l39 111 44 92" />
          <path className="limb-detail" d="m72 243 24 21m133 144-25 19" />
          <circle className="head" cx="165" cy="118" r="39" />
          <path className="headset" d="M126 106c21-12 55-13 78-2l-2 30c-22 9-51 9-74 0z" />
          <path className="headset-light" d="M139 119h49" />
          <path className="torso-line" d="m133 177 35 41 31-40M168 218l5 79" />
          <g className="body-tracking">
            <circle cx="128" cy="199" r="5" /><circle cx="72" cy="243" r="5" />
            <circle cx="29" cy="223" r="5" /><circle cx="202" cy="201" r="5" />
            <circle cx="255" cy="217" r="5" /><circle cx="299" cy="184" r="5" />
            <circle cx="122" cy="279" r="5" /><circle cx="82" cy="385" r="5" />
            <circle cx="190" cy="297" r="5" /><circle cx="229" cy="408" r="5" />
          </g>
          <path className="ground-trace" d="M19 526h274" />
        </g>
      </svg>

      <svg className="training-figure figure-lunge" viewBox="0 0 340 620">
        <defs>
          <linearGradient id="athlete-fill-right" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1E88E5" stopOpacity=".28" />
            <stop offset="1" stopColor="#0B1F33" stopOpacity=".08" />
          </linearGradient>
        </defs>
        <g className="figure-motion">
          <path className="body-plane" d="M138 158c22-15 59-12 75 11l35 102-56 45-72-23 3-95z" />
          <path className="limb limb-back" d="m132 194-58 56-35 72M119 284 70 383 24 440" />
          <path className="limb" d="m207 190 46 50 39 63M194 303l61 55 54 96" />
          <path className="limb-detail" d="m74 250 29 13m152 95-18 27" />
          <circle className="head" cx="165" cy="111" r="39" />
          <path className="headset" d="M126 99c24-11 57-10 79 3l-4 30c-24 8-51 7-73-2z" />
          <path className="headset-light" d="m139 114 49 2" />
          <path className="torso-line" d="m137 172 37 42 30-43M174 214l10 84" />
          <g className="body-tracking">
            <circle cx="132" cy="194" r="5" /><circle cx="74" cy="250" r="5" />
            <circle cx="39" cy="322" r="5" /><circle cx="207" cy="190" r="5" />
            <circle cx="253" cy="240" r="5" /><circle cx="292" cy="303" r="5" />
            <circle cx="119" cy="284" r="5" /><circle cx="70" cy="383" r="5" />
            <circle cx="194" cy="303" r="5" /><circle cx="255" cy="358" r="5" />
          </g>
          <path className="ground-trace" d="M17 474h306" />
        </g>
      </svg>
    </div>
  )
}

function TrackingField() {
  return (
    <div className="tracking-field" aria-hidden="true">
      <div className="orb orb-left" />
      <div className="orb orb-right" />
      <div className="grid-plane" />
      <TrainingFigures />

      <svg className="signal-map" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="signal" x1="0" x2="1">
            <stop offset="0" stopColor="#0F4C81" stopOpacity="0" />
            <stop offset=".52" stopColor="#4FC3F7" stopOpacity=".62" />
            <stop offset="1" stopColor="#1E88E5" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="signal-line signal-a" d="M-30 612 C240 450 330 716 587 535 S1030 310 1480 464" />
        <path className="signal-line signal-b" d="M80 180 C330 300 455 130 690 292 S1110 690 1400 570" />
        <path className="signal-line signal-c" d="M260 950 C410 690 725 780 825 532 S965 190 1190 -20" />
      </svg>

      {nodes.map((node, index) => (
        <span
          className="tracking-node"
          key={index}
          style={{ left: node.x, top: node.y, animationDelay: node.delay }}
        />
      ))}

      <div className="reticle reticle-one"><span /></div>
      <div className="reticle reticle-two"><span /></div>
    </div>
  )
}

function LandingPage() {
  const [activePoster, setActivePoster] = useState<(typeof posters)[number] | null>(null)
  const [posterZoom, setPosterZoom] = useState(100)
  const closePosterButtonRef = useRef<HTMLButtonElement>(null)

  const scrollToProject = () => {
    document.getElementById('proyecto')?.scrollIntoView({ behavior: 'smooth' })
  }

  const closePoster = () => {
    setActivePoster(null)
    setPosterZoom(100)
  }

  const closePosterFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closePoster()
  }

  useEffect(() => {
    if (!activePoster) return

    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closePosterButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePoster()
      if (event.key !== 'Tab') return

      const controls = Array.from(
        document.querySelectorAll<HTMLElement>('.poster-viewer button:not(:disabled)'),
      )
      const firstControl = controls[0]
      const lastControl = controls.at(-1)

      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault()
        lastControl?.focus()
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault()
        firstControl?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [activePoster])

  return (
    <main className="landing-page">
      <section className="hero" aria-labelledby="hero-title">
        <TrackingField />

        <header className="topbar">
          <BrandMark />
          <div className="topbar-meta">
            <div className="ispc-identity">
              <img
                src="/ispc-logo.png"
                alt="Logo oficial del ISPC"
              />
              <span><b>ISPC</b> Instituto Superior Politécnico Córdoba</span>
            </div>
            <div className="system-state">
              <span className="state-dot" />
              SISTEMA ONLINE
            </div>
          </div>
        </header>

        <div className="hero-content">
          <div className="eyebrow"><span>01</span> ENTORNO DE ENTRENAMIENTO INMERSIVO</div>
          <h1 id="hero-title">
            <span>GYM MASTER</span>
            <strong>VR</strong>
          </h1>
          <p className="subtitle">Sistema de realidad virtual para entrenamiento</p>
          <p className="institution">Arquitectura de Computadoras <i /> Prof. Daniel Meloni <i /> ISPC <i /> 2026</p>

          <div className="hero-actions">
            <button className="explore-button" type="button" onClick={scrollToProject}>
              <span>Explorar proyecto</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="data-tag data-tag-left" aria-hidden="true">
          <span>TRACKING</span><b>6-DOF</b>
        </div>
        <div className="data-tag data-tag-right" aria-hidden="true">
          <span>LATENCIA</span><b>&lt; 20 MS</b>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>SCROLL</span><i />
        </div>
      </section>

      <section id="proyecto" className="project-intro landing-section" aria-labelledby="project-title">
        <div className="section-index">01 / PROYECTO</div>
        <div className="project-intro-copy">
          <p className="section-kicker">Arquitectura de Computadoras · ISPC 2026</p>
          <h2 id="project-title">Un sistema inmersivo,<br />estudiado desde su arquitectura.</h2>
          <p>
            Gym Master VR articula requisitos, representación de datos, lógica digital,
            procesamiento, memoria, entrada y salida e integración para explicar cómo
            funciona una experiencia de entrenamiento en realidad virtual.
          </p>
        </div>
        <dl className="project-facts" aria-label="Datos principales del proyecto">
          <div><dt>06</dt><dd>Aportes técnicos</dd></div>
          <div><dt>90 Hz</dt><dd>Actualización objetivo</dd></div>
          <div><dt>&lt; 20 ms</dt><dd>Latencia objetivo</dd></div>
        </dl>
      </section>

      <section className="project-journey landing-section" aria-labelledby="journey-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Recorrido del proyecto</p>
            <h2 id="journey-title">6 aportes · una arquitectura</h2>
          </div>
          <p>Del dato capturado al rendimiento integral del sistema.</p>
        </div>

        <div className="journey-sequence" aria-hidden="true">
          <span>REQUISITOS</span><i /><span>LÓGICA</span><i /><span>PROCESAMIENTO</span><i />
          <span>MEMORIA</span><i /><span>E/S</span><i /><span>INTEGRACIÓN</span>
        </div>

        <div className="journey-grid">
          {members.map((member, index) => (
            <a
              className="journey-card"
              href={member.path}
              key={member.id}
              style={{
                '--card-accent': member.accent,
                '--card-accent-rgb': member.accentRgb,
              } as CSSProperties}
              aria-label={`${String(index + 1).padStart(2, '0')}. ${member.area}. ${member.name}`}
            >
              <span className="journey-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="journey-card-content">
                <span className="journey-area">
                  {member.id === 'emmanuel' ? 'Lógica digital y simulación' : member.area}
                </span>
                <strong>{member.name}</strong>
                <span className="journey-divider" aria-hidden="true" />
                <span className="journey-action">Explorar <b aria-hidden="true">→</b></span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="poster-section landing-section" aria-labelledby="posters-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Material de presentación</p>
            <h2 id="posters-title">Pósters del proyecto</h2>
          </div>
          <p>Soportes visuales preparados para la presentación académica.</p>
        </div>
        <div className="poster-grid">
          {posters.map((poster) => (
            <button className="poster-card" type="button" key={poster.number} onClick={() => setActivePoster(poster)}>
              <span className="poster-image-preview">
                <img src={poster.image} alt={`Vista previa de ${poster.title.toLowerCase()} de Gym Master VR`} />
                <span className="poster-card-overlay">Ver póster <b aria-hidden="true">↗</b></span>
              </span>
              <span className="poster-card-copy">
                <span>{poster.number}</span>
                <strong>{poster.title}</strong>
                <small>{poster.subtitle}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      {activePoster && (
        <div
          className="poster-viewer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="poster-viewer-title"
        >
          <div className="poster-viewer-toolbar">
            <strong id="poster-viewer-title">{activePoster.title}</strong>
            <div className="poster-viewer-controls" aria-label="Controles de zoom">
              <button
                type="button"
                aria-label="Reducir zoom"
                disabled={posterZoom === 75}
                onClick={() => setPosterZoom((zoom) => Math.max(75, zoom - 25))}
              >−</button>
              <button type="button" aria-label="Restablecer zoom al 100 por ciento" onClick={() => setPosterZoom(100)}>
                {posterZoom}%
              </button>
              <button
                type="button"
                aria-label="Aumentar zoom"
                disabled={posterZoom === 200}
                onClick={() => setPosterZoom((zoom) => Math.min(200, zoom + 25))}
              >+</button>
              <button ref={closePosterButtonRef} type="button" aria-label="Cerrar visor del póster" onClick={closePoster}>✕</button>
            </div>
          </div>
          <div className="poster-viewer-scroll" onClick={closePosterFromBackdrop}>
            <div className="poster-viewer-stage" style={{ '--poster-zoom': `${posterZoom}%` } as CSSProperties}>
              <img src={activePoster.image} alt={`${activePoster.title} de Gym Master VR`} />
            </div>
          </div>
        </div>
      )}

      <footer className="landing-footer">
        <BrandMark />
        <p>Arquitectura de Computadoras · ISPC · 2026</p>
        <a href="#proyecto">Volver al recorrido ↑</a>
      </footer>
    </main>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '')

  if (path === '/fiorella') return <FiorellaPage />
  if (path === '/emmanuel') return <EmmanuelPage />
  if (path === '/emilio') return <EmilioPage />
  if (path === '/josefina') return <JosefinaPage />
  if (path === '/nahuel') return <NahuelPage />
  if (path === '/federico') return <FedericoPage />
  return <LandingPage />
}

export default App
