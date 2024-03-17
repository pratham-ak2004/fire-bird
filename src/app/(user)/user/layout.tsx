import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "~/app/_components/theme-provider";

export const metadata = {
  title: "Fire Bird",
  description: "A Mailing service Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function UserLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
      <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCReactProvider>
        <SpeedInsights />
        {children}
      </TRPCReactProvider>
    </ThemeProvider></body>
    </html>
    );
  }
  