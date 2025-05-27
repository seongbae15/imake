import type { Route } from "./+types/categories-page";
import { Hero } from "~/common/components/hero";
import { CategoryCard } from "../components/category-card";
import { getCategories } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Categories | ProductHunt Clone" },
    {
      name: "description",
      content: "Browse products in the category.",
    },
  ];
};

export const loader = async () => {
  const categories = await getCategories();
  return { categories };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Categories" description="Search for products by category" />
      <div className="grid grid-cols-4 gap-10">
        {loaderData.categories.map((category) => (
          <CategoryCard
            title={category.name}
            description={category.description}
            href={`/products/categories/${category.category_id}`}
            key={category.category_id}
          />
        ))}
      </div>
    </div>
  );
}
