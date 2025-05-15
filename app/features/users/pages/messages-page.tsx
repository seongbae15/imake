import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Messages | iMake" }];
};

function MessagesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">Messages</h1>
      <div className="grid gap-6">{/* Messages content goes here */}</div>
    </div>
  );
}

export default MessagesPage;
