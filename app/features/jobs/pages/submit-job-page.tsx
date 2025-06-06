import { Form, redirect } from "react-router";
import type { Route } from "./+types/submit-job-page";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createJob } from "../mutations";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Post a Job | iMake" },
    {
      name: "description",
      content: "Reach out to the best developers in the world",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  position: z.string().max(40),
  overview: z.string().max(400),
  responsibilities: z.string().max(400),
  qualifications: z.string().max(400),
  benefits: z.string().max(400),
  skills: z.string().max(400),
  compnayName: z.string().max(40),
  companyLogoUrl: z.string().max(40),
  companyLocation: z.string().max(40),
  applyUrl: z.string().max(40),
  jobType: z.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]]),
  jobLocation: z.enum(
    LOCATION_TYPES.map((type) => type.value) as [string, ...string[]]
  ),
  salarayRange: z.enum(SALARY_RANGE),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  const { job_id } = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
};

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title="Post a Job"
        description="Reach out to the best developers in the world"
      />
      <Form
        className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto"
        method="post"
      >
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            id="position"
            required
            defaultValue="Seniro React Developer"
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.position}</p>
          )}
          <InputPair
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            id="overview"
            required
            defaultValue="We are looging for a Senior React Developer"
            textArea
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.overview}</p>
          )}
          <InputPair
            label="Responsibilities"
            description="(400 characters max)"
            name="responsibilities"
            maxLength={400}
            type="text"
            id="responsibilities"
            required
            defaultValue="Implement new features, Maintain code quality, etc"
            textArea
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.responsibilities}
            </p>
          )}

          <InputPair
            label="Qualifications"
            description="(400 characters max)"
            name="qualifications"
            maxLength={400}
            type="text"
            id="qualifications"
            required
            defaultValue="3+ years of experience, Strong TypeScript skills, etc."
            textArea
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.qualifications}
            </p>
          )}

          <InputPair
            label="Benefits"
            description="(400 characters max)"
            name="benefits"
            maxLength={400}
            type="text"
            id="benefits"
            required
            defaultValue="Flexible wroking hours, Health insurance, etc."
            textArea
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.benefits}</p>
          )}

          <InputPair
            label="Skills"
            description="(400 characters max)"
            name="skills"
            maxLength={400}
            type="text"
            id="skills"
            required
            defaultValue="React, TypeScript, etc."
            textArea
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.skills}</p>
          )}

          <InputPair
            label="Company Name"
            description="(40 characters max)"
            name="compnayName"
            maxLength={40}
            type="text"
            id="compnayName"
            required
            defaultValue="imake"
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.compnayName}</p>
          )}

          <InputPair
            label="Compnay Logo URL"
            description="(40 characters max)"
            name="companyLogoUrl"
            maxLength={40}
            type="url"
            id="companyLogoUrl"
            required
            defaultValue="https://wemake.services/logo.png"
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.companyLogoUrl}
            </p>
          )}

          <InputPair
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            id="companyLocation"
            required
            defaultValue="Remote, New York, etc."
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.companyLocation}
            </p>
          )}

          <InputPair
            label="Apply URL"
            description="(40 characters max)"
            name="applyUrl"
            maxLength={40}
            type="url"
            id="applyUrl"
            required
            defaultValue="https://wemake.services/apply"
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.applyUrl}</p>
          )}

          <SelectPair
            label="Job Type"
            description="Select the type of the job"
            name="jobType"
            required
            placeholder="Select the location of the job"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.jobType}</p>
          )}

          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="jobLocation"
            required
            placeholder="Select the location of the job"
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
          />
          <SelectPair
            label="Salary Range"
            description="Select the salary range of the job"
            name="salarayRange"
            required
            placeholder="Select the salary range of the job"
            options={SALARY_RANGE.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
          {actionData && "filedErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.salarayRange}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
