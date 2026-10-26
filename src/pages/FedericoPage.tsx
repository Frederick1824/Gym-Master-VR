import { useEffect, useState } from 'react'
import BrandMark from '../components/BrandMark'
import ContributionGrid from '../components/ContributionGrid'
import MemberIdentity from '../components/MemberIdentity'
import MemberNavigation from '../components/MemberNavigation'
import { memberTheme } from '../memberConfig'
import '../federico.css'

type IssueKey = 'gpu' | 'bandwidth' | 'temperature' | 'ram'

const architectureNodes = ['Sensores', 'Interfaz', 'DMA', 'RAM', 'CPU', 'GPU', 'Salida VR', 'Audio / háptica', 'Almacenamiento']

const perspectives = [
  ['Fiorella', 'Requisitos y datos'],
  ['Emmanuel', 'Lógica digital'],
  ['Emilio', 'CPU / GPU / instrucciones'],
  ['Josefina', 'Memoria y almacenamiento'],
  ['Nahuel', 'Entrada / salida / DMA'],
  ['Federico', 'Integración y rendimiento'],
]

const issueLabels: Array<{ key: IssueKey; label: string }> = [
  { key: 'gpu', label: 'Saturar GPU' },
  { key: 'bandwidth', label: 'Limitar ancho de banda' },
  { key: 'temperature', label: 'Elevar temperatura' },
  { key: 'ram', label: 'Saturar RAM' },
]

const contribution = [
  { title: 'Tareas realizadas', items: ['Integración de los subsistemas del proyecto', 'Elaboración de la arquitectura general', 'Análisis de cuellos de botella', 'Análisis energético y térmico', 'Comparación de alternativas de diseño', 'Propuesta de mejoras futuras', 'Elaboración de conclusiones generales'] },
  { title: 'Decisiones', items: ['Organización del flujo completo del sistema', 'Integración de los requisitos de 90 Hz y latencia menor a 20 ms', 'Elección de CPU + GPU dedicada', 'Consideración de interfaz gráfica de alto ancho de banda', 'Incorporación de refrigeración adecuada para carga sostenida', 'Priorización de estabilidad durante sesiones prolongadas'] },
  { title: 'Dificultades', items: ['Integrar subsistemas desarrollados de manera separada', 'Identificar cuellos de botella reales de procesamiento y transferencia', 'Relacionar rendimiento, latencia y temperatura', 'Comparar alternativas según necesidades del sistema y no solo por potencia individual'] },
  { title: 'Aprendizajes', items: ['Comprensión de la arquitectura como un sistema completo', 'Relación entre sensores, interfaces, memoria, CPU, GPU y almacenamiento', 'Impacto de los requisitos sobre las decisiones de hardware', 'Identificación y mitigación de cuellos de botella', 'Importancia del consumo energético y la refrigeración', 'Evaluación de alternativas y escalabilidad futura'] },
]

function FedericoPage() {
  const [flowStep, setFlowStep] = useState(-1)
  const [flowRunning, setFlowRunning] = useState(false)
  const [issues, setIssues] = useState<Record<IssueKey, boolean>>({ gpu: false, bandwidth: false, temperature: false, ram: false })
  const [thermalLoad, setThermalLoad] = useState(false)

  useEffect(() => {
    if (!flowRunning) return
    const timer = window.setInterval(() => {
      setFlowStep((current) => {
        if (current >= architectureNodes.length - 1) {
          setFlowRunning(false)
          return current
        }
        return current + 1
      })
    }, 600)
    return () => window.clearInterval(timer)
  }, [flowRunning])

  const activeIssues = Object.values(issues).filter(Boolean).length
  const fps = Math.max(45, 90 - (issues.gpu ? 24 : 0) - (issues.temperature ? 12 : 0) - (issues.ram ? 5 : 0))
  const latency = 18 + (issues.bandwidth ? 14 : 0) + (issues.ram ? 26 : 0) + (issues.temperature ? 5 : 0)
  const stability = activeIssues === 0 ? 'ALTA' : activeIssues < 3 ? 'MEDIA' : 'BAJA'

  const runFlow = () => {
    setFlowStep(0)
    setFlowRunning(true)
  }

  const toggleIssue = (key: IssueKey) => setIssues((current) => ({ ...current, [key]: !current[key] }))

  return (
    <main className="federico-page" style={memberTheme('federico')}>
      <header className="fed-nav"><a href="/" aria-label="Volver a la portada"><BrandMark /></a><a className="fed-back" href="/"><span>←</span> Volver a la portada</a></header>

      <section className="fed-hero fed-shell" aria-labelledby="fed-title">
        <div className="integration-core" aria-hidden="true"><i /><i /><i /><span>SYS</span></div>
        <div className="fed-kicker"><span>APORTE 06</span> INTEGRACIÓN · ESCALABILIDAD · ESTABILIDAD</div>
        <MemberIdentity memberId="federico" />
        <h1 id="fed-title">Federico<br /><strong>Montoro</strong></h1>
        <div className="fed-intro-grid"><p>Esta sección integra sensores, interfaces, DMA, RAM, CPU, GPU, almacenamiento, visor, audio y respuesta háptica para analizar el comportamiento global de Gym Master VR. Una arquitectura no funciona por la calidad de un componente aislado, sino por la coordinación entre todos sus subsistemas.</p><div className="system-status"><span>ARQUITECTURA</span><strong>SISTEMA COMPLETO</strong><small>06 BLOQUES · UNA EXPERIENCIA</small></div></div>
      </section>

      <section className="fed-section fed-shell" aria-labelledby="architecture-title">
        <div className="fed-section-heading"><span>01 / MAPA INTERACTIVO</span><h2 id="architecture-title">Arquitectura general</h2><p>El flujo enlaza captura, transferencia, procesamiento, renderizado, respuesta y persistencia.</p></div>
        <div className={`architecture-console ${flowRunning ? 'is-running' : ''}`}>
          <div className="architecture-map" aria-live="polite">{architectureNodes.map((node, index) => <div className={index <= flowStep ? 'is-active' : ''} key={node}><span>{String(index + 1).padStart(2, '0')}</span><strong>{node}</strong>{index < architectureNodes.length - 1 ? <i>→</i> : null}</div>)}<b className="architecture-packet">DATA</b></div>
          <button type="button" onClick={runFlow}>{flowRunning ? 'FLUJO EN EJECUCIÓN…' : 'EJECUTAR FLUJO COMPLETO'}</button>
          <p>{flowStep === architectureNodes.length - 1 ? 'Flujo completado: respuesta generada y resumen disponible para almacenamiento.' : 'Los bloques se activan siguiendo el recorrido de los datos.'}</p>
        </div>
      </section>

      <section className="fed-section perspectives-section" aria-labelledby="perspectives-title"><div className="fed-shell">
        <div className="fed-section-heading"><span>02 / APORTE COLECTIVO</span><h2 id="perspectives-title">Una arquitectura, seis perspectivas</h2><p>Las responsabilidades son individuales; el sistema resultante es único.</p></div>
        <div className="perspective-flow">{perspectives.map(([name, area], index) => <article className={name === 'Federico' ? 'is-current' : ''} key={name}><span>{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><small>{area}</small>{index < perspectives.length - 1 ? <i>↓</i> : null}</article>)}</div>
      </div></section>

      <section className="fed-section fed-shell" aria-labelledby="state-title">
        <div className="fed-section-heading"><span>03 / LABORATORIO INTERACTIVO</span><h2 id="state-title">Estado del sistema</h2><p>Los problemas pueden combinarse para observar su efecto acumulado sobre rendimiento, latencia y estabilidad.</p></div>
        <div className="system-lab">
          <div className="system-metrics" aria-live="polite"><article><span>FPS</span><strong>{fps}</strong><small>{issues.gpu ? 'GPU SATURADA' : 'OBJETIVO 90'}</small></article><article><span>LATENCIA</span><strong>{latency} ms</strong><small>{latency <= 20 ? 'DENTRO DEL OBJETIVO' : 'OBJETIVO SUPERADO'}</small></article><article><span>ESTABILIDAD</span><strong>{stability}</strong><small>{activeIssues === 0 ? 'SISTEMA NORMAL' : `${activeIssues} ALERTA${activeIssues > 1 ? 'S' : ''}`}</small></article></div>
          <div className="issue-controls">{issueLabels.map(({ key, label }) => <button type="button" role="switch" aria-checked={issues[key]} className={issues[key] ? 'is-active' : ''} onClick={() => toggleIssue(key)} key={key}><span>{label}</span><i /></button>)}</div>
          <div className="system-states">{issueLabels.map(({ key, label }) => <div className={issues[key] ? 'is-alert' : ''} key={key}><span>{label.replace('Saturar ', '').replace('Limitar ', '').replace('Elevar ', '')}</span><strong>{issues[key] ? (key === 'bandwidth' ? 'LIMITADO' : 'ALERTA') : 'NORMAL'}</strong></div>)}</div>
          <button className="reset-system" type="button" onClick={() => setIssues({ gpu: false, bandwidth: false, temperature: false, ram: false })}>RESTABLECER SISTEMA</button>
        </div>
      </section>

      <section className="fed-section bottlenecks-section" aria-labelledby="gpu-title"><div className="fed-shell">
        <div className="fed-section-heading"><span>04 / CUELLO DE BOTELLA 01</span><h2 id="gpu-title">Renderizado GPU</h2><p>La resolución combinada de 4320 × 2160 a 90 Hz deja aproximadamente 11,1 ms disponibles por frame.</p></div>
        <div className="bottleneck-pair"><article><span>GPU NORMAL</span><strong>90 FPS</strong><small>≈ 11,1 ms / frame</small><p>Flujo estable, baja latencia y continuidad visual.</p></article><article className="is-risk"><span>GPU SATURADA</span><strong>↓ FPS</strong><small>↑ TIEMPO DE FRAME</small><ul><li>Aumento de latencia</li><li>Pérdida de fluidez e inmersión</li></ul></article></div>
        <div className="mitigation-list"><span>MITIGACIONES</span>{['GPU dedicada adecuada', 'Modelos y texturas optimizados', 'Calidad gráfica dinámica', 'Resolución adaptable cuando resulte necesario'].map((item) => <b key={item}>{item}</b>)}</div>
      </div></section>

      <section className="fed-section fed-shell" aria-labelledby="video-title">
        <div className="fed-section-heading"><span>05 / CUELLO DE BOTELLA 02</span><h2 id="video-title">Transferencia de video</h2><p>El cálculo de referencia —aproximadamente 2,52 GB/s o 20,15 Gbps— se utiliza aquí para evaluar el enlace gráfico.</p></div>
        <div className="bandwidth-comparison"><article><span>INTERFAZ ADECUADA</span><strong>2,52 GB/s</strong><div><i /></div><p>Entrega continua con ancho de banda suficiente.</p></article><article className="is-limited"><span>INTERFAZ LIMITADA</span><strong>COLA DE FRAMES</strong><div>{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div><p>Acumulación, retraso, mayor latencia y posible degradación de calidad.</p></article></div>
        <p className="fed-note"><b>Mitigación:</b> DisplayPort, USB-C Alt Mode o una interfaz equivalente; compresión eficiente únicamente cuando no comprometa el objetivo de latencia.</p>
      </section>

      <section className="fed-section energy-section" aria-labelledby="energy-title"><div className="fed-shell">
        <div className="fed-section-heading"><span>06 / ENERGÍA</span><h2 id="energy-title">Consumo relativo</h2><p>La carga sostenida durante sesiones de hasta 60 minutos convierte energía y temperatura en variables de diseño.</p></div>
        <div className="energy-grid">{[['GPU','Alto',92],['CPU','Medio / alto',72],['RAM','Moderado',46],['SSD','Bajo / moderado',30],['Visor','Moderado',52],['Refrigeración','Dependiente de carga',64]].map(([name, level, amount]) => <article key={name}><span>{name}</span><strong>{level}</strong><i><b style={{ width: `${amount}%` }} /></i></article>)}</div>
      </div></section>

      <section className="fed-section fed-shell" aria-labelledby="thermal-title">
        <div className="fed-section-heading"><span>07 / ESTABILIDAD</span><h2 id="thermal-title">Estabilidad térmica</h2><p>La refrigeración debe sostener la frecuencia de trabajo durante el requisito R5: sesiones de hasta 60 minutos.</p></div>
        <div className={`thermal-console ${thermalLoad ? 'is-hot' : ''}`}><div className="thermal-state" aria-live="polite"><span>TEMPERATURA</span><strong>{thermalLoad ? 'CARGA ELEVADA' : 'ESTABLE'}</strong><small>{thermalLoad ? 'RIESGO DE THERMAL THROTTLING' : 'FRECUENCIA SOSTENIDA'}</small></div><div className="thermal-flow">{['CPU / GPU', 'Temperatura', 'Frecuencia', 'Rendimiento', 'Latencia'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 ? <i>→</i> : null}</div>)}</div><button type="button" onClick={() => setThermalLoad((active) => !active)}>{thermalLoad ? 'RESTABLECER TEMPERATURA' : 'SIMULAR CARGA TÉRMICA'}</button></div>
        <div className="thermal-solutions"><span>SOLUCIÓN</span><b>Flujo de aire adecuado</b><b>Refrigeración suficiente para CPU/GPU</b><b>Evitar thermal throttling</b><b>Refrigeración líquida solo para configuraciones de mayor exigencia</b></div>
      </section>

      <section className="fed-section decision-section" aria-labelledby="decision-title"><div className="fed-shell">
        <div className="fed-section-heading"><span>08 / ALTERNATIVAS</span><h2 id="decision-title">Decisión de arquitectura</h2></div>
        <div className="option-comparison"><article><span>OPCIÓN A</span><h3>CPU sin GPU dedicada</h3><div><b>Ventajas</b><p>Menor complejidad, consumo potencial y costo.</p></div><div><b>Desventajas</b><p>Capacidad gráfica insuficiente y dificultad para sostener resolución, frecuencia y baja latencia.</p></div></article><article className="is-selected"><span>OPCIÓN B · DECISIÓN</span><h3>CPU + GPU dedicada</h3><div><b>Ventajas</b><p>Procesamiento separado, renderizado paralelo, 90 Hz y mejor escalabilidad.</p></div><div><b>Desventajas</b><p>Mayor consumo, calor y complejidad térmica.</p></div></article></div>
        <p className="fed-note"><b>Justificación:</b> Gym Master VR requiere procesamiento gráfico intensivo en tiempo real mientras sostiene tracking, lógica, simulación y renderizado.</p>
      </div></section>

      <section className="fed-section fed-shell" aria-labelledby="future-title">
        <div className="fed-section-heading"><span>09 / ESCALABILIDAD</span><h2 id="future-title">Mejoras futuras</h2><p>Estas capacidades representan ampliaciones posibles y no funciones implementadas actualmente.</p></div>
        <div className="future-grid"><article><span>MEJORA 01</span><h3>Full body tracking</h3><p>Sensores adicionales para representar postura y movimiento con mayor precisión.</p><ul><li>Más dispositivos</li><li>Mayor volumen de tracking</li><li>Mayor procesamiento</li></ul></article><article><span>MEJORA 02</span><h3>Análisis mediante IA</h3><p>Modelos para evaluar técnica, detectar postura incorrecta y adaptar rutinas y dificultad.</p><ul><li>Evaluación personalizada</li><li>Corrección de postura</li><li>Rutinas adaptativas</li></ul></article></div>
      </section>

      <section className="fed-section conclusion-section" aria-labelledby="conclusion-title"><div className="fed-shell">
        <div className="fed-section-heading"><span>10 / CONCLUSIONES</span><h2 id="conclusion-title">El sistema como unidad</h2><p>Requisitos, procesamiento, memoria, interfaces, energía y temperatura determinan en conjunto la experiencia.</p></div>
        <div className="conclusion-flow">{['Movimiento', 'Datos', 'Procesamiento', 'Respuesta', 'Experiencia VR'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 ? <i>↓</i> : null}</div>)}</div>
      </div></section>

      <section className="fed-section fed-shell" aria-labelledby="contribution-title"><div className="fed-section-heading"><span>11 / APÉNDICE INDIVIDUAL</span><h2 id="contribution-title">Mi aporte</h2></div><ContributionGrid groups={contribution} /></section>

      <MemberNavigation currentId="federico" />
      <footer className="fed-footer fed-shell"><BrandMark /><span>Arquitectura de Computadoras · ISPC · 2026</span><a href="#fed-title">Volver arriba ↑</a></footer>
    </main>
  )
}

export default FedericoPage
