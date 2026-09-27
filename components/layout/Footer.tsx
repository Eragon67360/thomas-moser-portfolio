import Link from "next/link";
import { footerNav, profile, site } from "@/config/site";
import { LastPlayed } from "@/components/deezer/LastPlayed";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-7xl justify-center px-8 py-8 font-jet">
      <div className="flex w-full flex-col justify-between gap-8 md:flex-row">
        <div className="order-2 flex w-full flex-col gap-4 md:order-1 md:w-1/2">
          <LastPlayed />
          <p className="text-xs lg:text-base">
            Content licensed under{" "}
            <ExternalLink
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              className="text-accent hover:underline"
            >
              CC BY-NC-SA 4.0
            </ExternalLink>
            .{" "}
            <ExternalLink href={profile.License} className="text-accent hover:underline">
              MIT License
            </ExternalLink>{" "}
            © {new Date().getFullYear()} {site.author}.
          </p>
        </div>

        <div className="order-1 flex justify-between gap-4 text-sm md:order-2 md:gap-8 md:text-base lg:gap-16">
          {footerNav.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-4">
              <p className="font-bold uppercase">{title}</p>
              {links.map(({ label, href, external }) => {
                const className = "font-extralight transition-all hover:text-accent hover:underline";
                return external ? (
                  <ExternalLink key={label} href={href} className={className}>
                    {label}
                  </ExternalLink>
                ) : (
                  <Link key={label} href={href} className={className}>
                    {label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
