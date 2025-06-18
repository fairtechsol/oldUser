import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://1f29fd6555e2162c0b53079331d0c033@o4509513470181376.ingest.de.sentry.io/4509513474572368", // Replace with your Sentry DSN
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
