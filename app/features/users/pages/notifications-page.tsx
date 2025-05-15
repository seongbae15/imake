import type { Route } from "./+types/notifications-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Notifications | iMake" }];
};

function NotificationsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
      <div className="grid gap-6">{/* Notifications content goes here */}</div>
    </div>
  );
}

export default NotificationsPage;
