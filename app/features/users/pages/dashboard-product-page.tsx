import type { Route } from "./+types/dashboard-product-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Product Dashboard | iMake" }];
};
function DashboardProductPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">Product Dashboard</h1>
      <div className="grid gap-6">
        {/* Product dashboard content goes here */}
      </div>
    </div>
  );
}

export default DashboardProductPage;
