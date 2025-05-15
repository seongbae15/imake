import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "My Ideas | iMake" }];
};

export default function DashboardIdeasPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">My Ideas</h1>
      <div className="grid gap-6">{/* Ideas go here */}</div>
    </div>
  );
}
