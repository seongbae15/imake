import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/login-page";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | iMake" }];
};

export default function LoginPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-bold text-center">
          Log in to your account
        </h1>
        <Form className="w-full space-y-4">
          <InputPair
            label="email"
            description="Enter your email address"
            name="email"
            type="email"
            required
            id="email"
            placeholder="i.e wekmake@example.com"
          />
          <InputPair
            label="password"
            description="Enter your password"
            name="password"
            type="password"
            required
            id="password"
            placeholder="i.e *********"
          />
          <Button className="w-full" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
}
