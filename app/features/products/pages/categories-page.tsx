import type { MetaFunction } from "react-router";
import type { Route } from "./+types/app/features/products/pages/categories-page";
import type { Router } from "@react-router/dev/routes";

export function loader({ request }: Route.LoaderArgs) {
  // Fetch categories data here
  return { categories: [] }; // Example data
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  return [
    { title: "Product Categories Page" },
    { name: "description", content: "Browse products by category." },
  ];
};

export default function CategoriesPage({
  loaderData,
}: Router.ComponentProps<Route.Return>) {
  return (
    <div>
      <h1>Product Categories</h1>
      {/* Display categories list here */}
      {/* {loaderData.categories.map(category => ...)} */}
    </div>
  );
}
