import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "+LIFE Health OS",
  description: "Personal health assistant — premium health intelligence dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-gray-100 font-sans">
        {children}
      </body>
    </html>
  );
}
