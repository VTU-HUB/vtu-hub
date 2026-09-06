import { createFileRoute } from "@tanstack/react-router";
import { UpdateTypePage } from "@/components/content/UpdateTypePage";

export const Route = createFileRoute("/updates/exam-timetable")({
  head: () => UpdateTypePage.head("exam-timetable"),
  component: () => <UpdateTypePage type="exam-timetable" />,
});
