import { getMember, members, type MemberId } from '../memberConfig'

function NavigationItem({ id, direction }: { id: MemberId; direction: 'previous' | 'next' }) {
  const member = getMember(id)
  const content = <><span>{direction === 'previous' ? '←' : null} {member.shortName} {direction === 'next' ? '→' : null}</span><strong>{member.area}</strong>{member.available ? null : <small>Próximamente</small>}</>

  return member.available
    ? <a className={`member-nav-item is-${direction}`} href={member.path}>{content}</a>
    : <div className={`member-nav-item is-${direction} is-disabled`} aria-disabled="true">{content}</div>
}

function MemberNavigation({ currentId }: { currentId: MemberId }) {
  const currentIndex = members.findIndex((member) => member.id === currentId)
  const previous = currentIndex > 0 ? members[currentIndex - 1] : null
  const next = currentIndex < members.length - 1 ? members[currentIndex + 1] : null

  return (
    <nav className="member-navigation" aria-label="Navegación entre integrantes">
      {previous ? <NavigationItem id={previous.id} direction="previous" /> : <a className="member-nav-item is-previous" href="/"><span>← Inicio</span><strong>Gym Master VR</strong></a>}
      {next ? <NavigationItem id={next.id} direction="next" /> : <a className="member-nav-item is-next" href="/"><span>Inicio →</span><strong>Arquitectura general</strong></a>}
    </nav>
  )
}

export default MemberNavigation
