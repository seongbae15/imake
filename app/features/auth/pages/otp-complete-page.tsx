import { Form } from "react-router";
import type { Route } from "./+types/otp-complete-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
export const meta: Route.MetaFunction = () => {
  return [{ title: "Verfiy OTP | iMake" }];
};

export default function OtpPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Confirm OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the OTP code sent to your email address.
          </p>
        </div>
        <Form className="w-full space-y-4">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          <InputPair
            label="OTP"
            description="Enter the OTP you received"
            name="otp"
            type="text"
            id="otp"
            required
            placeholder="i.e 1234"
          />
          <Button className="w-full" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
}
