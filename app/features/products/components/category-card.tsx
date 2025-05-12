import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
}

export function CategoryCard({ title, description, href }: CategoryCardProps) {
  return (
    <Link to={href} className="block">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {title} <ChevronRightIcon className="size-6" />
          </CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
