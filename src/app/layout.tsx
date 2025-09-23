import { Inter } from "next/font/google";
import "./globals.css";
import { PlanetsProvider } from "@/context/PlanetsContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <PlanetsProvider>{children}</PlanetsProvider>
      </body>
    </html>
  );
}
