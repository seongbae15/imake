import type { Route } from "./+types/categories-page";
import { Hero } from "~/common/components/hero";
import { CategoryCard } from "../components/category-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Categories | ProductHunt Clone" },
    {
      name: "description",
      content: "Browse products in the category.",
    },
  ];
};

export default function CategoryPage() {
  return (
    <div className="space-y-10">
      <Hero title="Categories" description="Search for products by category" />
      <div className="grid grid-cols-4 gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            title="Category Name"
            description="Category description"
            href={`/products/categories/categoryId-${index}`}
            key={`category-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
