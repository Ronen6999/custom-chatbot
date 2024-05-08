import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const BOT_NAME = process.env.NEXT_PUBLIC_BOT_NAME || 'Chatbot';
export const metadata: Metadata = {
  title: `${BOT_NAME} Bot`,
  description: `I am ${BOT_NAME} your personal chatbot.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
