'use client'

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// Create client with the actual URL
const convex = convexUrl 
  ? new ConvexReactClient(convexUrl)
  : null;

// Wrapper component that provides auth to Convex
function ConvexWithClerk({ children }: { children: ReactNode }) {
  if (!convex) {
    return <>{children}</>;
  }
  
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export function ConvexClerkProvider({ children }: { children: ReactNode }) {
  // If Convex is not configured, just render children without Convex
  if (!convex) {
    console.warn('Convex URL not configured, skipping ConvexProvider');
    return <>{children}</>;
  }

  return <ConvexWithClerk>{children}</ConvexWithClerk>;
}

export { convex };
