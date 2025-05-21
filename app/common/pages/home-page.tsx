import type { MetaFunction } from "react-router";
import { ProductCard } from "../../features/products/components/product-card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { PostCard } from "../../features/community/components/post-card";
import { IdeaCard } from "../../features/ideas/components/idea-card";
import { JobCard } from "../../features/jobs/components/job-card";
import { TeamCard } from "../../features/teams/components/team-card";
import type { Route } from "./+types/home-page";
import { getProductByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  return [
    { title: "Home | iMake" },
    { name: "description", content: "Welcome to our site!" },
  ];
};

export const loader = async () => {
  const products = await getProductByDateRange({
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
  });
  return { products };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-40">
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
        {loaderData.products.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
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
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            key={index}
            id={index}
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
            <Link to="/ideas">Explore all ideas &rarr;</Link>
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
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Jobs
          </h2>
          <p className="text-xl font-light text-foreground">
            Find your dream job.
          </p>
          <Button variant={"link"} asChild className="text-lg p-0">
            <Link to="/jobs">Explore all jobs &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <JobCard
            key={index}
            id="jobId"
            companyName="Tesla"
            companyLogo="https://github.com/teslamotors.png"
            title="Software Engineer"
            timeAgo="12 hours ago"
            employmentType="Full Time"
            locationType="Remote"
            salaryRange="$100,000 - $120,000"
            location="San Francisco, CA"
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Find a team mate
          </h2>
          <p className="text-xl font-light text-foreground">
            Join a team looking for a new member.
          </p>
          <Button variant={"link"} asChild className="text-lg p-0">
            <Link prefetch="viewport" to="/teams">
              Explore all teams &rarr;
            </Link>
          </Button>
        </div>
        {Array.from({ length: 6 }).map((_, index) => (
          <TeamCard
            key={index}
            id={`teamId-${index}`}
            username="seongbae"
            avatarUrl="https://github.com/seongbae15.png"
            avatarFallback="SB"
            roles={["AI Engineer", "Backend Engineer", "Product Manager"]}
            projectDescription="a new interactive media platform"
          />
        ))}
      </div>
    </div>
  );
}
