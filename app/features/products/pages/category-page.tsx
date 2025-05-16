import type { Route } from "./+types/category-page";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";

export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: "Developer Tools | ProductHunt Clone" },
    {
      name: "description",
      content: `Browse Developer Tools products.`,
    },
  ];
};

export default function CategoryPage() {
  return (
    <div className="space-y-10">
      <Hero
        title="Developer Tools"
        description="Tool for developers to build products faster"
      />
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={`productId-${index}`}
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentCount={12}
            viewCount={12}
            upvoteCount={120}
          />
        ))}
        <ProductPagination totalPages={10} />
      </div>
    </div>
  );
}
