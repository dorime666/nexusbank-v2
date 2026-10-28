import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Bank | Personal Account Portal",
  description: "Nexus Bank Personal Financial Dashboard & Asset Transfer Service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B1020] text-white antialiased selection:bg-[#8275FF] selection:text-white">
        <main className="max-w-md mx-auto min-h-screen bg-[#0B1020] flex flex-col px-4 py-3 shadow-2xl relative border-x border-white/5">
          {children}
        </main>
      </body>
    </html>
  );
}