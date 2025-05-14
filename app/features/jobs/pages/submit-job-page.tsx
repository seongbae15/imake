import { Form } from "react-router";
import type { Route } from "./+types/submit-job-page";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants";
import { Button } from "~/common/components/ui/button";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Post a Job | iMake" },
    {
      name: "description",
      content: "Reach out to the best developers in the world",
    },
  ];
};

export default function SubmitJobPage() {
  return (
    <div>
      <Hero title="Post a Job" description="Reach out to the best developers in the world" />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair label="Position" description="(40 characters max)" name="position"  maxLength={40} type="text" id="position" required placeholder="i.e Seniro React Developer"/>
          <InputPair label="Overview" description="(400 characters max)" name="overview"  maxLength={400} type="text" id="overview" required placeholder="i.e We are looging for a Senior React Developer" textArea />
          <InputPair label="Responsibilities" description="(400 characters max)" name="responsibilities"  maxLength={400} type="text" id="responsibilities" required placeholder="i.e Implement new features, Maintain code quality, etc" textArea />
          <InputPair label="Qualifications" description="(400 characters max)" name="qualifications"  maxLength={400} type="text" id="qualifications" required placeholder="i.e 3+ years of experience, Strong TypeScript skills, etc." textArea />
          <InputPair label="Benefits" description="(400 characters max)" name="benefits"  maxLength={400} type="text" id="benefits" required placeholder="i.e Flexible wroking hours, Health insurance, etc." textArea />
          <InputPair label="Skills" description="(400 characters max)" name="skills"  maxLength={400} type="text" id="skills" required placeholder="i.e React, TypeScript, etc." textArea />
          <InputPair label="Company Name" description="(40 characters max)" name="compnayName"  maxLength={40} type="text" id="compnayName" required placeholder="i.e imake"/>
          <InputPair label="Compnay Logo URL" description="(40 characters max)" name="companyLogoUrl"  maxLength={40} type="url" id="companyLogoUrl" required placeholder="i.e https://wemake.services/logo.png"/>
          <InputPair label="Company Location" description="(40 characters max)" name="companyLocation"  maxLength={40} type="text" id="companyLocation" required placeholder="i.e REmote, New York, etc."/>
          <InputPair label="Apply URL" description="(40 characters max)" name="applyUrl"  maxLength={40} type="url" id="applyUrl" required placeholder="i.e https://wemake.services/apply"/>
          <SelectPair label="Job Type" description="Select the type of the job" name="jobType" required placeholder="Select the location of the job" options={JOB_TYPES.map((type) => ({ label: type.label, value: type.value }))} />
          <SelectPair label="Job Location" description="Select the location of the job" name="jobLocation" required placeholder="Select the location of the job" options={LOCATION_TYPES.map((location) => ({ label: location.label, value: location.value }))} />
          <SelectPair label="Salary Range" description="Select the salary range of the job" name="salarayRange" required placeholder="Select the salary range of the job" options={SALARY_RANGE.map((salary) => ({ label: salary, value: salary }))} />
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
