export const BUDGET_OPTIONS = [
  { value: "1-5", label: "$1k - 5k" },
  { value: "5-10", label: "$5k - 10k" },
  { value: ">10", label: ">$10k" },
] as const;

export type ProjectRequest = {
  name: string;
  email: string;
  position: string;
  company: string;
  budget: string;
  description: string;
};

export function readProjectRequest(form: FormData): ProjectRequest {
  const field = (name: keyof ProjectRequest) => {
    const value = form.get(name);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: field("name"),
    email: field("email"),
    position: field("position"),
    company: field("company"),
    budget: field("budget"),
    description: field("description"),
  };
}

/** A `mailto:` URL that pre-fills the visitor's mail client with the request. */
export function toMailto(recipient: string, request: ProjectRequest): string {
  const budget = BUDGET_OPTIONS.find((option) => option.value === request.budget)?.label ?? "Not specified";
  const role = [request.position, request.company].filter(Boolean).join(" at ");
  const details = [`Name: ${request.name}`, `Email: ${request.email}`];
  if (role) details.push(`Role: ${role}`);
  details.push(`Budget: ${budget}`);
  const body = `${details.join("\n")}\n\n${request.description}`;

  const params = new URLSearchParams({ subject: `Project request from ${request.name}`, body });
  // URLSearchParams encodes spaces as "+", which mail clients render literally.
  return `mailto:${recipient}?${params.toString().replaceAll("+", "%20")}`;
}
