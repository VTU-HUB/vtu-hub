import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/tools/ToolPage";
import { MarksCalculator } from "@/components/tools/calculators";
import { pageHead } from "@/lib/seo";
import { tools } from "@/data/tools";

const tool = tools.find((t) => t.slug === "marks")!;

export const Route = createFileRoute("/tools/marks")({
  head: () =>
    pageHead({
      title: tool.name,
      description: tool.description,
      path: tool.href,
    }),
  component: () => (
    <ToolPage slug="marks">
      <MarksCalculator />
    </ToolPage>
  ),
});
