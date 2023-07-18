import AuthProvider from "@/components/AuthPovider";
import Header from "@/components/Header";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import ToastContainerProvider from "@/providers/ToastsContainerProvider";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import SessionLoader from "@/components/SessionLoader";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Posts App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SessionLoader>
            <ToastContainerProvider />
            <RegisterModal />
            <LoginModal />
            <Header />
            {children}
          </SessionLoader>
        </AuthProvider>
      </body>
    </html>
  );
}
