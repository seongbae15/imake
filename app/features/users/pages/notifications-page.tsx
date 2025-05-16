import { NotificationCard } from "../components/notification-card";
import type { Route } from "./+types/notifications-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Notifications | iMake" }];
};

function NotificationsPage() {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        <NotificationCard
          avatarUrl="https://github.com/seongbae15.png"
          avatarFallback="SB"
          userName="Seongbae"
          message=" followed you."
          timeStamp="2 days ago"
          seen={false}
        />
      </div>
    </div>
  );
}

export default NotificationsPage;
