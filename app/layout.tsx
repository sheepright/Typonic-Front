import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const name = "TYPONIC";
const title = "TYPONIC, 개발자들을 위한 타자연습 플랫폼";
const description = "대학생 개발자들이 모여서 만든 AI를 활용한 타자연습 플랫폼";

export async function generateMetadata(): Promise<Metadata> {
  return {
    applicationName: name,
    title: name,
    description: description,

    icons: {
      icon: "/favicon.ico",
    },

    openGraph: {
      type: "website",
      siteName: name,
      title: title,
      description: description,
      url: "https://typonic.co.kr/",
      images: [
        {
          url: "https://typonic.co.kr/images/TYPONIC_Service.png",
          width: 470,
          height: 170,
          alt: "TYPONIC Service",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },

    verification: {
      other: {
        "naver-site-verification": process.env.naverKey || "",
        "google-site-verification": process.env.googleKey || "",
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
