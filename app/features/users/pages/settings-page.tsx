import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserById } from "../queries";
import { z } from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Settings | iMake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });
  return { user };
};

const formSchema = z.object({
  name: z.string().min(3),
  role: z.string(),
  headline: z.string().optional().default(""),
  bio: z.string().optional().default(""),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");
  if (avatar && avatar instanceof File) {
    if (avatar.size <= 10485760 && avatar.type.startsWith("image/")) {
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: false,
        });
      console.log(error);
      if (error) {
        return { formErrors: { avatar: ["Failed to upload avatar"] } };
      }
      const {
        data: { publicUrl },
      } = await client.storage.from("avatars").getPublicUrl(data.path);
      await updateUserAvatar(client, {
        id: userId,
        avatarUrl: publicUrl,
      });
    } else {
      return { formErrors: { avatar: ["Invalid file size or type"] } };
    }
  } else {
    const { success, error, data } = formSchema.safeParse(
      Object.fromEntries(formData)
    );
    if (!success) {
      return { formErrors: error.flatten().fieldErrors };
    }
    const { name, role, headline, bio } = data;
    await updateUser(client, {
      id: userId,
      name,
      role: role as
        | "developer"
        | "designer"
        | "marketer"
        | "founder"
        | "product-manager",
      headline,
      bio,
    });
    return {
      ok: true,
    };
  }
};

function SettingsPage({ loaderData, actionData }: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          {actionData?.ok ? (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your profile has been updated.
              </AlertDescription>
            </Alert>
          ) : null}
          <h2 className="text-2xl font-semibold">Edit profile</h2>
          <Form className="flex flex-col w-1/2 gpa-5" method="post">
            <InputPair
              label="Name"
              description="Your public name"
              required
              id="name"
              defaultValue={loaderData.user.name}
              name="name"
              placeholder="John Doe"
            />
            {actionData?.formErrors && "name" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.name?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <SelectPair
              label="Role"
              description="What do you do identify the most with"
              name="role"
              placeholder="Select a role"
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Product Manager", value: "product-manager" },
                { label: "Founder", value: "founder" },
                { label: "Marketer", value: "marketer" },
              ]}
              defaultValue={loaderData.user.role}
            />
            {actionData?.formErrors && "role" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.role?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label="Headline"
              description="An introduction to your profile"
              required
              defaultValue={loaderData.user.headline ?? ""}
              id="headline"
              name="headline"
              placeholder="John Doe"
              textArea
            />
            {actionData?.formErrors && "headline" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.headline?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label="Bio"
              description="Your public bio. It will be displayed on your profile page."
              id="bio"
              name="bio"
              required
              defaultValue={loaderData.user.bio ?? ""}
              placeholder="John Doe"
              textArea
            />
            {actionData?.formErrors && "bio" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.bio?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}

            <Button className="w-full">Update Profile</Button>
          </Form>
        </div>
        <Form
          className="col-span-2 p-6 rounded-lg border shadow-md"
          method="post"
          encType="multipart/form-data"
        >
          <Label className="flex flex-col gap-1">
            Avatar
            <small className="text-muted-foreground">
              This is your public avatar.
            </small>
          </Label>
          <div className="space-y-5 flex flex-col items-center">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="object-cover w-full h-full"
                />
              ) : null}
            </div>
            <Input
              type="file"
              className="w-full"
              onChange={onChange}
              required
              name="avatar"
            />
            <div className="flex flex-col text-xs">
              <span className="text-muted-foreground">
                Recommended size: 128x128px
              </span>
              <span className="text-muted-foreground">
                Allowed formats: PNG, JPEG
              </span>
              <span className="text-muted-foreground">Max file size: 1MB</span>
            </div>
            <Button className="w-full">Update Avatar</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SettingsPage;
