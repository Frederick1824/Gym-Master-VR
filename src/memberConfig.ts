import type { CSSProperties } from 'react'

export type MemberId = 'fiorella' | 'emmanuel' | 'emilio' | 'josefina' | 'nahuel' | 'federico'

export const members = [
  { id: 'fiorella', name: 'Fiorella Easdale Castillo', shortName: 'Fiorella', area: 'Definición del sistema, requisitos y datos', path: '/fiorella', accent: '#38BDF8', accentRgb: '56 189 248', available: true },
  { id: 'emmanuel', name: 'Emmanuel Gillio', shortName: 'Emmanuel', area: 'Lógica Digital', path: '/emmanuel', accent: '#8B5CF6', accentRgb: '139 92 246', available: true },
  { id: 'emilio', name: 'Emilio Santiago Guzmán', shortName: 'Emilio', area: 'CPU, GPU y ciclo de instrucción', path: '/emilio', accent: '#3B82F6', accentRgb: '59 130 246', available: true },
  { id: 'josefina', name: 'Josefina', shortName: 'Josefina', area: 'Memoria y almacenamiento', path: '/josefina', accent: '#14B8A6', accentRgb: '20 184 166', available: false },
  { id: 'nahuel', name: 'Nahuel', shortName: 'Nahuel', area: 'Entrada/Salida, comunicación, interrupciones y DMA', path: '/nahuel', accent: '#F59E0B', accentRgb: '245 158 11', available: false },
  { id: 'federico', name: 'Federico', shortName: 'Federico', area: 'Integración, arquitectura y rendimiento', path: '/federico', accent: '#EF4444', accentRgb: '239 68 68', available: false },
] as const

export const getMember = (id: MemberId) => members.find((member) => member.id === id)!

export const memberTheme = (id: MemberId) => {
  const member = getMember(id)
  return {
    '--member-accent': member.accent,
    '--member-accent-rgb': member.accentRgb,
  } as CSSProperties
}
