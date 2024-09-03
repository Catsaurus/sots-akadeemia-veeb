import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";


const unbounded = Unbounded({
  subsets: ["latin"],
  variable: '--font-unbounded',
}

);
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
    },

  ]
})

export const metadata: Metadata = {
  title: "Sotsiaaltöö akadeemia",
  description: "Sotsiaaltöö akadeemia veebileht",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et">
      <body className={`${unbounded.variable} ${helvetica.variable}`}>
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
