export type ContributionGroup = {
  title: string
  items: readonly string[]
}

function ContributionGrid({ groups }: { groups: readonly ContributionGroup[] }) {
  return (
    <div className="member-contribution-grid">
      {groups.map((group, index) => (
        <article key={group.title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{group.title}</h3>
          <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      ))}
    </div>
  )
}

export default ContributionGrid
