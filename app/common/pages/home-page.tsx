import type { Route } from "../../+types/routes";
import type { MetaFunction } from "@remix-run/react";

export function HomePage({}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">Welcome Home</h1>
    </main>
  );
}