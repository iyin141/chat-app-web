import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import LoadingScreen from "./dashboard/components/LoadingScreen/Load";
import { AuthProvider } from "@/features/auth/components/AuthProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ChatBox",
  description: "Enjoy easy and secure communication with ChatBox, your go-to platform for seamless messaging.",
};

const geistSans = Geist({
  variable: "--font-geist",
  display: "swap",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${jetbrainsMono.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${geistSans.className} antialiased`}>
       <AuthProvider>
         <div className='absolute z-50'>
           <LoadingScreen />
         </div>
         {children}
       </AuthProvider>
      </body>
    </html>
  );
}
