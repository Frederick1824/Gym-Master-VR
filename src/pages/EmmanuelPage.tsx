import { useState } from 'react'
import BrandMark from '../components/BrandMark'
import '../emmanuel.css'

type Inputs = { T: boolean; Z: boolean; B: boolean; E: boolean }
type SignalKey = keyof Inputs

const inputInfo: Array<{ key: SignalKey; title: string; description: string }> = [
  { key: 'T', title: 'Tracking', description: 'Seguimiento correcto del visor y los controladores.' },
  { key: 'Z', title: 'Zona segura', description: 'El usuario permanece dentro del área habilitada.' },
  { key: 'B', title: 'Batería', description: 'Los controladores disponen de energía.' },
  { key: 'E', title: 'Pausa', description: 'Estado del botón de pausa del sistema.' },
]

const truthRows = Array.from({ length: 16 }, (_, value) => {
  const bits = value.toString(2).padStart(4, '0').split('').map(Number)
  const [T, Z, B, E] = bits
  return { value, T, Z, B, E, run: T === 1 && Z === 1 && B === 1 && E === 0 }
})

const contributionGroups = [
  { title: 'Tareas realizadas', items: ['Definición de la función lógica', 'Tabla de verdad', 'Expresión booleana', 'Circuito digital', 'Simulación en CircuitVerse'] },
  { title: 'Decisiones', items: ['Run activo solo para 1110', 'Uso de compuertas NOT y AND', 'Run = T · Z · B · ¬E', 'Minitérmino Σm(14)'] },
  { title: 'Dificultades', items: ['Traducir situaciones reales a variables binarias', 'Verificar tabla, expresión y circuito', 'Comprobar combinaciones mediante simulación'] },
  { title: 'Aprendizajes', items: ['Tablas de verdad y expresiones booleanas', 'Compuertas y simulación digital', 'Lógica aplicada a decisiones de seguridad'] },
]

function LogicSwitch({ signal, checked, onToggle }: { signal: SignalKey; checked: boolean; onToggle: () => void }) {
  const info = inputInfo.find((item) => item.key === signal)!
  return (
    <button className={`emm-switch ${checked ? 'is-on' : ''}`} type="button" role="switch" aria-checked={checked} onClick={onToggle}>
      <span className="emm-switch-key">{signal}</span>
      <span className="emm-switch-copy"><strong>{info.title}</strong><small>{checked ? 'Señal activa · 1' : 'Señal inactiva · 0'}</small></span>
      <i aria-hidden="true"><b /></i>
    </button>
  )
}

function LogicCircuit({ inputs, run }: { inputs: Inputs; run: boolean }) {
  const notE = !inputs.E
  const signalClass = (active: boolean) => active ? 'signal-on' : 'signal-off'

  return (
    <div className={`logic-circuit ${run ? 'is-running' : 'is-paused'}`} aria-label={`Circuito lógico. Salida Run ${Number(run)}`}>
      <svg viewBox="0 0 900 420" role="img" aria-hidden="true">
        <g className={`circuit-signal ${signalClass(inputs.T)}`}><path d="M92 70H590" /><circle cx="92" cy="70" r="8" /><text x="55" y="77">T</text><text x="112" y="58">{Number(inputs.T)}</text></g>
        <g className={`circuit-signal ${signalClass(inputs.Z)}`}><path d="M92 150H590" /><circle cx="92" cy="150" r="8" /><text x="55" y="157">Z</text><text x="112" y="138">{Number(inputs.Z)}</text></g>
        <g className={`circuit-signal ${signalClass(inputs.B)}`}><path d="M92 230H590" /><circle cx="92" cy="230" r="8" /><text x="55" y="237">B</text><text x="112" y="218">{Number(inputs.B)}</text></g>
        <g className={`circuit-signal ${signalClass(inputs.E)}`}><path d="M92 350H290" /><circle cx="92" cy="350" r="8" /><text x="55" y="357">E</text><text x="112" y="338">{Number(inputs.E)}</text></g>
        <g className="not-gate"><path d="M290 318 290 382 352 350z" /><circle cx="365" cy="350" r="12" /><text x="304" y="355">NOT</text></g>
        <g className={`circuit-signal ${signalClass(notE)}`}><path d="M377 350H510V290H590" /><text x="405" y="338">¬E = {Number(notE)}</text></g>
        <g className="and-gate"><path d="M590 38h76c72 0 130 58 130 130v84c0 72-58 130-130 130h-76z" /><text x="655" y="220">AND</text></g>
        <g className={`circuit-signal circuit-output ${signalClass(run)}`}><path d="M796 210H870" /><circle cx="870" cy="210" r="10" /><text x="817" y="190">RUN</text><text x="848" y="245">{Number(run)}</text></g>
      </svg>
      <div className="circuit-status"><span>{run ? 'RUNNING' : 'PAUSED'}</span><strong>{run ? 'RUTINA ACTIVA' : 'RUTINA PAUSADA'}</strong></div>
    </div>
  )
}

function EmmanuelPage() {
  const [inputs, setInputs] = useState<Inputs>({ T: true, Z: true, B: true, E: false })
  const run = inputs.T && inputs.Z && inputs.B && !inputs.E
  const currentValue = Number(`${Number(inputs.T)}${Number(inputs.Z)}${Number(inputs.B)}${Number(inputs.E)}`.replace(/^/, '0b'))

  const toggle = (signal: SignalKey) => setInputs((current) => ({ ...current, [signal]: !current[signal] }))
  const setScenario = (scenario: 'battery' | 'correct') => setInputs(scenario === 'battery'
    ? { T: true, Z: true, B: false, E: false }
    : { T: true, Z: true, B: true, E: false })

  return (
    <main className="emmanuel-page">
      <header className="emm-nav">
        <a href="/" aria-label="Volver a la portada"><BrandMark /></a>
        <a className="emm-back" href="/"><span>←</span> Volver a la portada</a>
      </header>

      <section className="emm-hero emm-shell" aria-labelledby="emm-title">
        <div className="binary-field" aria-hidden="true">0101&nbsp;&nbsp;1110&nbsp;&nbsp;0011<br />1010&nbsp;&nbsp;0110&nbsp;&nbsp;1101<br />0010&nbsp;&nbsp;1111&nbsp;&nbsp;0100</div>
        <div className="emm-kicker"><span>APORTE 02</span> LÓGICA DIGITAL · SIMULACIÓN</div>
        <h1 id="emm-title">Emmanuel<br /><strong>Gillio</strong></h1>
        <div className="emm-intro-grid">
          <p>Su aporte se centra en el subsistema de control lógico: un circuito que evalúa condiciones de seguridad y funcionamiento para decidir si la rutina puede continuar o debe pausarse.</p>
          <div className={`hero-run-state ${run ? 'is-on' : ''}`}><span>RUN</span><strong>{Number(run)}</strong><small>{run ? 'SISTEMA HABILITADO' : 'SISTEMA EN PAUSA'}</small></div>
        </div>
      </section>

      <section className="emm-section emm-shell" aria-labelledby="inputs-title">
        <div className="emm-section-heading"><span>01 / ENTRADAS</span><h2 id="inputs-title">Variables del sistema</h2><p>Cuatro señales binarias condensan las condiciones reales de uso en decisiones verificables.</p></div>
        <div className="input-cards">
          {inputInfo.map((item) => <article key={item.key}><span>{item.key}</span><h3>{item.title}</h3><p>{item.description}</p><i>{inputs[item.key] ? '1' : '0'}</i></article>)}
        </div>
        <div className="output-rule"><div><span>RUN = 1</span><p>La rutina puede continuar.</p></div><i /><div><span>RUN = 0</span><p>La rutina debe pausarse.</p></div></div>
      </section>

      <section className="emm-section logic-lab" aria-labelledby="logic-simulator-title">
        <div className="emm-shell">
          <div className="emm-section-heading"><span>02 / LABORATORIO INTERACTIVO</span><h2 id="logic-simulator-title">Simulador de lógica de control</h2><p>Cambiá cualquier entrada y seguí la propagación de la señal hasta la salida.</p></div>
          <div className="logic-simulator-grid">
            <div className="switch-panel">
              {inputInfo.map((item) => <LogicSwitch key={item.key} signal={item.key} checked={inputs[item.key]} onToggle={() => toggle(item.key)} />)}
              <div className="logic-expression"><span>FUNCIÓN</span><strong>Run = T · Z · B · ¬E</strong></div>
            </div>
            <div className={`run-panel ${run ? 'is-on' : ''}`} aria-live="polite">
              <span>SALIDA DEL SISTEMA</span><strong>{Number(run)}</strong><h3>{run ? 'RUTINA ACTIVA' : 'RUTINA PAUSADA'}</h3>
              <p>{run ? 'Todas las condiciones de seguridad están cumplidas.' : 'Una o más condiciones impiden continuar la rutina.'}</p>
              <div className="run-pulse" aria-hidden="true"><i /><i /><i /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="emm-section emm-shell expression-section" aria-labelledby="expression-title">
        <div className="emm-section-heading"><span>03 / EXPRESIÓN BOOLEANA</span><h2 id="expression-title">Una sola combinación válida</h2></div>
        <div className="expression-grid">
          <article><span>FORMA FUNCIONAL</span><strong>Run = T · Z · B · ¬E</strong><p>T, Z y B deben estar activos. E debe estar desactivado; <b>¬E</b> representa su negación.</p></article>
          <article><span>FORMA CANÓNICA</span><strong>Run(T,Z,B,E) = Σm(14)</strong><p><b>1110₂ = 14₁₀</b>. El minitérmino 14 es el único que produce Run = 1.</p></article>
        </div>
      </section>

      <section className="emm-section emm-shell" aria-labelledby="truth-title">
        <div className="emm-section-heading"><span>04 / 16 COMBINACIONES</span><h2 id="truth-title">Tabla de verdad interactiva</h2><p>La fila del estado actual se resalta automáticamente. La combinación 1110 es la única salida válida.</p></div>
        <div className="truth-table-wrap">
          <table className="truth-table">
            <thead><tr><th>#</th><th>T</th><th>Z</th><th>B</th><th>E</th><th>Run</th></tr></thead>
            <tbody>{truthRows.map((row) => <tr className={`${row.value === currentValue ? 'is-current' : ''} ${row.run ? 'is-valid' : ''}`} key={row.value}><td>{row.value.toString().padStart(2, '0')}</td><td>{row.T}</td><td>{row.Z}</td><td>{row.B}</td><td>{row.E}</td><td><span>{Number(row.run)}</span></td></tr>)}</tbody>
          </table>
          <aside className="truth-summary"><span>ESTADO ACTUAL</span><strong>{Number(inputs.T)}{Number(inputs.Z)}{Number(inputs.B)}{Number(inputs.E)}₂</strong><p>Fila decimal <b>{currentValue}</b></p><i className={run ? 'is-on' : ''}>Run {Number(run)}</i></aside>
        </div>
      </section>

      <section className="emm-section circuit-section" aria-labelledby="circuit-title">
        <div className="emm-shell">
          <div className="emm-section-heading"><span>05 / CIRCUITO DIGITAL</span><h2 id="circuit-title">Propagación de señales</h2><p>Las líneas iluminadas representan señales activas; la salida responde a NOT + AND.</p></div>
          <LogicCircuit inputs={inputs} run={run} />
        </div>
      </section>

      <section className="emm-section emm-shell" aria-labelledby="tests-title">
        <div className="emm-section-heading"><span>06 / CASOS DE PRUEBA</span><h2 id="tests-title">Pruebas de simulación</h2></div>
        <div className="test-grid">
          <article><span>CASO 01 · 1100</span><h3>Controlador sin energía</h3><p>La rutina se detiene porque no existe energía disponible en el controlador.</p><strong>Run = 0</strong><button type="button" onClick={() => setScenario('battery')}>Probar fallo de batería</button></article>
          <article><span>CASO 02 · 1110</span><h3>Funcionamiento correcto</h3><p>Todas las condiciones necesarias para ejecutar la rutina están cumplidas.</p><strong>Run = 1</strong><button type="button" onClick={() => setScenario('correct')}>Probar funcionamiento correcto</button></article>
        </div>
      </section>

      <section className="emm-section emm-shell" aria-labelledby="connection-title">
        <div className="emm-section-heading"><span>07 / SISTEMA COMPLETO</span><h2 id="connection-title">Conexión con Gym Master VR</h2></div>
        <div className="emm-system-flow">{['Sensores', 'Lógica de control', 'CPU', 'Sistema VR'].map((item, index) => <div className={item === 'Lógica de control' ? 'is-highlighted' : ''} key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 3 ? <i>→</i> : null}</div>)}</div>
        <p className="emm-flow-note"><span>Decisión previa</span> Si falla el tracking, se abandona la zona segura, se agota la batería o se presiona pausa, Run pasa a 0 y el sistema detiene la rutina.</p>
      </section>

      <section className="emm-section emm-shell" aria-labelledby="contribution-title">
        <div className="emm-section-heading"><span>08 / APÉNDICE INDIVIDUAL</span><h2 id="contribution-title">Mi aporte</h2></div>
        <div className="emm-contribution-grid">{contributionGroups.map((group, index) => <article key={group.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <footer className="emm-footer emm-shell"><BrandMark /><span>Arquitectura de Computadoras · ISPC · 2026</span><a href="#emm-title">Volver arriba ↑</a></footer>
    </main>
  )
}

export default EmmanuelPage
