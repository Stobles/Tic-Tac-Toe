import { PropsWithChildren } from "react";

export function RootLayout({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}
