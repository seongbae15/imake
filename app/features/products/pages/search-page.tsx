import type { MetaFunction } from "react-router";
import type { Route } from "./+types/app/features/products/pages/search-page";
import type { Router } from "@react-router/dev/routes";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  // Fetch search results based on query
  return { query, results: [] }; // Example data
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  return [
    { title: `Search Results for "${data?.query || ""}"` },
    {
      name: "description",
      content: `Search results for products matching "${data?.query || ""}".`,
    },
  ];
};

export default function SearchPage({
  loaderData,
}: Router.ComponentProps<Route.Return>) {
  return (
    <div>
      <h1>Search Results for "{loaderData.query}"</h1>
      {/* Display search results here */}
      {/* {loaderData.results.map(result => ...)} */}
    </div>
  );
}
