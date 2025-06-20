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
  owner?: boolean;
  views?: number;
  timeAgo?: string;
  likes?: number;
  claimed?: boolean;
}

export function IdeaCard({
  id,
  title,
  owner,
  views,
  timeAgo,
  likes,
  claimed,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <Link to={claimed || owner ? "" : `/ideas/${id}`}>
          <CardTitle className="text-xl">
            <span
              className={cn(
                claimed
                  ? "bg-muted-foreground break-all selection:bg-muted-foreground text-muted-foreground"
                  : ""
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      {owner ? null : (
        <CardContent className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>{views}</span>
          </div>
          <DotIcon className="w-4 h-4" />
          {timeAgo ? (
            <span>{DateTime.fromISO(timeAgo).toRelative()}</span>
          ) : null}
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2">
        {!claimed && !owner ? (
          <>
            <Button variant="outline">
              <HeartIcon className="w-4 h-4" />
              <span>{likes}</span>
            </Button>
            <Button asChild>
              <Link to={`/ideas/${id}`}>Claim idea now &rarr;</Link>
            </Button>
          </>
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
