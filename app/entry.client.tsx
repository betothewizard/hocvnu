import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import posthog from "posthog-js";

function PosthogInit() {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") return;
		posthog.init("phc_rDr7ms2lMzoAKExPSCsPYWVLN9FiEPTPLwkv8hcEJEi", {
			api_host: "https://us.i.posthog.com",
			person_profiles: "identified_only",
		});
	}, []);

	return null;
}

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<HydratedRouter />
			<PosthogInit />
		</StrictMode>,
	);
});
