import type { MetaFunction } from "react-router";
import type { Route } from "./+types/app/features/products/pages/category-page";
import type { Router } from "@react-router/dev/routes";

export function loader({ request, params }: Route.LoaderArgs) {
  const category = params.category;
  // Fetch products for the given category
  return { category, products: [] }; // Example data
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  const categoryName = data?.category || "Category";
  return [
    { title: `${categoryName} Products` },
    {
      name: "description",
      content: `Browse products in the ${categoryName} category.`,
    },
  ];
};

export default function CategoryPage({
  loaderData,
}: Router.ComponentProps<Route.Return>) {
  return (
    <div>
      <h1>{loaderData.category} Products</h1>
      {/* Display products for this category */}
      {/* {loaderData.products.map(product => ...)} */}
    </div>
  );
}
