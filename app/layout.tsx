
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQuery } from "@/src/components/utils/reactquery/ReactQuery";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi Tiendita",
  description: "Lo que necesitas en un solo lugar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
   
      <body className="min-h-full flex flex-col dark:text-black">
        
        <ReactQuery>

          {children}
        </ReactQuery>
        <ToastContainer
          position="top-right"
          autoClose={3000} // cierra automáticamente en 3s
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
        />


      </body>
    </html>
  );
}
