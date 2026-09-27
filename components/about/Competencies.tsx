import { SectionHeader } from "@/components/ui/Typography";

const COMPETENCIES = [
  {
    title: "Programming Languages",
    items: [
      "C/C++",
      "Python",
      "C#",
      "HTML, CSS",
      "JavaScript/TypeScript",
      "React (NextJS)",
      "TailwindCSS, Bootstrap",
      "PHP",
    ],
  },
  {
    title: "Software and Tools",
    items: [
      "Visual Studio, VS Code",
      "QT IDE, Eclipse, Notepad++",
      "GitHub, GitLab",
      "Confluence, Gantt",
      "Office Suite, Canva",
      "Adobe Suite (After Effects, Premiere Pro)",
    ],
  },
  { title: "Languages", items: ["German: C2 (Oral and Written)", "English: C1 (Oral and Written)"] },
];

export function Competencies() {
  return (
    <section id="competencies" className="w-full max-w-7xl px-8 py-8">
      <div className="flex flex-col items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
        <SectionHeader title="Competencies" subtitle="My cross-disciplinary and technical skills" />
        <div className="w-full max-w-4xl">
          {COMPETENCIES.map(({ title, items }) => (
            <div key={title}>
              <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
              <ul className="mb-4 list-disc pl-8">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
