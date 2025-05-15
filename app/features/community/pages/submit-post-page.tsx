import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-post-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Post | iMake" }];
};

export default function SubmitPostPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Discussion"
        description="Share your thoughts and ideas with the community."
      />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputPair
          label="Title"
          name="title"
          type="text"
          required
          id="title"
          description="(40 characters or less"
          placeholder="i.e What is the best productivity tool?"
        />
        <SelectPair
          required
          label="Category"
          name="category"
          description="Select a category that best fits your discussion."
          placeholder="i.e Productivity"
          options={[
            { label: "Productivity", value: "productivity" },
            { label: "Design", value: "design" },
            { label: "Programming", value: "programming" },
          ]}
        />
        <InputPair
          label="Content"
          name="content"
          textArea
          required
          id="content"
          description="(1000 characters or less"
          placeholder="i.e I'm looking for a tool that can help me manage my time and tasks. What are the best tools out there?"
        />
        <Button className="mx-auto">Create Discussion</Button>
      </Form>
    </div>
  );
}
