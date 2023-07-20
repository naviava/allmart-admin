import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Providers.
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/providers/modal-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Allmart Admin Dashboard",
  description: "Administrative dashboard for Allmart store.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
