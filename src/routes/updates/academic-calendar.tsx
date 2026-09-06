import { createFileRoute } from "@tanstack/react-router";
import { UpdateTypePage } from "@/components/content/UpdateTypePage";

export const Route = createFileRoute("/updates/academic-calendar")({
  head: () => UpdateTypePage.head("academic-calendar"),
  component: () => <UpdateTypePage type="academic-calendar" />,
});
