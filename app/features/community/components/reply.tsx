import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Form, Link } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  username: string;
  avatarUrl: string;
  timestamp: string;
  content: string;
  topLevel: boolean;
}

export function Reply({
  username,
  avatarUrl,
  timestamp,
  content,
  topLevel,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => {
    setReplying((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-5 w-2/3">
        <Avatar className="size-4">
          <AvatarFallback>{username[0]}</AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div className="flex flex-col gap-2 items-start">
          <div className="flex gap-2 items-center">
            <Link to={`/users/@${username}`}>
              <h4 className="font-medium">{username}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          <p className="text-muted-foreground">{content}</p>
          <Button
            variant={"ghost"}
            className="self-end"
            onClick={toggleReplying}
          >
            <MessageCircleIcon className="size-4" />
            Reply
          </Button>
        </div>
      </div>
      {replying && (
        <Form className="flex items-start gap-5 w-3/4">
          <Avatar className="size-4">
            <AvatarFallback>N</AvatarFallback>
            <AvatarImage src="https://github.com/seongbae15.png" />
          </Avatar>
          <div className="flex flex-col gap-5 items-end w-full">
            <Textarea
              placeholder="Write a reply..."
              className="w-full resize-none"
              rows={5}
            />
            <Button>Reply</Button>
          </div>
        </Form>
      )}
      {topLevel && (
        <div className="pl-20 w-full">
          <Reply
            username="seongbae"
            avatarUrl="https://github.com/seongbae15.png"
            content="I've been using Todoist for a while now, and I love it! It's simple and effective."
            timestamp="2 hours ago"
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
