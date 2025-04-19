"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import { store } from './../redux/store';
import { Provider } from "react-redux";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <AuthProvider>
            <Navbar/>
          {children}
          <Footer/>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
