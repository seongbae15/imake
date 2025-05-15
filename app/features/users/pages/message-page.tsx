import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Message | iMake" }];
};

function MessagePage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">Message</h1>
      <div className="grid gap-6">{/* Message content goes here */}</div>
    </div>
  );
}

export default MessagePage;
