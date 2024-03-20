import "~/styles/globals.css";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "~/app/_components/theme-provider";

import NavBar from "~/app/_components/main-contents/nav-bar";
import Footer from "~/app/_components/main-contents/footer";

export const metadata = {
  title: "Fire Bird",
  description: "A Mailing service Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
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
            <NavBar />
            {children}
            <Footer />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}