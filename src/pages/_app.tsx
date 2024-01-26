import "@/styles/globals.css";
import "@/styles/typography.css";

import type { AppProps } from "next/app";
import NextThemeProvider from "@/components/next-theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <ClerkProvider {...pageProps}>
        <QueryClientProvider client={queryClient}>
          <NextThemeProvider defaultTheme="dark">
            <Navbar />
            <Component {...pageProps} />
            <Toaster />
          </NextThemeProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </>
  );
}
