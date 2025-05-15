import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile | iMake" }];
};

function ProfilePage() {
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          I'm a ML engineer based on South Korea. I like to research SOTA AI and
          develope AI Applications.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">
          I'm a ML engineer based on South Korea. I like to research SOTA AI and
          develope AI Applications. I
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
