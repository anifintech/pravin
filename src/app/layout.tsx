import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PravinService – Doorstep Appliance Repair in Chennai",
  description:
    "Expert washing machine, refrigerator & dishwasher repair at your doorstep in Chennai. Same-day service, transparent pricing & 90-day warranty. Call +91 98765 43210.",
  keywords:
    "washing machine repair Chennai, refrigerator repair Chennai, dishwasher repair Chennai, doorstep appliance service Chennai",
  openGraph: {
    title: "PravinService – Doorstep Appliance Repair in Chennai",
    description:
      "Same-day doorstep appliance repair by certified technicians across Chennai.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { borderRadius: "12px", fontWeight: 600 },
            success: { style: { background: "#059669", color: "white" } },
            error: { style: { background: "#dc2626", color: "white" } },
          }}
        />
      </body>
    </html>
  );
}
