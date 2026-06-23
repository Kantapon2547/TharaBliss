import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import PageLoader from '@/components/PageLoader';
import FloatingDecoration from '@/components/FloatingDecoration';
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Thara Bliss — Aroma Balm Collection",
  description:
    "บาล์มอโรมาสัญชาติไทย ผสานกลิ่นหอมอย่างอ่อนโยน ช่วยให้ใจสงบ สดชื่น และผ่อนคลายอย่างเป็นธรรมชาติ",
  openGraph: {
    title: "Thara Bliss",
    description: "Calm. Balance. Bliss.",
    siteName: "Thara Bliss",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       <FloatingDecoration />
       <PageLoader>
        {children}
      </PageLoader>
        <BackToTop />
      </body>
    </html>
  );
}