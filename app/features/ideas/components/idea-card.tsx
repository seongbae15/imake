import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface IdeaCardProps {
  id: number;
  title: string;
  views: number;
  timeAgo: string;
  likes: number;
  claimed?: boolean;
}

export function IdeaCard({
  id,
  title,
  views,
  timeAgo,
  likes,
  claimed,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl">
          <span
            className={cn(
              claimed
                ? "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground"
                : ""
            )}
          >
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center text-sm">
        <div className="flex items-center gap-1">
          <EyeIcon className="w-4 h-4" />
          <span>{views}</span>
        </div>
        <DotIcon className="w-4 h-4" />
        <span>{DateTime.fromISO(timeAgo).toRelative()}</span>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">
          <HeartIcon className="w-4 h-4" />
          <span>{likes}</span>
        </Button>
        {!claimed ? (
          <Button asChild>
            <Link to={`/ideas/${id}`}>Claim idea now &rarr;</Link>
          </Button>
        ) : (
          <Button variant={"outline"} disabled>
            <LockIcon className="w-4 h-4" />
            Claimed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
