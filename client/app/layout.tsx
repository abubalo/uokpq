import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "UOKPQ",
  description: "Effortlessly find past questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${roboto.variable} font-sans`}>
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
