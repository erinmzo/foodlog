import QueryProvider from "@/queries/QueryProvider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  console.log("1");
  return <QueryProvider>{children}</QueryProvider>;
}

export default ProviderLayout;
