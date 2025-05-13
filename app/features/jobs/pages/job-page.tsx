import type { Route } from "./+types/jobs-page";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "Job Details",
    },
  ];
};

export default function JobPage() {
  return (
    <div>
      <h1>Job Detail</h1>
    </div>
  );
}
