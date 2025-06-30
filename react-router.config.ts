import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: ["/", "/tai-lieu", "/trac-nghiem"],
} satisfies Config;
