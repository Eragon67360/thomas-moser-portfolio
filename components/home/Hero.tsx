import { ContactMenu } from "@/components/contact/ContactMenu";
import { PageTitle } from "@/components/ui/Typography";
import { site } from "@/config/site";
import { currentRole, intro } from "@/content/about";

export function Hero() {
  return (
    <div className="mx-auto w-full text-center lg:w-3/4 lg:text-left">
      <PageTitle>{site.author}</PageTitle>
      <p className="mb-4 font-jet text-sm text-accent sm:text-base">
        {intro.role} · {currentRole.organization} ({currentRole.group}), {currentRole.city}
      </p>
      <p className="mb-6 text-sm font-light text-muted sm:text-base lg:mb-8">
        Embracing curiosity and a passion for learning, I craft dynamic software and web solutions that drive innovation
        and efficiency.
      </p>
      <div className="mb-10 flex items-center justify-center gap-2 md:mb-20 lg:mb-0 lg:justify-start">
        <ContactMenu />
      </div>
    </div>
  );
}
