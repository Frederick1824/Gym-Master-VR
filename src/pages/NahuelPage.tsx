import { useState } from 'react'
import BrandMark from '../components/BrandMark'
import MemberIdentity from '../components/MemberIdentity'
import MemberNavigation from '../components/MemberNavigation'
import { memberTheme } from '../memberConfig'
import '../nahuel.css'

type TransferMode = 'cpu' | 'dma'
type InterfaceState = 'adequate' | 'saturated'

const ioGroups = {
  Entradas: ['Visor VR', 'Sensores de tracking', '2 controladores', 'IMU', 'Botones y gatillos'],
  Salidas: ['Visor / pantalla', 'Audio', 'Respuesta háptica', 'Almacenamiento'],
}

const interfaces = [
  { code: 'USB', name: 'USB 3.2 Gen 2', speed: 'Alta', latency: 'Baja', distance: 'Corta', device: 'Sensores y controladores', use: 'Transporta datos frecuentes de periféricos.' },
  { code: 'DP', name: 'DisplayPort / USB-C Alt Mode', speed: 'Muy alta', latency: 'Muy baja', distance: 'Corta', device: 'Visor VR', use: 'Envía el video renderizado hacia el visor.' },
  { code: 'BT', name: 'Bluetooth', speed: 'Baja', latency: 'Variable', distance: 'Media', device: 'Periféricos inalámbricos', use: 'Conecta dispositivos de baja tasa de datos.' },
  { code: 'PCIe', name: 'PCIe', speed: 'Muy alta', latency: 'Muy baja', distance: 'Interna', device: 'CPU, GPU y controladores', use: 'Comunica componentes internos de alto rendimiento.' },
  { code: 'NVMe', name: 'NVMe', speed: 'Muy alta', latency: 'Baja', distance: 'Interna', device: 'SSD', use: 'Conecta el almacenamiento persistente.' },
]

const contribution = [
  { title: 'Tareas realizadas', items: ['Identificación de dispositivos de entrada y salida', 'Análisis de interfaces', 'Comunicación entre periféricos y sistema', 'Estudio de interrupciones', 'Aplicación de DMA', 'Relación entre transferencia de datos, latencia y rendimiento'] },
  { title: 'Decisiones técnicas', items: ['Utilización de interfaces adecuadas según el tipo de dato', 'Consideración de DisplayPort / USB-C para video', 'Utilización de USB para sensores y controladores', 'Uso de DMA para transferencias frecuentes hacia RAM', 'Uso de interrupciones para eventos importantes'] },
]

function NahuelPage() {
  const [transferMode, setTransferMode] = useState<TransferMode>('cpu')
  const [trackingLost, setTrackingLost] = useState(false)
  const [interfaceState, setInterfaceState] = useState<InterfaceState>('adequate')
  const dmaActive = transferMode === 'dma'
  const saturated = interfaceState === 'saturated'

  return (
    <main className="nahuel-page" style={memberTheme('nahuel')}>
      <header className="nah-nav"><a href="/" aria-label="Volver a la portada"><BrandMark /></a><a className="nah-back" href="/"><span>←</span> Volver a la portada</a></header>

      <section className="nah-hero nah-shell" aria-labelledby="nah-title">
        <div className="io-orbit" aria-hidden="true"><i /><i /><i /><span>I/O</span></div>
        <div className="nah-kicker"><span>APORTE 05</span> DISPOSITIVOS · TRANSFERENCIA · CONTROL</div>
        <MemberIdentity memberId="nahuel" />
        <h1 id="nah-title">Marcelo<br /><strong>Nahuel Raspo</strong></h1>
        <div className="nah-intro-grid"><p>Esta sección analiza los mecanismos mediante los cuales Gym Master VR recibe información del visor, sensores, controladores, botones e IMU, y envía imagen, audio, respuesta háptica y datos de sesión. Las interfaces y los mecanismos de transferencia conectan estos dispositivos con memoria y procesamiento.</p><div className="io-status"><span>SUBSISTEMA</span><strong>ENTRADA ↔ SALIDA</strong><small>COMUNICACIÓN EN TIEMPO REAL</small></div></div>
      </section>

      <section className="nah-section nah-shell" aria-labelledby="devices-title">
        <div className="nah-section-heading"><span>01 / DISPOSITIVOS</span><h2 id="devices-title">Entrada y salida</h2><p>Los datos atraviesan interfaces antes de llegar a memoria y procesamiento, y regresan como respuestas perceptibles para el usuario.</p></div>
        <div className="io-map">
          <div className="io-device-group">{Object.entries(ioGroups).map(([group, items]) => <article key={group}><span>{group.toUpperCase()}</span>{items.map((item) => <b key={item}>{item}</b>)}</article>)}</div>
          <div className="io-path" aria-label="Flujo de entrada y salida">{['Dispositivos', 'Interfaces', 'Memoria / CPU', 'Procesamiento', 'Salidas'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 ? <i>→</i> : null}</div>)}<em aria-hidden="true">DATA</em></div>
        </div>
      </section>

      <section className="nah-section interface-section" aria-labelledby="interfaces-title"><div className="nah-shell">
        <div className="nah-section-heading"><span>02 / ENLACES</span><h2 id="interfaces-title">Interfaces de comunicación</h2><p>Cada enlace responde a una necesidad diferente de ancho de banda, latencia, alcance y tipo de dispositivo.</p></div>
        <div className="interface-grid">{interfaces.map((item) => <article key={item.code}><span>{item.code}</span><h3>{item.name}</h3><p>{item.use}</p><dl><div><dt>Velocidad</dt><dd>{item.speed}</dd></div><div><dt>Latencia</dt><dd>{item.latency}</dd></div><div><dt>Distancia</dt><dd>{item.distance}</dd></div><div><dt>Dispositivo</dt><dd>{item.device}</dd></div></dl></article>)}</div>
      </div></section>

      <section className="nah-section nah-shell" aria-labelledby="transfer-title">
        <div className="nah-section-heading"><span>03 / LABORATORIO INTERACTIVO</span><h2 id="transfer-title">Simulador de transferencia</h2><p>El modo seleccionado modifica el recorrido de los paquetes y la participación del procesador.</p></div>
        <div className={`transfer-console ${dmaActive ? 'is-dma' : 'is-cpu'}`}>
          <div className="mode-switch" role="tablist" aria-label="Modo de transferencia"><button type="button" role="tab" aria-selected={!dmaActive} className={!dmaActive ? 'is-active' : ''} onClick={() => setTransferMode('cpu')}>CPU GESTIONA TRANSFERENCIA</button><button type="button" role="tab" aria-selected={dmaActive} className={dmaActive ? 'is-active' : ''} onClick={() => setTransferMode('dma')}>DMA ACTIVO</button></div>
          <div className="transfer-stage" aria-live="polite"><div className="transfer-route">{(dmaActive ? ['Visor / controles', 'Interfaz', 'DMA', 'RAM', 'CPU'] : ['Visor / controles', 'Interfaz', 'CPU', 'RAM', 'CPU']).map((item, index) => <div className={item === 'DMA' ? 'is-highlighted' : ''} key={`${item}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 ? <i>↓</i> : null}</div>)}<b className="data-packet">42 B</b></div><div className="cpu-meter"><span>CARGA CPU</span><strong>{dmaActive ? 'BAJA' : 'ALTA'}</strong><i><b /></i><p>{dmaActive ? 'La CPU configura la operación y recibe una notificación al finalizar.' : 'Cada paquete requiere atención directa y frecuente del procesador.'}</p></div></div>
        </div>
      </section>

      <section className="nah-section comparison-section" aria-labelledby="comparison-title"><div className="nah-shell">
        <div className="nah-section-heading"><span>04 / COMPARACIÓN</span><h2 id="comparison-title">CPU frente a DMA</h2></div>
        <div className="dma-comparison"><article><span>SIN DMA</span><h3>Dispositivo → CPU → RAM</h3><p>La CPU participa directamente en cada transferencia.</p><dl><div><dt>Carga CPU</dt><dd>Alta</dd></div><div><dt>Transferencia</dt><dd>Bloqueante</dd></div></dl></article><article className="recommended"><span>CON DMA</span><h3>Dispositivo → DMA → RAM</h3><p>La CPU configura la operación, continúa con otras tareas y recibe una interrupción al finalizar.</p><dl><div><dt>Carga CPU</dt><dd>Baja</dd></div><div><dt>Transferencia</dt><dd>Eficiente</dd></div></dl></article></div>
      </div></section>

      <section className="nah-section nah-shell" aria-labelledby="interrupt-title">
        <div className="nah-section-heading"><span>05 / EVENTOS</span><h2 id="interrupt-title">Interrupciones del sistema</h2><p>Una pérdida de tracking debe recibir atención sin repetir la lógica de control que determina el estado de ejecución.</p></div>
        <div className={`interrupt-console ${trackingLost ? 'is-alert' : ''}`}>
          <div className="tracked-device"><span>TRACKING</span><strong>VISOR / CONTROLADOR</strong><i /><small>{trackingLost ? 'SEÑAL PERDIDA' : 'SEÑAL ESTABLE'}</small></div>
          <div className="interrupt-flow">{['Evento', 'Interrupción', 'CPU', 'Pausa', 'Advertencia'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 ? <i>→</i> : null}</div>)}</div>
          <div className="interrupt-state" aria-live="polite"><span>ESTADO</span><strong>{trackingLost ? 'INTERRUPCIÓN RECIBIDA' : 'MONITOREO ACTIVO'}</strong><small>{trackingLost ? 'RUTINA PAUSADA' : 'RUTINA EN EJECUCIÓN'}</small></div>
          <button type="button" onClick={() => setTrackingLost((active) => !active)}>{trackingLost ? 'RESTABLECER TRACKING' : 'SIMULAR PÉRDIDA DE TRACKING'}</button>
        </div>
      </section>

      <section className="nah-section packets-section" aria-labelledby="packets-title"><div className="nah-shell">
        <div className="nah-section-heading"><span>06 / PAQUETES</span><h2 id="packets-title">DMA aplicado a Gym Master VR</h2><p>Los paquetes de tracking pueden transferirse hacia un buffer de RAM sin que la CPU copie manualmente cada paquete.</p></div>
        <div className="packet-demo"><div className="packet-sources">{['Visor', 'Control 01', 'Control 02'].map((item) => <div key={item}><span>{item}</span><strong>42 B</strong><i /></div>)}</div><div className="packet-bus"><span>INTERFAZ</span><i>→</i><span>DMA</span><i>→</i><strong>RAM</strong></div><ul><li>Reduce trabajo repetitivo de CPU</li><li>Mantiene baja latencia</li><li>Libera CPU y GPU para procesar y renderizar</li></ul></div>
      </div></section>

      <section className="nah-section nah-shell" aria-labelledby="bottleneck-title">
        <div className="nah-section-heading"><span>07 / CUELLO DE BOTELLA</span><h2 id="bottleneck-title">Capacidad de la interfaz</h2><p>El rendimiento depende también de que el enlace pueda entregar los paquetes con la latencia requerida.</p></div>
        <div className={`bottleneck-console ${saturated ? 'is-saturated' : ''}`}>
          <div className="interface-toggle" role="tablist" aria-label="Estado de la interfaz"><button type="button" role="tab" aria-selected={!saturated} className={!saturated ? 'is-active' : ''} onClick={() => setInterfaceState('adequate')}>INTERFAZ ADECUADA</button><button type="button" role="tab" aria-selected={saturated} className={saturated ? 'is-active' : ''} onClick={() => setInterfaceState('saturated')}>INTERFAZ SATURADA</button></div>
          <div className="packet-queue" aria-hidden="true">{Array.from({ length: saturated ? 10 : 4 }, (_, index) => <i key={index} />)}<span>→ RAM</span></div>
          <div className="bottleneck-status" aria-live="polite"><span>LATENCIA</span><strong>{saturated ? 'ALTA' : 'BAJA'}</strong><small>{saturated ? 'ADVERTENCIA · COLA DE PAQUETES' : 'FLUJO ESTABLE'}</small></div>
        </div>
      </section>

      <section className="nah-section nah-shell" aria-labelledby="system-title">
        <div className="nah-section-heading"><span>08 / SISTEMA COMPLETO</span><h2 id="system-title">Relación con Gym Master VR</h2></div>
        <div className="nah-system-flow">{['Sensores', 'Interfaces', 'DMA / RAM', 'CPU', 'GPU', 'Visor'].map((item, index) => <div className={index < 3 ? 'is-highlighted' : ''} key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 5 ? <i>→</i> : null}</div>)}</div>
        <p className="nah-closing">Las interfaces de entrada y salida permiten que el mundo físico y la arquitectura computacional intercambien información en tiempo real.</p>
      </section>

      <section className="nah-section nah-shell" aria-labelledby="contribution-title">
        <div className="nah-section-heading"><span>09 / APÉNDICE INDIVIDUAL</span><h2 id="contribution-title">Mi aporte</h2></div>
        {/* Ampliar esta sección cuando se incorpore el apéndice individual definitivo de Nahuel. */}
        <div className="nah-contribution-grid">{contribution.map((group, index) => <article key={group.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <MemberNavigation currentId="nahuel" />
      <footer className="nah-footer nah-shell"><BrandMark /><span>Arquitectura de Computadoras · ISPC · 2026</span><a href="#nah-title">Volver arriba ↑</a></footer>
    </main>
  )
}

export default NahuelPage
