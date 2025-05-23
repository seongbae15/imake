import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-products-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Products | iMake" }];
};

export default function ProfileProductsPage() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductCard
          key={`productId-${index}`}
          id={`productId-${index}`}
          name="Product Name"
          description="Poroduct Description"
          commentCount={12}
          viewCount={12}
          upvoteCount={120}
        />
      ))}
    </div>
  );
}
