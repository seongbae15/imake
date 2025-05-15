import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "User Profile | iMake" }];
};

function ProfilePage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">User Profile</h1>
      <div className="grid gap-6">{/* User profile content goes here */}</div>
    </div>
  );
}

export default ProfilePage;
