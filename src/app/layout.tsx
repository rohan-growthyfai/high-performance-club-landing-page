import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-serif-accent",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://highperformanceclub.co"),
  icons: {
    icon: "/hpc-logo.png",
    shortcut: "/hpc-logo.png",
    apple: "/hpc-logo.png",
  },
  title: "7 Tiny High Performance Habits in 7 Days | Free WhatsApp Challenge",
  description:
    "Free 7-day WhatsApp challenge. One science-backed habit per day, 5 minutes each. Built for Indians 25–45 who keep starting and quitting habits.",
  keywords: [
    "high performance lifestyle",
    "free 7 day challenge",
    "whatsapp habit challenge",
    "energy habits India",
    "lifestyle habits",
    "daily habits",
    "morning routine",
  ],
  openGraph: {
    title: "7 Tiny High Performance Habits | Free 7-Day Challenge",
    description:
      "One small habit per day. 5 minutes each. Delivered on WhatsApp. Free.",
    type: "website",
    locale: "en_IN",
    url: "https://highperformanceclub.co",
    siteName: "High Performance Club",
    images: [
      {
        url: "/og-challenge.png",
        width: 1200,
        height: 630,
        alt: "FREE 7-Day WhatsApp Habits Challenge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "7 Tiny High Performance Habits | Free 7-Day Challenge",
    description: "One habit a day. 5 minutes each. WhatsApp. Free.",
    images: ["/og-challenge.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const GA_ID = "G-CCHH667SF4";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        {/* Viewport — prevents pinch zoom, ensures full-width mobile layout */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="f8hrst14oxakqq9m922edch69zqmxd" />

        {/* Meta Pixel Base Code — beforeInteractive ensures fbq is ready before any events fire */}
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1305545364547179');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{display:"none"}}
            src="https://www.facebook.com/tr?id=1305545364547179&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
            });
          `}
        </Script>

        {/* Microsoft Clarity — session recordings + heatmaps */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x3ogdyj813");
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
