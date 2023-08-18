import "./globals.css";
import { Inter } from "next/font/google";
import Loading from "./loading";
import React, { Suspense } from "react";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Climate Risk Dashboard",
    description: "Assessing the impact of climate change on Canadian businesses...",
    imageUrl: "/background.png",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <Head>
            <meta property="og:image" content={metadata.imageUrl} />
            <meta name="twitter:image" content={metadata.imageUrl} />
            <title>{metadata.title}</title>
        </Head>
        <body className={inter.className}>
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
        </body>
        </html>
    );
}
