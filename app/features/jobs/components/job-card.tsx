import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Badge } from "../../../common/components/ui/badge";

interface JobCardProps {
  id: string;
  companyName: string;
  companyLogo: string;
  title: string;
  timeAgo: string;
  employmentType: string;
  locationType: string;
  salaryRange: string;
  location: string;
}

export function JobCard({
  id,
  companyName,
  companyLogo,
  title,
  timeAgo,
  employmentType,
  locationType,
  salaryRange,
  location,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent transition-colors hover:bg-card/50">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={companyLogo}
              alt={`${companyName} logo`}
              className="size-10 rounded-full"
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{companyName}</span>
              <span className="text-sm text-muted-foreground">{timeAgo}</span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">{employmentType}</Badge>
          <Badge variant="outline" className="ml-2">
            {locationType}
          </Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              {salaryRange}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {location}
            </span>
          </div>
          <Button variant="secondary" size="sm">
            Apply now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
