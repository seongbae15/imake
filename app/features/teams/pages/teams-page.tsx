import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import { TeamCard } from "../components/team-card";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Teams | iMake" }];
};

export default function TeamsPage() {
  return (
    <div className="space-y-20">
      <Hero title="Teams" description="Find a team looking for a new member." />
      <div className="grid grid-cols-4 gpa-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <TeamCard
            key={`teamId-${index}`}
            id={`teamId-${index}`}
            username="seongbae"
            avatarUrl="https://github.com/seongbae15.png"
            roles={["ML Engineer", "Project Manager", "Backedn Developer"]}
            projectDescription="a project to build a web app"
            avatarFallback="SB"
          />
        ))}
      </div>
    </div>
  );
}
