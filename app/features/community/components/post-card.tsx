import { Link } from "react-router";
import { Card, CardFooter, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../common/components/ui/avatar";

interface PostCardProps {
  postId: string;
  avatarSrc: string;
  title: string;
  author: string;
  category: string;
  timeAgo: string;
}

export function PostCard({ postId, avatarSrc, title, author, category, timeAgo }: PostCardProps) {
  return (
    <Link to={`/community/${postId}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className="size-14">
            <AvatarFallback>N</AvatarFallback>
            <AvatarImage src={avatarSrc} />
          </Avatar>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold leading-non tracking-tight">{title}</CardTitle>
            <div className="flex gap-2 text-xs leading-tight text-muted-foreground">
              <span>{author} on</span>
              <span>{category}</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button variant="link" asChild>
            <Link to={`/community/${postId}`}>Reply &rarr;</Link>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}