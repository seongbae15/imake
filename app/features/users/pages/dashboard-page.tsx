import type { Route } from "./+types/dashboard-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Dashboard | iMake" }];
};

function DashboardPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid gap-6">{/* Dashboard content goes here */}</div>
    </div>
  );
}

export default DashboardPage;
