import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { CartProvider } from "./context/CartContext.js";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <body className="min-h-screen flex flex-col">
        
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1  bg-[#eef6f0]">
                {children}
              </main>
              <Footer />
            </CartProvider>
          </AuthProvider>
          <Toaster position="top-right" />
        
      </body>

    </html>
  );
}
