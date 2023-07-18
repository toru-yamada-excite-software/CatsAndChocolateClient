import ThemeRegistry from "@/components/Theme/ThemeRegistry/ThemeRegistry";
import * as React from "react";

export const metadata = {
  title: "ちょこっとキャッチョコ🐈🍫",
  description: "ちょこっとキャッチョコ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
