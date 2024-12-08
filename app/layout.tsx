import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GlobalProvider } from "@/context/GlobalContext";
import { NotificationProvider } from "@/context/NotificationContext";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Śledzenie wydatków",
    description: "Test123",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlobalProvider>
            <NotificationProvider>
                {children}
            </NotificationProvider>
        </GlobalProvider>
        </div>
    );
}
