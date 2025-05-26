import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import { TeamCard } from "../components/team-card";
import { getTeams } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Teams | iMake" }];
};

export const loader = async () => {
  const teams = await getTeams({ limit: 8 });
  return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="Teams" description="Find a team looking for a new member." />
      <div className="grid grid-cols-4 gpa-4">
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            username={team.team_leader.username}
            avatarUrl={team.team_leader.avatar}
            roles={team.roles.split(",")}
            projectDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
