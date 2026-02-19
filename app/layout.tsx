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
  title: "Ignacio Ravettini Novellino | Data Analyst | Web Developer",
  description:
    "Analista de datos y Desarrollador Web. Interfaces modernas, análisis de datos para la toma de decisiones, contenido educativo. Buenos Aires, Argentina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${plusJakarta.variable} font-sans min-h-screen w-full min-w-full bg-[#05070a] text-white/90 antialiased`}>
        <div className="noise-overlay" aria-hidden />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
