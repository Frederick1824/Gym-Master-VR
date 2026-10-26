import { useState, type CSSProperties } from 'react'
import BrandMark from '../components/BrandMark'
import ContributionGrid from '../components/ContributionGrid'
import MemberIdentity from '../components/MemberIdentity'
import MemberNavigation from '../components/MemberNavigation'
import { memberTheme } from '../memberConfig'
import '../josefina.css'

type MemoryKey = 'registers' | 'cache' | 'ram' | 'ssd'

const memoryLevels: Array<{ id: MemoryKey; code: string; name: string; speed: string; latency: string; capacity: string; volatile: string; use: string; description: string; score: number }> = [
  { id: 'registers', code: 'L0', name: 'Registros', speed: 'Máxima', latency: 'Mínima', capacity: 'Muy baja', volatile: 'Sí', use: 'Posición inmediata durante el procesamiento.', description: 'Operandos, direcciones y resultados de uso inmediato, ubicados dentro de la CPU.', score: 100 },
  { id: 'cache', code: 'L1—L3', name: 'Caché', speed: 'Muy alta', latency: 'Muy baja', capacity: 'Baja', volatile: 'Sí', use: 'Datos frecuentes de tracking e instrucciones.', description: 'Reduce accesos a RAM y ayuda a sostener el procesamiento en tiempo real.', score: 78 },
  { id: 'ram', code: 'MEM', name: 'RAM', speed: 'Alta', latency: 'Baja', capacity: '16 GB', volatile: 'Sí', use: 'Buffers, estados y datos temporales.', description: 'Espacio de trabajo principal del sistema mientras se ejecuta la experiencia.', score: 48 },
  { id: 'ssd', code: 'NVMe', name: 'SSD NVMe', speed: 'Media', latency: 'Mayor', capacity: 'Alta', volatile: 'No', use: 'Historial y resumen de sesiones.', description: 'Almacenamiento persistente para perfiles, configuraciones y registros.', score: 20 },
]

const contribution = [
  { title: 'Tareas realizadas', items: ['Diseño de la jerarquía de memoria', 'Justificación de registros, caché, RAM y almacenamiento', 'Análisis de capacidad, velocidad, latencia, volatilidad y tecnología', 'Explicación del escenario de RAM insuficiente', 'Cálculo del almacenamiento por sesión'] },
  { title: 'Decisiones', items: ['Elección de SSD NVMe en lugar de HDD', 'Definición de 16 GB de RAM', 'Comparación entre telemetría cruda y resumen', 'Elección del resumen de sesión'] },
  { title: 'Dificultades', items: ['Decidir entre telemetría cruda o resumen', 'Comparar precisión y consumo de espacio', 'Evaluar la alternativa más conveniente'] },
  { title: 'Aprendizajes', items: ['Comprensión de la jerarquía de memoria', 'Función de registros y caché', 'Impacto del swap', 'Relación entre requisitos y decisiones de diseño'] },
]

function JosefinaPage() {
  const [selected, setSelected] = useState<MemoryKey>('registers')
  const [swapActive, setSwapActive] = useState(false)
  const current = memoryLevels.find((level) => level.id === selected)!

  return (
    <main className="josefina-page" style={memberTheme('josefina')}>
      <header className="jos-nav"><a href="/" aria-label="Volver a la portada"><BrandMark /></a><a className="jos-back" href="/"><span>←</span> Volver a la portada</a></header>

      <section className="jos-hero jos-shell" aria-labelledby="jos-title">
        <div className="memory-rings" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="jos-kicker"><span>APORTE 04</span> JERARQUÍA · CAPACIDAD · LATENCIA</div>
        <MemberIdentity memberId="josefina" />
        <h1 id="jos-title">Josefina<br /><strong>Madai Alcaraz</strong></h1>
        <div className="jos-intro-grid"><p>Esta sección aborda registros, caché L1/L2/L3, RAM, almacenamiento secundario, latencia, capacidad, volatilidad y rendimiento para sostener Gym Master VR durante sesiones prolongadas.</p><div className="memory-status"><span>MEMORIA PROPUESTA</span><strong>16 GB</strong><small>RAM · ESPACIO DE TRABAJO</small></div></div>
      </section>

      <section className="jos-section jos-shell" aria-labelledby="hierarchy-title">
        <div className="jos-section-heading"><span>01 / NIVELES</span><h2 id="hierarchy-title">Jerarquía de memoria</h2><p>Al descender aumenta la capacidad, mientras la velocidad relativa disminuye y la persistencia cobra importancia.</p></div>
        <div className="memory-hierarchy">{memoryLevels.map((level, index) => <article style={{ '--level-width': `${58 + index * 14}%` } as CSSProperties} key={level.id}><span>{level.code}</span><div><h3>{level.name}</h3><p>{level.description}</p></div><dl><div><dt>Velocidad</dt><dd>{level.speed}</dd></div><div><dt>Latencia</dt><dd>{level.latency}</dd></div><div><dt>Capacidad</dt><dd>{level.capacity}</dd></div><div><dt>Volátil</dt><dd>{level.volatile}</dd></div></dl><i>{index < memoryLevels.length - 1 ? '↓' : '◆'}</i></article>)}</div>
      </section>

      <section className="jos-section memory-lab" aria-labelledby="simulator-title">
        <div className="jos-shell">
          <div className="jos-section-heading"><span>02 / LABORATORIO INTERACTIVO</span><h2 id="simulator-title">Simulador de acceso a memoria</h2><p>La selección de un nivel permite comparar velocidad, latencia, capacidad y persistencia.</p></div>
          <div className="memory-simulator">
            <div className="memory-selector" role="tablist" aria-label="Nivel de memoria">{memoryLevels.map((level) => <button className={selected === level.id ? 'is-active' : ''} type="button" role="tab" aria-selected={selected === level.id} onClick={() => setSelected(level.id)} key={level.id}><span>{level.code}</span><strong>{level.name}</strong></button>)}</div>
            <div className="memory-result" aria-live="polite"><div className="access-animation"><i style={{ animationDuration: `${2.8 - current.score / 50}s` }} /><span>{current.code}</span></div><div className="memory-result-copy"><span>NIVEL SELECCIONADO</span><h3>{current.name}</h3><p>{current.use}</p><dl><div><dt>Velocidad relativa</dt><dd>{current.speed}</dd></div><div><dt>Latencia relativa</dt><dd>{current.latency}</dd></div><div><dt>Capacidad</dt><dd>{current.capacity}</dd></div><div><dt>Volátil</dt><dd>{current.volatile}</dd></div></dl></div></div>
          </div>
        </div>
      </section>

      <section className="jos-section jos-shell" aria-labelledby="swap-title">
        <div className="jos-section-heading"><span>03 / ESCENARIO CRÍTICO</span><h2 id="swap-title">¿Qué ocurre si la RAM no alcanza?</h2><p>El uso de almacenamiento como memoria virtual introduce una penalización especialmente sensible en realidad virtual.</p></div>
        <div className={`swap-console ${swapActive ? 'is-active' : ''}`}>
          <div className="ram-gauge"><span>USO DE RAM</span><strong>{swapActive ? '100%' : '68%'}</strong><i><b /></i><small>{swapActive ? 'SATURADA · SWAP ACTIVO' : 'OPERACIÓN ESTABLE'}</small></div>
          <div className="swap-flow">{['RAM saturada', 'Datos a SSD', 'Mayor latencia', 'Caída de frames', 'Riesgo de mareo'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 ? <i>→</i> : null}</div>)}</div>
          <button type="button" onClick={() => setSwapActive((active) => !active)}>{swapActive ? 'RESTABLECER MEMORIA' : 'SIMULAR RAM INSUFICIENTE'}</button>
        </div>
      </section>

      <section className="jos-section storage-section" aria-labelledby="storage-title">
        <div className="jos-shell">
          <div className="jos-section-heading"><span>04 / CAPACIDAD</span><h2 id="storage-title">Cálculo de almacenamiento</h2><p>La comparación considera sesiones almacenadas dentro de una reserva total de 20 GB.</p></div>
          <div className="storage-comparison">
            <article className="raw-option"><span>OPCIÓN A</span><h3>Telemetría cruda</h3><strong>453 <small>MB / sesión</small></strong><div className="capacity-bar"><i /></div><p><b>≈ 44 sesiones</b> dentro de 20 GB</p></article>
            <div className="storage-decision"><span>DECISIÓN</span><strong>100×</strong><p>más sesiones estimadas</p></div>
            <article className="summary-option"><span>OPCIÓN B · ADOPTADA</span><h3>Resumen de sesión</h3><strong>4,5 <small>MB / sesión</small></strong><div className="capacity-bar"><i /></div><p><b>≈ 4.400 sesiones</b> dentro de 20 GB</p></article>
          </div>
          <p className="storage-note">Se conserva un resumen de sesión porque satisface el requisito R6 con un uso de espacio mucho más eficiente que la telemetría cruda.</p>
        </div>
      </section>

      <section className="jos-section jos-shell" aria-labelledby="decision-title">
        <div className="jos-section-heading"><span>05 / ARQUITECTURA</span><h2 id="decision-title">Decisión de diseño</h2></div>
        <div className="design-decision"><p>La combinación de <strong>16 GB de RAM</strong>, un <strong>SSD NVMe</strong> y el almacenamiento de <strong>resúmenes de sesión</strong> equilibra capacidad, latencia y persistencia para sostener el rendimiento y cumplir R6.</p><div><span>SSD NVMe sobre HDD</span><span>RAM con margen</span><span>Resumen eficiente</span></div></div>
      </section>

      <section className="jos-section jos-shell" aria-labelledby="connection-title">
        <div className="jos-section-heading"><span>06 / SISTEMA COMPLETO</span><h2 id="connection-title">Relación con Gym Master VR</h2></div>
        <div className="jos-system-flow">{['Sensores', 'CPU / GPU', 'Memoria', 'Salida VR', 'Historial'].map((item, index) => <div className={item === 'Memoria' || item === 'Historial' ? 'is-highlighted' : ''} key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 ? <i>→</i> : null}</div>)}</div>
        <p className="jos-closing">La jerarquía de memoria permite que Gym Master VR procese datos en tiempo real sin perder continuidad ni estabilidad.</p>
      </section>

      <section className="jos-section jos-shell" aria-labelledby="contribution-title">
        <div className="jos-section-heading"><span>07 / APÉNDICE INDIVIDUAL</span><h2 id="contribution-title">Mi aporte</h2></div>
        <ContributionGrid groups={contribution} />
      </section>

      <MemberNavigation currentId="josefina" />
      <footer className="jos-footer jos-shell"><BrandMark /><span>Arquitectura de Computadoras · ISPC · 2026</span><a href="#jos-title">Volver arriba ↑</a></footer>
    </main>
  )
}

export default JosefinaPage
