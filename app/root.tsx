import { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { scan } from "react-scan";
import type { Route } from "./+types/root";
import { CountdownBanner } from "./components/banner";
import "./styles/app.css";

const ORIGIN = "https://hocvnu.pages.dev";

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/logo.svg",
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },

  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

export const meta: Route.MetaFunction = () => [
  {
    title: "HocVNU",
  },
  {
    name: "description",
    content:
      "HocVNU - Nơi sinh viên VNU cùng chia sẻ tài liệu, đề thi và kinh nghiệm học tập.",
  },
  {
    name: "author",
    content: "betothewizard",
  },
  {
    name: "keywords",
    content:
      "HocVNU, VNU, ĐHQGHN, UET, tài liệu UET, Đại học Quốc gia Hà Nội, tài liệu VNU, đề thi VNU, trắc nghiệm, nhà nước và pháp luật, ôn tập đại cương, học VNU, sinh viên VNU, tài liệu học tập, chia sẻ đề thi",
  },
  {
    name: "robots",
    content:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  {
    name: "google-adsense-account",
    content: "ca-pub-2669549342761819",
  },
  {
    name: "language",
    content: "Vietnamese",
  },
  {
    name: "revisit-after",
    content: "7 days",
  },
  {
    property: "og:locale",
    content: "vi_VN",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const canonicalUrl =
    ORIGIN +
    (location.pathname.endsWith("/")
      ? location.pathname
      : location.pathname + "/");

  useEffect(() => {
    if (import.meta.env.DEV) scan({ enabled: true });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HocVNU",
    url: ORIGIN,
    description:
      "Nền tảng chia sẻ tài liệu, đề thi và kinh nghiệm học tập cho sinh viên Đại học Quốc gia Hà Nội.",
    sameAs: [ORIGIN],
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: "betothewizard",
    },
  };

  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:url" content="https://hocvnu.pages.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="HocVNU" />
        <meta
          property="og:title"
          content="HocVNU - Nơi sinh viên VNU cùng chia sẻ tài liệu, đề thi và kinh nghiệm học tập"
        />
        <meta
          property="og:description"
          content="Nền tảng học tập cho sinh viên Đại học Quốc gia Hà Nội."
        />
        <meta property="og:image" content="https://hocvnu.pages.dev/logo.svg" />
        <meta property="og:image:alt" content="HocVNU Logo" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="hocvnu.pages.dev" />
        <meta property="twitter:url" content="https://hocvnu.pages.dev" />
        <meta
          name="twitter:title"
          content="HocVNU - Nơi sinh viên VNU cùng chia sẻ tài liệu, đề thi và kinh nghiệm học tập"
        />
        <meta
          name="twitter:description"
          content="Nền tảng học tập cho sinh viên Đại học Quốc gia Hà Nội. Tìm tài liệu, đề thi, ôn tập trắc nghiệm miễn phí."
        />
        <meta
          name="twitter:image"
          content="https://hocvnu.pages.dev/logo.svg"
        />

        <meta name="theme-color" content="#f7b136" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HocVNU" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <Meta />
        <Links />
      </head>
      <body>
        <CountdownBanner />
        <div className="texture" />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
