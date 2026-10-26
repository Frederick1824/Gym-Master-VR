import { useEffect, useState } from 'react'
import BrandMark from '../components/BrandMark'
import ContributionGrid from '../components/ContributionGrid'
import MemberIdentity from '../components/MemberIdentity'
import MemberNavigation from '../components/MemberNavigation'
import { memberTheme } from '../memberConfig'
import '../emilio.css'

const contribution = [
  { title: 'Tareas realizadas', items: ['Análisis de CPU y GPU', 'Relación entre UC, ALU, registros, caché e ISA', 'Ciclo de instrucción aplicado al tracking', 'Explicación del pipeline'] },
  { title: 'Decisiones', items: ['Separación de responsabilidades entre CPU y GPU', 'Utilización de arquitectura x86-64', 'Procesamiento eficiente para baja latencia y alta frecuencia'] },
  { title: 'Dificultades', items: ['Relacionar CPU y GPU sin confundir sus responsabilidades', 'Representar correctamente las etapas del ciclo de instrucción', 'Explicar el pipeline sin confundir rendimiento global con latencia individual'] },
  { title: 'Aprendizajes', items: ['Funcionamiento conjunto de CPU y GPU', 'Relación entre UC, ALU, registros, caché e ISA', 'Comprensión del ciclo Fetch → Decode → Execute → Memory Access → Write Back', 'Función del pipeline en el rendimiento'] },
]

const instructionStages = [
  { key: 'FETCH', title: 'Fetch', description: 'La CPU obtiene de memoria la instrucción que debe ejecutar.', module: 'Memoria → Registro de instrucción' },
  { key: 'DECODE', title: 'Decode', description: 'La Unidad de Control interpreta la instrucción.', module: 'Unidad de Control' },
  { key: 'EXECUTE', title: 'Execute', description: 'La ALU o las unidades correspondientes procesan los datos.', module: 'ALU · unidades de ejecución' },
  { key: 'MEMORY', title: 'Memory Access', description: 'Se leen o escriben datos en memoria si la instrucción lo requiere.', module: 'Caché · RAM' },
  { key: 'WRITE', title: 'Write Back', description: 'El resultado se almacena en un registro o destino correspondiente.', module: 'Registros' },
]

const cpuModules = [
  ['UC', 'Unidad de Control', 'Interpreta instrucciones y coordina cada operación del sistema.'],
  ['ALU', 'ALU', 'Resuelve operaciones aritméticas y lógicas sobre los datos.'],
  ['REG', 'Registros', 'Conservan operandos, direcciones, estados y resultados inmediatos.'],
  ['L1', 'Caché', 'Acerca instrucciones y datos frecuentes para reducir la latencia.'],
  ['ISA', 'ISA', 'Define las instrucciones disponibles para la arquitectura x86-64.'],
]

const pipelineInstructions = [
  { id: 'A', label: 'Tracking del visor' },
  { id: 'B', label: 'Controlador izquierdo' },
  { id: 'C', label: 'Controlador derecho' },
]

function useSequence(lastStep: number, delay: number) {
  const [step, setStep] = useState(-1)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    if (step >= lastStep) {
      setRunning(false)
      return
    }
    const timer = window.setTimeout(() => setStep((current) => current + 1), delay)
    return () => window.clearTimeout(timer)
  }, [delay, lastStep, running, step])

  const start = () => {
    setStep(0)
    setRunning(true)
  }

  return { step, running, start }
}

function ProcessorFlow({ mode }: { mode: 'tracking' | 'render' | 'complete' | null }) {
  const blocks = ['Sensores', 'RAM', 'CPU', 'GPU', 'Visor']
  const isActive = (block: string) => mode === 'complete' || (mode === 'tracking' && block === 'CPU') || (mode === 'render' && block === 'GPU')

  return (
    <div className={`processor-flow ${mode ? `mode-${mode}` : ''}`}>
      {blocks.map((block, index) => (
        <div className={isActive(block) ? 'is-active' : ''} key={block}>
          <span>{String(index + 1).padStart(2, '0')}</span><strong>{block}</strong>{index < blocks.length - 1 ? <i>→</i> : null}
        </div>
      ))}
      {mode === 'complete' ? <b className="flow-packet">XYZ · Q</b> : null}
    </div>
  )
}

function EmilioPage() {
  const instruction = useSequence(instructionStages.length - 1, 850)
  const pipeline = useSequence(6, 650)
  const [processorMode, setProcessorMode] = useState<'tracking' | 'render' | 'complete' | null>(null)

  return (
    <main className="emilio-page" style={memberTheme('emilio')}>
      <header className="emi-nav">
        <a href="/" aria-label="Volver a la portada"><BrandMark /></a>
        <a className="emi-back" href="/"><span>←</span> Volver a la portada</a>
      </header>

      <section className="emi-hero emi-shell" aria-labelledby="emi-title">
        <div className="chip-field" aria-hidden="true"><i /><i /><i /><i /><span>CPU</span></div>
        <div className="emi-kicker"><span>APORTE 03</span> PROCESAMIENTO DEL SISTEMA</div>
        <MemberIdentity memberId="emilio" />
        <h1 id="emi-title">Emilio<br /><strong>Santiago Guzmán</strong></h1>
        <div className="emi-intro-grid">
          <p>Esta sección analiza cómo CPU, GPU, Unidad de Control, ALU, registros, caché e ISA colaboran para transformar datos de tracking en una respuesta visual de baja latencia.</p>
          <div className="clock-panel"><span>PROCESAMIENTO</span><strong>REAL TIME</strong><small>DATOS → INSTRUCCIONES → FRAME</small></div>
        </div>
      </section>

      <section className="emi-section emi-shell" aria-labelledby="processors-title">
        <div className="emi-section-heading"><span>01 / PROCESADORES</span><h2 id="processors-title">CPU + GPU</h2><p>Trabajan en conjunto sobre el mismo flujo, con responsabilidades claramente diferenciadas.</p></div>
        <div className="processor-pair">
          <article className="processor-card cpu-card"><span>CPU</span><h3>Control y procesamiento general</h3><ul><li>Lógica general del sistema</li><li>Interpretación del tracking</li><li>Control de la rutina</li><li>Coordinación de dispositivos</li><li>Ejecución de instrucciones</li></ul></article>
          <div className="processor-link" aria-hidden="true"><b>TRACKING</b><i /><strong>WORKLOAD</strong></div>
          <article className="processor-card gpu-card"><span>GPU</span><h3>Procesamiento gráfico paralelo</h3><ul><li>Procesamiento gráfico</li><li>Renderizado estereoscópico</li><li>Generación del entorno virtual</li><li>Producción de frames</li></ul></article>
        </div>
      </section>

      <section className="emi-section emi-shell" aria-labelledby="modules-title">
        <div className="emi-section-heading"><span>02 / ARQUITECTURA INTERNA</span><h2 id="modules-title">Componentes de la CPU</h2><p>Cada módulo participa en el recorrido que convierte una instrucción en una operación concreta de Gym Master VR.</p></div>
        <div className="cpu-module-grid">{cpuModules.map(([code, title, description]) => <article key={code}><span>{code}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="emi-section instruction-lab" aria-labelledby="instruction-title">
        <div className="emi-shell">
          <div className="emi-section-heading"><span>03 / SIMULADOR PRINCIPAL</span><h2 id="instruction-title">Ciclo de una instrucción</h2><p>Ejemplo: procesar posición y orientación de un controlador VR.</p></div>
          <div className="instruction-console">
            <div className="instruction-header"><div><span>INSTRUCCIÓN</span><strong>PROCESS_CONTROLLER_POSE</strong><small>X, Y, Z · Qw, Qx, Qy, Qz</small></div><button type="button" onClick={instruction.start}>{instruction.running ? 'PROCESANDO…' : 'EJECUTAR INSTRUCCIÓN'}</button></div>
            <div className="instruction-stages">
              {instructionStages.map((stage, index) => <article className={`${instruction.step === index ? 'is-active' : ''} ${instruction.step > index ? 'is-complete' : ''}`} key={stage.key}><span>{String(index + 1).padStart(2, '0')}</span><h3>{stage.title}</h3><p>{stage.description}</p><small>{stage.module}</small><i /></article>)}
            </div>
            <div className="instruction-progress"><span style={{ width: `${instruction.step < 0 ? 0 : ((instruction.step + 1) / instructionStages.length) * 100}%` }} /></div>
          </div>
        </div>
      </section>

      <section className="emi-section emi-shell" aria-labelledby="flow-title">
        <div className="emi-section-heading"><span>04 / FLUJO APLICADO</span><h2 id="flow-title">Del movimiento al visor</h2><p>La posición X, Y, Z y la orientación Qw, Qx, Qy, Qz atraviesan el sistema hasta convertirse en un frame.</p></div>
        <div className="tracking-flow" aria-label="Tracking a visor VR"><b className="tracking-packet">XYZ · Q</b>{['Tracking', 'RAM', 'CPU', 'Procesamiento', 'GPU', 'Frame', 'Visor VR'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 6 ? <i>↓</i> : null}</div>)}</div>
        <p className="emi-note">Estos valores describen la pose del controlador. Aquí el foco está en su procesamiento, no en su codificación IEEE 754.</p>
      </section>

      <section className="emi-section pipeline-section" aria-labelledby="pipeline-title">
        <div className="emi-shell">
          <div className="emi-section-heading"><span>05 / EJECUCIÓN SOLAPADA</span><h2 id="pipeline-title">Pipeline de instrucciones</h2><p>Tres flujos de tracking avanzan simultáneamente por distintas etapas del procesador.</p></div>
          <div className="pipeline-console">
            <div className="pipeline-toolbar"><button type="button" onClick={pipeline.start}>{pipeline.running ? 'PIPELINE ACTIVO…' : 'INICIAR PIPELINE'}</button><span>CICLO <b>{pipeline.step < 0 ? '—' : pipeline.step + 1}</b> / 7</span></div>
            <div className="pipeline-grid">
              <div className="pipeline-corner">INSTR.</div>{instructionStages.map((stage) => <div className="pipeline-stage-label" key={stage.key}>{stage.title}</div>)}
              {pipelineInstructions.map((item, instructionIndex) => (
                <div className="pipeline-row" key={item.id}>
                  <div className="pipeline-instruction"><b>{item.id}</b><span>{item.label}</span></div>
                  {instructionStages.map((stage, stageIndex) => {
                    const activeStage = pipeline.step - instructionIndex
                    const state = activeStage === stageIndex ? 'is-active' : activeStage > stageIndex ? 'is-complete' : ''
                    return <div className={`pipeline-cell ${state}`} key={stage.key}><span>{state ? item.id : ''}</span></div>
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="pipeline-comparison">
            <article><span>SIN PIPELINE</span><div className="serial-bars"><i /><i /><i /></div><p>Una instrucción debe finalizar antes de comenzar la siguiente.</p></article>
            <article><span>CON PIPELINE</span><div className="overlap-bars"><i /><i /><i /></div><p>El solapamiento aumenta el rendimiento global y las instrucciones procesadas por unidad de tiempo; no necesariamente reduce la latencia individual.</p></article>
          </div>
        </div>
      </section>

      <section className="emi-section emi-shell" aria-labelledby="requirements-title">
        <div className="emi-section-heading"><span>06 / REQUISITOS</span><h2 id="requirements-title">Procesar dentro del tiempo disponible</h2></div>
        <div className="processing-requirements"><article><strong>90</strong><span>Hz</span><p>Cada frame dispone de aproximadamente 11,1 ms.</p></article><article><strong>20</strong><span>ms</span><p>Objetivo máximo entre movimiento y respuesta visible.</p></article><article><strong>3</strong><span>dispositivos</span><p>Visor y dos controladores enviando datos simultáneamente.</p></article></div>
      </section>

      <section className="emi-section emi-shell" aria-labelledby="hardware-title">
        <div className="emi-section-heading"><span>07 / DECISIONES DEL PROYECTO</span><h2 id="hardware-title">CPU/GPU del proyecto</h2><p>Componentes mínimos definidos para sostener el procesamiento requerido.</p></div>
        <div className="hardware-grid"><article><span>CPU MÍNIMA</span><strong>Ryzen 5 7600</strong><small>Procesamiento general · arquitectura x86-64</small></article><article><span>GPU MÍNIMA</span><strong>RTX 4060</strong><small>8 GB · renderizado del entorno VR</small></article></div>
      </section>

      <section className="emi-section processor-demo" aria-labelledby="demo-title">
        <div className="emi-shell">
          <div className="emi-section-heading"><span>08 / CPU VS GPU</span><h2 id="demo-title">Asignación de trabajo</h2><p>La selección de una tarea permite identificar qué componente toma protagonismo.</p></div>
          <div className="processor-actions"><button type="button" onClick={() => setProcessorMode('tracking')}>PROCESAR TRACKING</button><button type="button" onClick={() => setProcessorMode('render')}>RENDERIZAR ESCENA</button><button type="button" onClick={() => setProcessorMode('complete')}>EJECUTAR CICLO COMPLETO</button></div>
          <ProcessorFlow mode={processorMode} />
        </div>
      </section>

      <section className="emi-section emi-shell" aria-labelledby="contribution-title">
        <div className="emi-section-heading"><span>09 / APORTE INDIVIDUAL</span><h2 id="contribution-title">Mi aporte</h2></div>
        <ContributionGrid groups={contribution} />
      </section>

      <section className="emi-section emi-shell" aria-labelledby="connection-title">
        <div className="emi-section-heading"><span>10 / SISTEMA COMPLETO</span><h2 id="connection-title">Conexión con Gym Master VR</h2></div>
        <div className="emi-system-flow">{['Datos de sensores', 'Memoria', 'CPU', 'GPU', 'Visor'].map((item, index) => <div className={item === 'CPU' || item === 'GPU' ? 'is-highlighted' : ''} key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 ? <i>→</i> : null}</div>)}</div>
        <p className="emi-closing">El procesamiento conecta los datos capturados con la experiencia virtual que finalmente recibe el usuario.</p>
      </section>

      <MemberNavigation currentId="emilio" />
      <footer className="emi-footer emi-shell"><BrandMark /><span>Arquitectura de Computadoras · ISPC · 2026</span><a href="#emi-title">Volver arriba ↑</a></footer>
    </main>
  )
}

export default EmilioPage
