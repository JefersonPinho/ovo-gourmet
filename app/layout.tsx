import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { playfair, inter } from "@/lib/fonts";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://ovo-gourmet.vercel.app"),

  title: {
    default: "Ovo de Colher Gourmet - Monte o Seu",
    template: "%s | Ovo de Colher Gourmet",
  },

  description:
    "Monte seu Ovo de Colher personalizado com os melhores ingredientes. Escolha tamanho, casca, recheio e coberturas. Encomende pelo WhatsApp!",

  keywords: [
    "ovo de colher",
    "ovo de páscoa gourmet",
    "ovo personalizado",
    "doces artesanais",
    "páscoa",
    "sobremesas",
    "ovo de colher delivery",
  ],

  openGraph: {
    title: "Ovo de Colher Gourmet - Monte o Seu",
    description:
      "Crie seu ovo de colher do jeito que quiser 🍫 Personalize e peça pelo WhatsApp!",
    url: "https://ovo-gourmet.vercel.app/",
    siteName: "Ovo de Colher Gourmet",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ovo de Colher Gourmet",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ovo de Colher Gourmet",
    description:
      "Monte seu ovo de colher personalizado com ingredientes incríveis!",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "food",
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
