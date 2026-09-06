import { createFileRoute } from "@tanstack/react-router";
import { UpdateTypePage } from "@/components/content/UpdateTypePage";

export const Route = createFileRoute("/updates/results")({
  head: () => UpdateTypePage.head("results"),
  component: () => <UpdateTypePage type="results" />,
});
