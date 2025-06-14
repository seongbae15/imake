import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: "https://23ae5d261e8006855b192077c11ba42d@o4509497234685952.ingest.us.sentry.io/4509497239470080",
  
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
