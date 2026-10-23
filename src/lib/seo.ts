import { absUrl, SITE_NAME } from "@/lib/site";

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  keywords?: string;
}) {
  const title = opts.title.includes(SITE_NAME) ? opts.title : `${opts.title} · ${SITE_NAME}`;
  const url = absUrl(opts.path);
  return {
    meta: [
      { title },
      { name: "description", content: opts.description },
      {
        name: "robots",
        content: opts.noindex ? "noindex,follow" : "index,follow",
      },
      ...(opts.keywords ? [{ name: "keywords", content: opts.keywords }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
