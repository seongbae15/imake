import type { MetaFunction } from "react-router";
import type { Route } from "./+types/app/features/products/pages/yearly-leaderboard-page";
import type { Router } from "@react-router/dev/routes";

export function loader({ request, params }: Route.LoaderArgs) {
  const year = params.year;
  // Fetch yearly leaderboard data for the given year
  return { year, leaderboard: [] }; // Example data
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  return [
    { title: `Yearly Leaderboard - ${data?.year || ""}` },
    {
      name: "description",
      content: `View the yearly product leaderboard for ${data?.year || ""}.`,
    },
  ];
};

export default function YearlyLeaderboardPage({
  loaderData,
}: Router.ComponentProps<Route.Return>) {
  return (
    <div>
      <h1>Yearly Leaderboard - {loaderData.year}</h1>
      {/* Display yearly leaderboard data here */}
      {/* {loaderData.leaderboard.map(entry => ...)} */}
    </div>
  );
}
