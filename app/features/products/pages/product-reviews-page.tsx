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

export function meta() {
  return [
    { tittle: "Product Reviews | iMake" },
    { name: "description", content: "Read and write product reviews" },
  ];
}

export default function ProductReviewsPage() {
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">10 Reviews</h2>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Wrtie a review</Button>
          </DialogTrigger>
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
              key={index}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
