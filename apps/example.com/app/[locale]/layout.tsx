import "./styles.css";

import type { ReactNode } from "react";

import { DesignSystemProvider } from "@repo/design-system";
import { fonts } from "@repo/design-system/lib/fonts";
import { cn } from "@repo/design-system/lib/utils";

// import { getDictionary } from "@repo/internationalization";

type RootLayoutProperties = {
  readonly children: ReactNode;
  // readonly params: Promise<{
  //   locale: string;
  // }>;
};

const RootLayout = async ({ children }: RootLayoutProperties) => {
  // const { locale } = await params;
  // const dictionary = await getDictionary(locale);

  return (
    <html
      lang="en"
      className={cn(fonts, "scroll-smooth")}
      suppressHydrationWarning
    >
      <body>
        <DesignSystemProvider>{children}</DesignSystemProvider>
      </body>
    </html>
  );
};

export default RootLayout;
