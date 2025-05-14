import type { Route } from "./+types/post-page";

export const meta: Route.MetaFunction = ({ params }) => {
  return [{ title: `${params.postId} | iMake` }];
};

export default function PostPage() {
  return <div></div>;
}
