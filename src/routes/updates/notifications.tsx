import { createFileRoute } from "@tanstack/react-router";
import { UpdateTypePage } from "@/components/content/UpdateTypePage";

export const Route = createFileRoute("/updates/notifications")({
  head: () =>
    UpdateTypePage.head("notification"),
  component: () => <UpdateTypePage type="notification" />,
});
