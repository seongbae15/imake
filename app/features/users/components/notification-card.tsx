import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EyeIcon } from "lucide-react";
import { Link, useFetcher } from "react-router";
import { Avatar } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  avatarUrl?: string;
  avatarFallback?: string;
  userName: string;
  type: "follow" | "review" | "reply";
  timeStamp: string;
  seen: boolean;
  productName?: string;
  payloadId?: number;
  postTitle?: string;
  id: number;
}
export function NotificationCard({
  type,
  avatarUrl,
  avatarFallback,
  userName,
  timeStamp,
  seen,
  productName,
  postTitle,
  payloadId,
  id,
}: NotificationCardProps) {
  const getMessage = (type: "follow" | "review" | "reply") => {
    switch (type) {
      case "follow":
        return " followed you.";
      case "review":
        return " reviewed your product: ";
      case "reply":
        return " replied to your post: ";
    }
  };
  const fetcher = useFetcher();
  const optimiscitSeen = fetcher.state === "idle" ? seen : true;
  return (
    <Card
      className={cn("min-w-[450px]", optimiscitSeen ? "" : "bg-yellow-500/60")}
    >
      <CardHeader className="flex flex-row gap-5 space-y-0 items-start">
        <Avatar className="">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg space-y-0 font-bold">
            <span>{userName}</span>
            <span>{getMessage(type)}</span>
            {productName && (
              <Button variant={"ghost"} asChild className="text-lg">
                <Link to={`/products/${payloadId}`}>{productName}</Link>
              </Button>
            )}
            {postTitle && (
              <Button variant={"ghost"} asChild className="text-lg">
                <Link to={`/community/${payloadId}`}>{postTitle}</Link>
              </Button>
            )}
          </CardTitle>
          <small className="text-muted-foreground text-sm">{timeStamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        {optimiscitSeen ? null : (
          <fetcher.Form method="post" action={`/my/notifications/${id}/see`}>
            <Button variant={"outline"} size="icon">
              <EyeIcon className="h-4 w-4" />
            </Button>
          </fetcher.Form>
        )}
      </CardFooter>
    </Card>
  );
}
