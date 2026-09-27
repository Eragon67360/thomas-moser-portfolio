import { Card } from "@heroui/react";
import { stack } from "@/content/about";

export function StackGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stack.map(({ group, items }) => (
        <Card key={group} className="bg-[#ccdcff1f]">
          <Card.Header>
            <Card.Title className="text-base font-semibold">{group}</Card.Title>
          </Card.Header>
          <Card.Content>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <span className="size-2 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
