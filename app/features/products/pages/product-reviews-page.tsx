import type { Route } from "./+types/product-reviews-page";

export function loader({ params }: Route.LoaderArgs) {
  return {
    productId: params.productId,
  };
}

export function meta(): Route.MetaFunction {
  return {
    title: "Product Reviews",
    description: "View and read product reviews",
  };
}

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Reviews</h1>
        <a
          href={`/products/${loaderData.productId}/reviews/new`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Write a Review
        </a>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Reviews for Product ID: {loaderData.productId}
        </p>
      </div>
    </div>
  );
}
