import { CareerEntry } from '../model/career';

interface CareerTimelineProps {
  items: CareerEntry[];
}

export function CareerTimeline({ items }: CareerTimelineProps) {
  return (
    <ol className="border-border relative ml-3 border-l">
      {items.map((entry) => (
        <li key={entry.company} className="ml-6 pb-10 last:pb-0">
          <span className="bg-primary absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full" />
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h3 className="text-lg font-semibold">{entry.company}</h3>
            <span className="text-muted-foreground text-sm">{entry.period}</span>
          </div>
          <p className="text-primary text-sm">{entry.role}</p>

          <ul className="text-muted-foreground mt-3 space-y-1.5 text-sm">
            {entry.projects.map((project) => (
              <li key={project.name}>
                <span className="text-foreground font-medium">{project.name}</span>
                {' — '}
                {project.description}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
