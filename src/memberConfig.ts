import type { CSSProperties } from 'react'

export type MemberId = 'fiorella' | 'emmanuel' | 'emilio' | 'josefina' | 'nahuel' | 'federico'

export const members = [
  { id: 'fiorella', name: 'Fiorella Easdale Castillo', shortName: 'Fiorella', area: 'Definición del sistema, requisitos y datos', titleSolid: 'Definición del sistema', titleOutline: 'Requisitos y datos', path: '/fiorella', accent: '#38BDF8', accentRgb: '56 189 248', available: true },
  { id: 'emmanuel', name: 'Emmanuel Gillio', shortName: 'Emmanuel', area: 'Lógica Digital', titleSolid: 'Lógica', titleOutline: 'Digital', path: '/emmanuel', accent: '#8B5CF6', accentRgb: '139 92 246', available: true },
  { id: 'emilio', name: 'Emilio Santiago Guzmán', shortName: 'Emilio', area: 'CPU, GPU y ciclo de instrucción', titleSolid: 'CPU, GPU', titleOutline: 'Y ciclo de instrucción', path: '/emilio', accent: '#3B82F6', accentRgb: '59 130 246', available: true },
  { id: 'josefina', name: 'Josefina Madai Alcaraz', shortName: 'Josefina', area: 'Memoria y almacenamiento', titleSolid: 'Memoria', titleOutline: 'Y almacenamiento', path: '/josefina', accent: '#14B8A6', accentRgb: '20 184 166', available: true },
  { id: 'nahuel', name: 'Marcelo Nahuel Raspo', shortName: 'Nahuel', area: 'Entrada/Salida, comunicación, interrupciones y DMA', titleSolid: 'Entrada / salida,', titleOutline: 'Comunicación, interrupciones y DMA', path: '/nahuel', accent: '#F59E0B', accentRgb: '245 158 11', available: true },
  { id: 'federico', name: 'Federico Montoro', shortName: 'Federico', area: 'Integración, arquitectura y rendimiento', titleSolid: 'Integración, arquitectura', titleOutline: 'Y rendimiento', path: '/federico', accent: '#EF4444', accentRgb: '239 68 68', available: true },
] as const

export const getMember = (id: MemberId) => members.find((member) => member.id === id)!

export const memberTheme = (id: MemberId) => {
  const member = getMember(id)
  return {
    '--member-accent': member.accent,
    '--member-accent-rgb': member.accentRgb,
  } as CSSProperties
}
