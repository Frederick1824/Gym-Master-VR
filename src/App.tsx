const nodes = [
  { x: '7%', y: '24%', delay: '0s' },
  { x: '19%', y: '68%', delay: '-1.6s' },
  { x: '35%', y: '14%', delay: '-3.1s' },
  { x: '58%', y: '77%', delay: '-2.3s' },
  { x: '74%', y: '18%', delay: '-4.2s' },
  { x: '89%', y: '57%', delay: '-.8s' },
]

function TrackingField() {
  return (
    <div className="tracking-field" aria-hidden="true">
      <div className="orb orb-left" />
      <div className="orb orb-right" />
      <div className="grid-plane" />

      <svg className="signal-map" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="signal" x1="0" x2="1">
            <stop offset="0" stopColor="#9dff4f" stopOpacity="0" />
            <stop offset=".52" stopColor="#9dff4f" stopOpacity=".65" />
            <stop offset="1" stopColor="#46f2c2" stopOpacity="0" />
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

function BrandMark() {
  return (
    <div className="brand-mark" aria-label="Gym Master VR">
      <svg viewBox="0 0 38 38" aria-hidden="true">
        <path d="M6 9.5 19 3l13 6.5v19L19 35 6 28.5z" />
        <path d="M12 14v10l7 3.5 7-3.5v-5h-7" />
      </svg>
      <span>GM<span>VR</span></span>
    </div>
  )
}

function App() {
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

          <button className="explore-button" type="button" onClick={scrollToProject}>
            <span>Explorar proyecto</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
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

export default App
