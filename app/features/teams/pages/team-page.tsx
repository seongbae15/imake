import type { Route } from "./+types/team-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Team Details | iMake" }];
};
export function TeamPage() {
  return <div>Team Page</div>;
}
