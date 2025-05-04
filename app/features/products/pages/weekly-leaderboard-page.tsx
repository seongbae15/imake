import type { MetaFunction } from "react-router";
import type { Route } from "./+types/app/features/products/pages/weekly-leaderboard-page";
import type { Router } from "@react-router/dev/routes";

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, week } = params;
  // Fetch weekly leaderboard data for the given year and week
  return { year, week, leaderboard: [] }; // Example data
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  return [
    { title: `Weekly Leaderboard - ${data?.year || ""}-W${data?.week || ""}` },
    {
      name: "description",
      content: `View the weekly product leaderboard for ${
        data?.year || ""
      }, week ${data?.week || ""}.`,
    },
  ];
};

export default function WeeklyLeaderboardPage({
  loaderData,
}: Router.ComponentProps<Route.Return>) {
  return (
    <div>
      <h1>
        Weekly Leaderboard - {loaderData.year}-W{loaderData.week}
      </h1>
      {/* Display weekly leaderboard data here */}
      {/* {loaderData.leaderboard.map(entry => ...)} */}
    </div>
  );
}
