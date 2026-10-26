import BrandMark from './components/BrandMark'
import EmmanuelPage from './pages/EmmanuelPage'
import EmilioPage from './pages/EmilioPage'
import FiorellaPage from './pages/FiorellaPage'
import JosefinaPage from './pages/JosefinaPage'

const nodes = [
  { x: '7%', y: '24%', delay: '0s' },
  { x: '19%', y: '68%', delay: '-1.6s' },
  { x: '35%', y: '14%', delay: '-3.1s' },
  { x: '58%', y: '77%', delay: '-2.3s' },
  { x: '74%', y: '18%', delay: '-4.2s' },
  { x: '89%', y: '57%', delay: '-.8s' },
]

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
  const scrollToProject = () => {
    document.getElementById('proyecto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <TrackingField />

        <header className="topbar">
          <BrandMark />
          <div className="system-state">
            <span className="state-dot" />
            SISTEMA ONLINE
          </div>
        </header>

        <div className="hero-content">
          <div className="eyebrow"><span>01</span> ENTORNO DE ENTRENAMIENTO INMERSIVO</div>
          <h1 id="hero-title">
            <span>GYM MASTER</span>
            <strong>VR</strong>
          </h1>
          <p className="subtitle">Sistema de realidad virtual para entrenamiento</p>
          <p className="institution">Arquitectura de Computadoras <i /> ISPC <i /> 2026</p>

          <div className="hero-actions">
            <button className="explore-button" type="button" onClick={scrollToProject}>
              <span>Explorar proyecto</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <div className="member-links">
              <a className="member-entry" href="/fiorella">
                <span>Definición del sistema, requisitos y datos</span>
                Fiorella Easdale Castillo
              </a>
              <a className="member-entry" href="/emmanuel">
                <span>Lógica digital</span>
                Emmanuel Gillio
              </a>
              <a className="member-entry" href="/emilio">
                <span>CPU, GPU y ciclo de instrucción</span>
                Emilio Santiago Guzmán
              </a>
              <a className="member-entry" href="/josefina">
                <span>Memoria y almacenamiento</span>
                Josefina Madai Alcaraz
              </a>
            </div>
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
      <div id="proyecto" className="project-anchor" aria-hidden="true" />
    </main>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '')

  if (path === '/fiorella') return <FiorellaPage />
  if (path === '/emmanuel') return <EmmanuelPage />
  if (path === '/emilio') return <EmilioPage />
  if (path === '/josefina') return <JosefinaPage />
  return <LandingPage />
}

export default App
