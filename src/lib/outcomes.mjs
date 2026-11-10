/**
 * VTU syllabus PDFs repeat a teaching instruction under "Course outcomes".
 * It is not an outcome. Real outcomes that merely mention the real world stay.
 */
export function isPedagogyOutcome(text) {
  return /how every concept can be applied to the real world/i.test(text)
    || /helps improve the students?' understanding/i.test(text)
    || /succeeding classes/i.test(text)
    || /hav(e|ing) discussions on the topic/i.test(text);
}
