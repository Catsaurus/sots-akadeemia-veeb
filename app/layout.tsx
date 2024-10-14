import "./globals.css";

import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import localFont from 'next/font/local'
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import ReactDOM from "react-dom";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: '--font-unbounded',
});

const helvetica = localFont({
  variable: '--font-helvetica',
  src: [
    {
      path: './../public/fonts/HelveticaNeueThin.otf',
      weight: '300',
      style: 'Light'
    },
    {
      path: './../public/fonts/HelveticaNeueRegular.otf',
      weight: '400',
      style: 'Regular'
    },
    {
      path: './../public/fonts/HelveticaNeueRoman.otf',
      weight: '500',
      style: 'Roman'
    },
    {
      path: './../public/fonts/HelveticaNeue-Bold.woff',
      weight: '600',
      style: 'Bold'
    }
  ]
})

export const metadata: Metadata = {
  title: "Sotsiaaltöö Akadeemia",
  description: "Sotsiaaltöö Akadeemia veebileht",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ReactDOM.preload('/static/bg-image.webp', { as: 'image' })
  return (
    <html lang="et">
      <body className={`${unbounded.variable} ${helvetica.variable}`}>
      <SpeedInsights/>
      <Analytics/>
        {draftMode().isEnabled && (
          <a
            className="fixed right-0 bottom-0 bg-blue-500 text-white p-4 m-4"
            href="/api/draft-mode/disable"
          >
            Disable preview mode
          </a>
        )}
        {children}
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
