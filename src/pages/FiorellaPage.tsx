import { useMemo, useState } from 'react'
import BrandMark from '../components/BrandMark'
import MemberIdentity from '../components/MemberIdentity'
import MemberNavigation from '../components/MemberNavigation'
import { memberTheme } from '../memberConfig'
import '../fiorella.css'

const requirements = [
  { id: 'R1', value: '90', unit: 'Hz', label: 'Actualización mínima', detail: 'Fluidez visual sostenida' },
  { id: 'R2', value: '20', unit: 'ms', label: 'Latencia máxima', detail: 'Respuesta perceptual segura' },
  { id: 'R3', value: '2160²', unit: 'px/ojo', label: 'Resolución mínima', detail: '2160 × 2160 por ojo' },
  { id: 'R4', value: '3', unit: 'dispositivos', label: 'Seguimiento simultáneo', detail: '1 visor + 2 controladores' },
  { id: 'R5', value: '60', unit: 'min', label: 'Sesión continua', detail: 'Operación estable' },
  { id: 'R6', value: '20', unit: 'GB', label: 'Reserva de datos', detail: 'Perfiles, ajustes y registros' },
]

const contribution = [
  { title: 'Tareas realizadas', items: ['Definición de requisitos cuantificables del sistema', 'Modelado de datos de tracking', 'Representación binaria y hexadecimal', 'Cálculo de tasa de transferencia', 'Cálculo de ancho de banda gráfico'] },
  { title: 'Decisiones', items: ['Frecuencia mínima de actualización de 90 Hz', 'Latencia objetivo máxima de 20 ms', 'Uso de Float32 para posición y orientación', 'Palabra de control de 16 bits', 'Interfaces de alta velocidad justificadas por el flujo gráfico'] },
  { title: 'Dificultades', items: ['Traducir movimientos físicos a datos digitales', 'Mantener coherencia entre bits, bytes y tasas de transferencia', 'Relacionar los cálculos con decisiones reales de arquitectura'] },
  { title: 'Aprendizajes', items: ['Representación digital de datos', 'Conversión entre binario y hexadecimal', 'Cálculo de volumen y transferencia de información', 'Relación entre requisitos y arquitectura del sistema'] },
]

const format = (value: number, maximumFractionDigits = 2) =>
  new Intl.NumberFormat('es-AR', { maximumFractionDigits }).format(value)

function Meter({ value, label }: { value: number; label: string }) {
  return (
    <div className="fio-meter" aria-label={`${label}: ${Math.round(value)} por ciento`}>
      <span style={{ width: `${Math.min(100, Math.max(4, value))}%` }} />
    </div>
  )
}

function FiorellaPage() {
  const [devices, setDevices] = useState(3)
  const [sensorHz, setSensorHz] = useState(1000)
  const [graphicHz, setGraphicHz] = useState(90)
  const [width, setWidth] = useState(4320)
  const [height, setHeight] = useState(2160)

  const data = useMemo(() => {
    const telemetrySample = devices * 42
    const trackingBytes = telemetrySample * sensorHz
    const frameBytes = width * height * 3
    const graphicBytes = frameBytes * graphicHz

    return {
      telemetrySample,
      trackingBytes,
      trackingKB: trackingBytes / 1000,
      frameBytes,
      frameMB: frameBytes / 1_000_000,
      graphicMB: graphicBytes / 1_000_000,
      graphicGB: graphicBytes / 1_000_000_000,
      graphicGbps: graphicBytes * 8 / 1_000_000_000,
      trackingLoad: trackingBytes / 126_000 * 50,
      graphicLoad: graphicBytes / 2_519_424_000 * 50,
    }
  }, [devices, sensorHz, graphicHz, width, height])

  const baselineRatio = (data.trackingLoad + data.graphicLoad) / 100
  const demand = baselineRatio > 1.03 ? 'Mayor exigencia' : baselineRatio < .97 ? 'Menor exigencia' : 'Carga de referencia'

  return (
    <main className="fiorella-page" style={memberTheme('fiorella')}>
      <header className="fio-nav">
        <a href="/" aria-label="Volver a la portada"><BrandMark /></a>
        <a className="fio-back" href="/"><span>←</span> Volver a la portada</a>
      </header>

      <section className="fio-hero fio-shell" aria-labelledby="fio-title">
        <div className="fio-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="fio-kicker"><span>APORTE 01</span> SISTEMA · REQUISITOS · DATOS</div>
        <MemberIdentity memberId="fiorella" />
        <h1 id="fio-title">Fiorella<br /><strong>Easdale Castillo</strong></h1>
        <div className="fio-intro-grid">
          <p>Esta sección convierte las necesidades de Gym Master VR en parámetros técnicos: se definen requisitos, se modela la representación digital y se calcula qué volumen de datos debe sostener la arquitectura.</p>
          <div className="fio-focus" aria-label="Áreas de trabajo">
            <span>REQUISITOS</span><span>DATOS</span><span>TRANSFERENCIA</span><span>ARQUITECTURA</span>
          </div>
        </div>
      </section>

      <section className="fio-section fio-shell" aria-labelledby="requirements-title">
        <div className="fio-section-heading">
          <span>01 / PARÁMETROS</span>
          <h2 id="requirements-title">Requisitos cuantificables</h2>
          <p>Condiciones medibles que orientan rendimiento, capacidad y experiencia de uso.</p>
        </div>
        <div className="requirements-grid">
          {requirements.map((requirement) => (
            <article className="requirement-card" key={requirement.id}>
              <span className="requirement-id">{requirement.id}</span>
              <div><strong>{requirement.value}</strong><em>{requirement.unit}</em></div>
              <h3>{requirement.label}</h3>
              <p>{requirement.detail}</p>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="fio-section fio-shell" aria-labelledby="data-title">
        <div className="fio-section-heading">
          <span>02 / CODIFICACIÓN</span>
          <h2 id="data-title">Representación digital de datos</h2>
        </div>
        <div className="data-model-grid">
          <article className="data-panel telemetry-panel">
            <div className="panel-label">TELEMETRÍA Y POSICIÓN ESPACIAL</div>
            <div className="axis-visual" aria-hidden="true">
              <span className="axis-x">X</span><span className="axis-y">Y</span><span className="axis-z">Z</span><i />
            </div>
            <h3>Coordenadas + orientación</h3>
            <p>Posición <b>X, Y, Z</b> y orientación mediante cuaterniones <b>Qw, Qx, Qy, Qz</b>.</p>
            <div className="format-strip"><span>IEEE 754</span><strong>Float32</strong><span>4 bytes / valor</span></div>
          </article>

          <article className="data-panel command-panel">
            <div className="panel-label">ESTADO Y COMANDOS · 16 BITS</div>
            <div className="bit-word" aria-label="0001 0100 1010 0001">
              {['0001', '0100', '1010', '0001'].map((group, index) => <span key={group + index}>{group}</span>)}
            </div>
            <div className="hex-value"><span>HEX</span><strong>0x14A1</strong></div>
            <div className="bit-legend">
              <span><b>15–12</b>ID dispositivo</span>
              <span><b>11–8</b>Botón / gatillo</span>
              <span><b>7–4</b>Nivel de batería</span>
              <span><b>3–0</b>Evento / seguridad</span>
            </div>
          </article>
        </div>
      </section>

      <section className="fio-section simulator-section" aria-labelledby="simulator-title">
        <div className="fio-shell">
          <div className="fio-section-heading simulator-heading">
            <span>03 / LABORATORIO INTERACTIVO</span>
            <h2 id="simulator-title">Simulador de flujo de datos</h2>
            <p>La modificación de los parámetros permite observar en tiempo real cómo cambia la exigencia del sistema.</p>
          </div>

          <div className="simulator-grid">
            <div className="controls-panel">
              <label>Dispositivos rastreados <output>{devices}</output>
                <input type="range" min="1" max="12" value={devices} onChange={(event) => setDevices(Number(event.target.value))} />
              </label>
              <label>Frecuencia de sensores <output>{sensorHz} Hz</output>
                <input type="range" min="100" max="2000" step="100" value={sensorHz} onChange={(event) => setSensorHz(Number(event.target.value))} />
              </label>
              <label>Frecuencia gráfica <output>{graphicHz} Hz</output>
                <input type="range" min="60" max="144" step="1" value={graphicHz} onChange={(event) => setGraphicHz(Number(event.target.value))} />
              </label>
              <div className="resolution-controls">
                <label>Resolución horizontal
                  <input type="number" min="1280" max="7680" step="80" value={width} onChange={(event) => setWidth(Math.max(1, Number(event.target.value)))} />
                </label>
                <span>×</span>
                <label>Resolución vertical
                  <input type="number" min="720" max="4320" step="40" value={height} onChange={(event) => setHeight(Math.max(1, Number(event.target.value)))} />
                </label>
              </div>
              <div className="fixed-values"><span>42 bytes / muestra / dispositivo</span><span>24 bits / píxel · RGB</span></div>
            </div>

            <div className="results-panel" aria-live="polite">
              <div className="demand-state"><span className={`demand-dot ${demand === 'Carga de referencia' ? 'is-reference' : ''}`} />{demand}</div>
              <article className="result-card tracking-result">
                <div><span>A · Telemetría por muestra</span><strong>{format(data.telemetrySample, 0)} <small>bytes</small></strong></div>
                <div><span>B · Transferencia de tracking</span><strong>{format(data.trackingKB)} <small>KB/s</small></strong><em>{format(data.trackingBytes, 0)} bytes/s</em></div>
                <Meter value={data.trackingLoad} label="Carga de tracking" />
              </article>
              <article className="result-card video-result">
                <div><span>C · Tamaño de un frame</span><strong>{format(data.frameMB)} <small>MB</small></strong><em>{format(data.frameBytes, 0)} bytes</em></div>
                <div><span>D · Ancho de banda gráfico</span><strong>{format(data.graphicGB)} <small>GB/s</small></strong><em>{format(data.graphicMB)} MB/s · {format(data.graphicGbps)} Gbps</em></div>
                <Meter value={data.graphicLoad} label="Carga gráfica" />
              </article>
            </div>
          </div>

          <div className="flow-comparison">
            <article><span>TRACKING</span><strong>{format(data.trackingKB)} KB/s</strong><p>Poco volumen de datos, pero máxima sensibilidad a la latencia.</p><Meter value={12} label="Volumen de tracking" /></article>
            <div className="versus">VS</div>
            <article><span>VIDEO</span><strong>{format(data.graphicGB)} GB/s</strong><p>Gran volumen continuo y alto requerimiento de ancho de banda.</p><Meter value={88} label="Volumen de video" /></article>
          </div>
        </div>
      </section>

      <section className="fio-section fio-shell architecture-section" aria-labelledby="architecture-title">
        <div className="fio-section-heading">
          <span>04 / DECISIÓN</span>
          <h2 id="architecture-title">De los datos a la arquitectura</h2>
        </div>
        <div className="architecture-card">
          <div className="architecture-copy">
            <p>La telemetría no representa un problema de capacidad, pero necesita un recorrido de <strong>baja latencia</strong>. El flujo gráfico, en cambio, exige una <strong>interfaz de alto ancho de banda</strong>.</p>
            <span>Dos flujos distintos. Dos prioridades de diseño.</span>
          </div>
          <div className="architecture-nodes" aria-label="Componentes relacionados">
            {['DisplayPort / USB-C', 'DMA', 'Memoria RAM', 'CPU / GPU'].map((item, index) => <div key={item}><i>{String(index + 1).padStart(2, '0')}</i>{item}</div>)}
          </div>
        </div>
      </section>

      <section className="fio-section fio-shell" aria-labelledby="contribution-title">
        <div className="fio-section-heading">
          <span>05 / APÉNDICE INDIVIDUAL</span>
          <h2 id="contribution-title">Mi aporte</h2>
        </div>
        <div className="fio-contribution-grid">{contribution.map((group, index) => <article key={group.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className="fio-section fio-shell connection-section" aria-labelledby="connection-title">
        <div className="fio-section-heading">
          <span>06 / SISTEMA COMPLETO</span>
          <h2 id="connection-title">Conexión con Gym Master VR</h2>
        </div>
        <div className="system-flow">
          {['Sensores', 'Datos', 'Memoria', 'CPU / GPU', 'Visor'].map((item, index) => (
            <div className={item === 'Datos' ? 'is-highlighted' : ''} key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 ? <i>→</i> : null}
            </div>
          ))}
        </div>
        <p className="flow-note"><span>Intervención de Fiorella</span> Los requisitos definen el objetivo; el modelado de datos determina cómo circula la información hacia el resto de la arquitectura.</p>
      </section>

      <MemberNavigation currentId="fiorella" />
      <footer className="fio-footer fio-shell"><BrandMark /><span>Arquitectura de Computadoras · ISPC · 2026</span><a href="#fio-title">Volver arriba ↑</a></footer>
    </main>
  )
}

export default FiorellaPage
