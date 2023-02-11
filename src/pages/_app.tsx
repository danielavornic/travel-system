import { useState } from "react";
import { Inter, Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import cn from "classnames";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
  dehydratedState: unknown;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <div className={cn(inter.className, poppins.className)}>
            <Component {...pageProps} />
          </div>
        </SessionContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
