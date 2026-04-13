import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "./context/CartContext.js";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </AuthProvider>
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}
