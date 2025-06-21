import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/root";
import "./styles/app.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://cdn.indieboosting.com/latest/style.css",
  },
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/favicon.ico",
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
    name: "description",
    content:
      "Ôn tập môn học Nhà nước và pháp luật đại cương (ĐHQGHN) với 80+ câu hỏi trắc nghiệm được sưu tầm.",
  },
  {
    name: "author",
    content: "betothewizard",
  },
  {
    name: "keywords",
    content:
      "vnu, nhà nước và pháp luật, đại học quốc gia, ôn tập, trắc nghiệm, dhqghn",
  },
  {
    name: "google-adsense-account",
    content: "ca-pub-2669549342761819",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:url" content="https://hocvnu.pages.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="HocVNU - Học Luật Mê Say" />
        <meta
          property="og:description"
          content="Ôn tập môn học Nhà nước và pháp luật đại cương"
        />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="hocvnu.pages.dev" />
        <meta property="twitter:url" content="https://hocvnu.pages.dev" />
        <meta name="twitter:title" content="HocVNU - Học Luật Mê Say" />
        <meta
          name="twitter:description"
          content="Ôn tập môn học Nhà nước và pháp luật đại cương"
        />
        <meta name="twitter:image" content="" />
        <title>HocVNU</title>
        <Meta />
        <Links />
      </head>
      <body>
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
