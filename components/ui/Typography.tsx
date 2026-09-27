import type { ReactNode } from "react";

type TextProps = { children: ReactNode };

export function PageTitle({ children }: TextProps) {
  return (
    <h1 className="mb-4 inline-block text-center text-lg leading-none font-extrabold tracking-tight text-white transition-all sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
      {children}
    </h1>
  );
}

type HeadingLevel = "h1" | "h2";

export function SectionTitle({ children, as: Heading = "h2" }: TextProps & { as?: HeadingLevel }) {
  return (
    <Heading className="text-center text-2xl font-bold transition-all md:text-4xl lg:text-5xl">{children}</Heading>
  );
}

function SectionSubtitle({ children }: TextProps) {
  return <p className="w-4/5 text-center text-base text-muted transition-all lg:text-lg xl:text-xl">{children}</p>;
}

export function SectionHeader({
  title,
  subtitle,
  as,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Use "h1" when the header is the page's main heading. */
  as?: HeadingLevel;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
      <SectionTitle as={as}>{title}</SectionTitle>
      {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
    </div>
  );
}
