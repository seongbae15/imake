import type { MetaFunction } from "react-router";
import type { Route } from "./+types/app/features/products/pages/submit-page";
import type { Router } from "@react-router/dev/routes";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  // Handle submission logic here
  console.log("Product submitted");
  return { success: true };
}

export const meta: MetaFunction<Route.MetaArgs> = ({ data }) => {
  return [
    { title: "Submit Product Page" },
    { name: "description", content: "Submit a new product." },
  ];
};

export default function SubmitPage({
  loaderData,
  actionData,
}: Router.ComponentProps<Route.Return>) {
  return (
    <div>
      <h1>Submit Product Page</h1>
      {/* Add submission form here */}
      {actionData?.success && <p>Product submitted successfully!</p>}
    </div>
  );
}
