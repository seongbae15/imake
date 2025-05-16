import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Posts | iMake" }];
};

export default function ProfilePostsPage({ params }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <PostCard
          key={`postId-${index}`}
          id={`postId-${index}`}
          title="What is the best productivity tool?"
          author="Noru"
          avatarUrl="https://github.com/seongbae15.png"
          category="Productivity"
          timeAgo="12 hours ago"
          expanded
        />
      ))}
    </div>
  );
}
