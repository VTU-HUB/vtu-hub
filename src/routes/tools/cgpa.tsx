import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/tools/ToolPage";
import { CgpaCalculator } from "@/components/tools/calculators";
import { pageHead } from "@/lib/seo";
import { tools } from "@/data/tools";

const tool = tools.find((t) => t.slug === "cgpa")!;

export const Route = createFileRoute("/tools/cgpa")({
  head: () =>
    pageHead({
      title: tool.name,
      description: tool.description,
      path: tool.href,
    }),
  component: () => (
    <ToolPage slug="cgpa">
      <CgpaCalculator />
    </ToolPage>
  ),
});
