import type { MetaFunction } from "react-router";
import type { Route } from "./+types/app/features/products/pages/leaderboard-page";
import type { Router } from "@react-router/dev/routes";

export function loader({ request }: Route.LoaderArgs) {
  // Fetch leaderboard data here
  return { leaderboard: [] }; // Example data
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  return [
    { title: "Leaderboard Page" },
    { name: "description", content: "View the product leaderboards." },
  ];
};

export default function LeaderboardPage({
  loaderData,
}: Router.ComponentProps<Route.Return>) {
  return (
    <div>
      <h1>Leaderboard Page</h1>
      {/* Display leaderboard data here */}
      {/* {loaderData.leaderboard.map(entry => ...)} */}
    </div>
  );
}
