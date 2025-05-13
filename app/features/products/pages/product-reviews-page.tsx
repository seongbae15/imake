import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";

export function meta() {
  return [
    { tittle: "Product Reviews | iMake" },
    { name: "description", content: "Read and write product reviews" },
  ];
}

export default function ProductReviewsPage() {
  return (
    <div className="space-y-10 max-w-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">10 Reviews</h2>
        <Button variant={"secondary"}>Wrtie a review</Button>
      </div>
      <div className="space-y-20">
        {Array.from({ length: 10 }).map((_, index) => (
          <ReviewCard
            author={{
              name: "John Doe",
              avatarUrl: "https://github.com/seongbae15.png",
              avatarFallback: "N",
            }}
            rating={5}
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            createdAt="10 days ago"
          />
        ))}
      </div>
    </div>
  );
}
