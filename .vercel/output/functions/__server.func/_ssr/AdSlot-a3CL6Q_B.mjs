import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as cn } from "./PageHeader-Cp-Jp2C5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdSlot-a3CL6Q_B.js
var import_jsx_runtime = require_jsx_runtime();
var adsConfig = {
	enabled: false,
	showPlaceholders: false,
	clientId: ""
};
var adSizes = {
	banner: {
		width: 728,
		height: 90,
		label: "Leaderboard"
	},
	"in-article": {
		width: 300,
		height: 250,
		label: "In-article"
	},
	sidebar: {
		width: 300,
		height: 250,
		label: "Sidebar"
	},
	mobile: {
		width: 320,
		height: 100,
		label: "Mobile"
	}
};
function AdSlot({ format, className }) {
	if (!adsConfig.enabled && !adsConfig.showPlaceholders) return null;
	const size = adSizes[format];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		"aria-label": "Advertisement",
		className: cn("ad-slot my-8 flex", className),
		style: { minHeight: size.height },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] font-medium uppercase tracking-[0.14em] text-faint",
			children: "Advertisement"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 text-xs text-faint",
			children: adsConfig.enabled ? size.label : "Reserved placement · ads off"
		})]
	});
}
function AdBanner(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
		format: "banner",
		className: cn("hidden md:flex", props.className)
	});
}
function AdInArticle(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
		format: "in-article",
		className: props.className
	});
}
function AdMobile(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
		format: "mobile",
		className: cn("flex md:hidden", props.className)
	});
}
//#endregion
export { AdInArticle as n, AdMobile as r, AdBanner as t };
