import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/tools/ToolPage";
import { PercentageCalculator } from "@/components/tools/calculators";
import { pageHead } from "@/lib/seo";
import { tools } from "@/data/tools";

const tool = tools.find((t) => t.slug === "percentage")!;

export const Route = createFileRoute("/tools/percentage")({
  head: () =>
    pageHead({
      title: tool.name,
      description: tool.description,
      path: tool.href,
    }),
  component: () => (
    <ToolPage slug="percentage">
      <PercentageCalculator />
    </ToolPage>
  ),
});
