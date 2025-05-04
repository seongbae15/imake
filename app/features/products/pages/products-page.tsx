import type { MetaFunction } from "react-router";
import type { Route } from "./+types/app/features/products/pages/products-page";
import type { Router } from "@react-router/dev/routes";

export function loader({ request }: Route.LoaderArgs) {
  // Fetch products here
  return { products: [] }; // Example data
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  return [
    { title: "Products Page" },
    { name: "description", content: "Browse all products." },
  ];
};

export default function ProductsPage({
  loaderData,
}: Router.ComponentProps<Route.Return>) {
  return (
    <div>
      <h1>Products Page</h1>
      {/* Display products list here */}
      {/* {loaderData.products.map(product => ...)} */}
    </div>
  );
}
