import type { MetaFunction } from "react-router";
import type { Route } from "./+types/app/features/products/pages/monthly-leaderboard-page";
import type { Router } from "@react-router/dev/routes";

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month } = params;
  // Fetch monthly leaderboard data for the given year and month
  return { year, month, leaderboard: [] }; // Example data
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  return [
    { title: `Monthly Leaderboard - ${data?.year || ""}/${data?.month || ""}` },
    {
      name: "description",
      content: `View the monthly product leaderboard for ${data?.year || ""}/${
        data?.month || ""
      }.`,
    },
  ];
};

export default function MonthlyLeaderboardPage({
  loaderData,
}: Router.ComponentProps<Route.Return>) {
  return (
    <div>
      <h1>
        Monthly Leaderboard - {loaderData.year}/{loaderData.month}
      </h1>
      {/* Display monthly leaderboard data here */}
      {/* {loaderData.leaderboard.map(entry => ...)} */}
    </div>
  );
}
