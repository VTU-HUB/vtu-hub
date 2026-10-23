import { adsConfig, adSizes, type AdFormat } from "@/data/ads";
import { cn } from "@/lib/utils";

export function AdSlot({ format, className }: { format: AdFormat; className?: string }) {
  if (!adsConfig.enabled && !adsConfig.showPlaceholders) return null;
  const size = adSizes[format];
  return (
    <aside
      aria-label="Advertisement"
      className={cn("ad-slot my-8 flex", className)}
      style={{ minHeight: size.height }}
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
        Advertisement
      </span>
      <span className="mt-1 text-xs text-faint">
        {adsConfig.enabled ? size.label : "Reserved placement · ads off"}
      </span>
    </aside>
  );
}

export function AdBanner(props: { className?: string }) {
  return <AdSlot format="banner" className={cn("hidden md:flex", props.className)} />;
}

export function AdInArticle(props: { className?: string }) {
  return <AdSlot format="in-article" className={props.className} />;
}

export function AdMobile(props: { className?: string }) {
  return <AdSlot format="mobile" className={cn("flex md:hidden", props.className)} />;
}
