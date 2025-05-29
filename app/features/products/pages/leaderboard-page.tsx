import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/leaderboard-page";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { DateTime } from "luxon";
import { getProductByDateRange } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Leaderboard | iMake" },
    { name: "description", content: "View the product leaderboards." },
  ];
};

export const loader = async () => {
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] =
    await Promise.all([
      getProductByDateRange({
        startDate: DateTime.now().startOf("day"),
        endDate: DateTime.now().endOf("day"),
        limit: 7,
      }),
      getProductByDateRange({
        startDate: DateTime.now().startOf("week"),
        endDate: DateTime.now().endOf("week"),
        limit: 7,
      }),
      getProductByDateRange({
        startDate: DateTime.now().startOf("month"),
        endDate: DateTime.now().endOf("month"),
        limit: 7,
      }),
      getProductByDateRange({
        startDate: DateTime.now().startOf("year"),
        endDate: DateTime.now().endOf("year"),
        limit: 7,
      }),
    ]);
  return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  const today = DateTime.now().setZone("Asia/Seoul");
  const dailyPath = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
  const weeklyPath = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
  const monthlyPath = `/products/leaderboards/monthly/${today.year}/${today.month}`;
  const yearlyPath = `/products/leaderboards/yearly/${today.year}`;

  return (
    <div className="space-y-20">
      <Hero
        title="Leaderboards"
        description="The most popular products on imake."
      />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Daily Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on imake by day.
          </p>
        </div>
        {loaderData.dailyProducts.map((product) => (
          <ProductCard
            key={product.product_id.toString()}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
        <Button variant={"link"} asChild className="text-lg p-0 self-center">
          <Link to={dailyPath}>Explore all products &rarr;</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Weekly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on imake by week.
          </p>
        </div>
        {loaderData.weeklyProducts.map((product) => (
          <ProductCard
            key={product.product_id.toString()}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
        <Button variant={"link"} asChild className="text-lg p-0 self-center">
          <Link to={weeklyPath}>Explore all products &rarr;</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Montly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on imake by month.
          </p>
        </div>
        {loaderData.monthlyProducts.map((product) => (
          <ProductCard
            key={product.product_id.toString()}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
        <Button variant={"link"} asChild className="text-lg p-0 self-center">
          <Link to={monthlyPath}>Explore all products &rarr;</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Yearly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on imake by year.
          </p>
        </div>
        {loaderData.yearlyProducts.map((product) => (
          <ProductCard
            key={product.product_id.toString()}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
        <Button variant={"link"} asChild className="text-lg p-0 self-center">
          <Link to={yearlyPath}>Explore all products &rarr;</Link>
        </Button>
      </div>
    </div>
  );
}
