import { Link } from "react-router";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../common/components/ui/avatar";
import { Button } from "../../../common/components/ui/button";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  avatarUrl: string;
  category: string;
  timeAgo: string;
  expanded?: boolean;
  voteCount?: number;
}

export function PostCard({
  id,
  title,
  author,
  avatarUrl,
  category,
  timeAgo,
  expanded = false,
  voteCount = 0,
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`} className="block">
      <Card
        className={cn(
          "bg-transparent hover:bg-card/50 transition-colors",
          expanded ? "flex flex-row items-center justify-between" : ""
        )}
      >
        <CardHeader className="flex flex-row items-center gap-2 w-full">
          <Avatar className="size-14">
            <AvatarFallback>{author}</AvatarFallback>
            <AvatarImage src={avatarUrl} />
          </Avatar>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
              {title}
            </CardTitle>
            <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
              <span>{author}</span>
              <span>{category}</span>
              <DotIcon className="w-4 h-4" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className="flex justify-end">
            <Button variant={"secondary"}>Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className="flex justify-end pb-0">
            <Button variant={"outline"} className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{voteCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
