import type { Metadata } from "next";
import { borda, poppins } from "@/config/fonts";
import "@/assets/styles/app.scss";
import { NavBar, ScrollToTop } from "@/components/ui";
import { Footer } from "@/components/shared";
import AOSInit from "@/lib/aos/AOSInit";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "GameCo",
  description:
    "GameCo is your ultimate destination for the latest games, reviews, and exclusive gaming deals. Join the community and level up your experience!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${borda.variable} ${poppins.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <NavBar />
          <div className="app-layout">
            {children}
            <Footer />
          </div>
          <ScrollToTop />
          <AOSInit />
        </Suspense>
      </body>
    </html>
  );
}
