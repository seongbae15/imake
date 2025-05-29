import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-reviews-page";
import { getReviews } from "../queries";

export function meta() {
  return [
    { tittle: "Product Reviews | iMake" },
    { name: "description", content: "Read and write product reviews" },
  ];
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const reviews = await getReviews(Number(params.productId));
  return { reviews };
};

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  const { review_count } = useOutletContext<{
    review_count: string;
  }>();
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {review_count} {review_count <= "1" ? "Review" : "Reviews"}
          </h2>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Wrtie a review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {loaderData.reviews.map((review) => (
            <ReviewCard
              author={{
                name: review.user.username,
                avatarUrl: review.user.avatar,
                avatarFallback: review.user.username[0],
              }}
              rating={review.rating}
              content={review.review}
              createdAt={review.created_at}
              key={review.review_id}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
