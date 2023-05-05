import { useState } from "react";
import { type AppType } from "next/dist/shared/lib/utils";
import {
  type DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "@/styles/globals.css";

const MyApp: AppType<{
  dehydratedState: DehydratedState;
}> = ({ Component, pageProps: { dehydratedState, ...pageProps } }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
