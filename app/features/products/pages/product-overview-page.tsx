import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-overview-page";
import { useOutletContext } from "react-router";
import { string } from "zod";

export default function ProductOverviewPage() {
  const { description, how_it_works } = useOutletContext<{
    description: string;
    how_it_works: string;
  }>();
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">What is this products?</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold">How does it work?</h3>
        <p className="text-muted-foreground">{how_it_works}</p>
      </div>
    </div>
  );
}
