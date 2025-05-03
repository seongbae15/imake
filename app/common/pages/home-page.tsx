import type { MetaFunction } from "react-router";
import { ProductCard } from "../../features/product/components/product-card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { PostCard } from "../../features/community/components/post-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { IdeaCard } from "../../features/ideas/components/idea-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | iMake" },
    { name: "description", content: "Welcome to iMake" },
  ];
};

export default function HomePage() {
  return (
    <div className="px-20 space-y-40">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today.
          </p>
          <Button variant={"link"} asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentCount={12}
            viewCount={12}
            upvoteCount={120}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            The latest discussions made by our community.
          </p>
          <Button variant={"link"} asChild className="text-lg p-0">
            <Link to="/products/leaderboards">
              Explore all discussions &rarr;
            </Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            key={index}
            id={`postId-${index}`}
            title="What is the best productivity tool?"
            author="Seongbae"
            avatarUrl="https://github.com/apple.png"
            category="Productivity"
            timeAgo="12 hours ago"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            IdeasGPT
          </h2>
          <p className="text-xl font-light text-foreground">
            Find ideas for your next project.
          </p>
          <Button variant={"link"} asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id="ideaId"
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            views={123}
            timeAgo="12 hours ago"
            likes={123}
            claimed={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
