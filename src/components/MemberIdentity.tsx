import { getMember, members, type MemberId } from '../memberConfig'

function MemberIdentity({ memberId }: { memberId: MemberId }) {
  const member = getMember(memberId)
  const index = members.findIndex((item) => item.id === memberId) + 1

  return (
    <div className="member-identity">
      <span>{String(index).padStart(2, '0')} / {String(members.length).padStart(2, '0')}</span>
      <strong><b>{member.titleSolid}</b><i>{member.titleOutline}</i></strong>
    </div>
  )
}

export default MemberIdentity
