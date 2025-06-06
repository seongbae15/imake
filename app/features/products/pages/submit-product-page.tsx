import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-product-page";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { getCategories } from "../queries";
import { createProduct } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | iMake" },
    { name: "description", content: "Submit a new product." },
  ];
};

const formSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(1),
  howItWorks: z.string().min(1),
  category: z.coerce.number(),
  icon: z.instanceof(File).refine((file) => {
    return file.size <= 10485760 && file.type.startsWith("image/");
  }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { data, success, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { icon, ...rest } = data;
  const { data: uploadData, error: uploadError } = await client.storage
    .from("icons")
    .upload(`${userId}/${Date.now()}`, icon, {
      contentType: icon.type,
      upsert: false,
    });
  if (uploadError) {
    return { formErrors: { icon: ["Failed to upload icon"] } };
  }
  const {
    data: { publicUrl },
  } = await client.storage.from("icons").getPublicUrl(uploadData.path);
  const productId = await createProduct(client, {
    name: rest.name,
    tagline: rest.tagline,
    description: rest.description,
    howItWork: rest.howItWorks,
    url: rest.url,
    iconUrl: publicUrl,
    categoryId: rest.category,
    userId,
  });
  return redirect(`/products/${productId}`);
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const categories = await getCategories(client);
  return { categories };
};

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [icon, setIcon] = useState<string | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setIcon(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <Hero
        title="Submit Your Product"
        description="Share your product with the world"
      />
      <Form
        className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"
        method="post"
        encType="multipart/form-data"
      >
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="This is the name of your product"
            id="name"
            name="name"
            required
            type="text"
            placeholder="Name of your product"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.name && (
              <p className="text-red-500">{actionData.formErrors.name}</p>
            )}
          <InputPair
            label="TagLine"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="A concise description of your product"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.tagline && (
              <p className="text-red-500">{actionData.formErrors.tagline}</p>
            )}
          <InputPair
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            required
            type="url"
            placeholder="https://example.com"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.url && (
              <p className="text-red-500">{actionData.formErrors.url}</p>
            )}
          <InputPair
            textArea
            label="Description"
            description="A detailed description of your product"
            id="description"
            name="description"
            required
            placeholder="A detailed description of your product"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.description && (
              <p className="text-red-500">
                {actionData.formErrors.description}
              </p>
            )}
          <InputPair
            textArea
            label="How it works"
            description="A detailed description of how your product works"
            id="howItWorks"
            name="howItWorks"
            required
            placeholder="A detailed description of how your product works"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.howItWorks && (
              <p className="text-red-500">{actionData.formErrors.howItWorks}</p>
            )}
          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={loaderData.categories.map((category) => ({
              label: category.name,
              value: category.category_id.toString(),
            }))}
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.category && (
              <p className="text-red-500">{actionData.formErrors.category}</p>
            )}

          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="flex flex-col gap-1 items-baseline">
            Icon
            <small className="text-muted-foreground">
              This is the icon of your product.
            </small>
          </Label>
          <Input
            type="file"
            className="w-1/2"
            onChange={onChange}
            required
            name="icon"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.icon && (
              <p className="text-red-500">{actionData.formErrors.icon}</p>
            )}

          <div className="flex flex-col text-xs">
            <span className="text-muted-foreground">
              Recommended size: 128x128px
            </span>
            <span className="text-muted-foreground">
              Allowed formats: PNG, JPEG
            </span>
            <span className="text-muted-foreground">Max file size: 1MB</span>
          </div>
          <div className="size-40 rounded-xl shadow-xl overflow-hidden">
            {icon ? (
              <img src={icon} className="object-cover w-full h-full" />
            ) : null}
          </div>
        </div>
      </Form>
    </div>
  );
}
