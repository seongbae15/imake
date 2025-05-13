import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";

interface ReviewCardProps {
  author: {
    name: string;
    avatarUrl?: string;
    avatarFallback: string;
  };
  rating: number;
  content: string;
  createdAt: string;
}

export function ReviewCard({
  author,
  rating,
  content,
  createdAt,
}: ReviewCardProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{author.avatarFallback}</AvatarFallback>
          {author.avatarUrl && <AvatarImage src={author.avatarUrl} />}
        </Avatar>
        <div>
          <h4 className="text-lg font-bold">{author.name}</h4>
          <p className="text-sm text-muted-foreground"></p>
        </div>
      </div>
      <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon className="size-4" fill="currentColor" key={index} />
        ))}
      </div>
      <p>{content}</p>
      <span className="text-xs text-muted-foreground">{createdAt}</span>
    </div>
  );
}
