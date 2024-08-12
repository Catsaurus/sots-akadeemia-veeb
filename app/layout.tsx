import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";


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
    <html lang="en">
      <body className={`${unbounded.variable} ${helvetica.variable}`}>
        {children}
      </body>
    </html>
  );
}
