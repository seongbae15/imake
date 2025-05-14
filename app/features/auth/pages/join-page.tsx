import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/join-page";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Join | iMake" }];
};

export default function JoinPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            label="Name"
            description="Enter your name"
            name="name"
            type="text"
            required
            id="name"
            placeholder="Enter your name"
          />
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            type="email"
            required
            id="email"
            placeholder="i.e wekmake@example.com"
          />
          <InputPair
            label="Password"
            description="Enter your password"
            name="password"
            type="password"
            required
            id="password"
            placeholder="Enter your password"
          />
          <Button className="w-full" type="submit">
            Join
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
