export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN || "https://fit-escargot-95.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};