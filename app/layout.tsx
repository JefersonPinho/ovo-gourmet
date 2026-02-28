import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { playfair, inter } from "@/lib/fonts";
import "./globals.css";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Ovo de Colher Gourmet - Monte o Seu",
  description:
    "Monte seu Ovo de Colher personalizado com os melhores ingredientes. Escolha tamanho, casca, recheio e coberturas. Encomende pelo WhatsApp!",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#3B2A26",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-serif antialiased bg-background text-foreground">
        {children}
        <Analytics />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
