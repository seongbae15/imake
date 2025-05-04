import type { MetaFunction } from "react-router";
import type { Route } from "./+types/app/features/products/pages/daily-leaderboard-page";
import type { Router } from "@react-router/dev/routes";

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month, day } = params;
  // Fetch daily leaderboard data for the given date
  return { year, month, day, leaderboard: [] }; // Example data
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  return [
    {
      title: `Daily Leaderboard - ${data?.year || ""}/${data?.month || ""}/${
        data?.day || ""
      }`,
    },
    {
      name: "description",
      content: `View the daily product leaderboard for ${data?.year || ""}/${
        data?.month || ""
      }/${data?.day || ""}.`,
    },
  ];
};

export default function DailyLeaderboardPage({
  loaderData,
}: Router.ComponentProps<Route.Return>) {
  return (
    <div>
      <h1>
        Daily Leaderboard - {loaderData.year}/{loaderData.month}/
        {loaderData.day}
      </h1>
      {/* Display daily leaderboard data here */}
      {/* {loaderData.leaderboard.map(entry => ...)} */}
    </div>
  );
}
