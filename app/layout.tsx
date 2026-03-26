import type { Metadata } from "next";
import { Providers } from "@/app/providers/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "MG Pay - Admin Dashboard",
  description: "Payment Gateway Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 dark:bg-gray-950 transition-colors">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
