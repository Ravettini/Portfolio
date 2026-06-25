import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ravettini.com"),
  title: {
    default: "Ignacio Ravettini Novellino | Desarrollador Web Full Stack",
    template: "%s | Ignacio Ravettini",
  },
  description:
    "Desarrollador web full stack y creador de software. Aplicaciones web modernas, productos digitales y plataformas en producción. Buenos Aires, Argentina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E9E6W9EV5G"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-E9E6W9EV5G');
            `,
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} font-sans min-h-screen w-full min-w-full bg-[#05070a] text-white/90 antialiased`}>
        <div className="noise-overlay" aria-hidden />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
