import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/tools/ToolPage";
import { AttendanceCalculator } from "@/components/tools/calculators";
import { pageHead } from "@/lib/seo";
import { tools } from "@/data/tools";

const tool = tools.find((t) => t.slug === "attendance")!;

export const Route = createFileRoute("/tools/attendance")({
  head: () =>
    pageHead({
      title: tool.name,
      description: tool.description,
      path: tool.href,
    }),
  component: () => (
    <ToolPage slug="attendance">
      <AttendanceCalculator />
    </ToolPage>
  ),
});
