import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import PageLoader from '@/components/PageLoader';
import FloatingDecoration from '@/components/FloatingDecoration';
import ChatbotWidget from '@/components/ChatbotWidget';
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FloatingDecoration />
        <PageLoader>
          {children}
          <ChatbotWidget />
        </PageLoader>

        <BackToTop />
      </body>
    </html>
  );
}