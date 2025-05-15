import { MessageCircleIcon } from "lucide-react";
import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Message | iMake" }];
};

function MessagePage() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <MessageCircleIcon className="size-12 text-muted-foreground" />
      <h1 className="text-xl text-muted-freground font-semibold">
        Click on a message in the sidebar to view it.
      </h1>
    </div>
  );
}

export default MessagePage;
