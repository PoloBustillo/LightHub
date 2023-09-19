import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import { Providers } from "./providers";
import { Lora } from "next/font/google";
import { Footer } from "@/components/Footer";
import { APP_NAME, APP_DESCRIPTION } from "@/utils/contants";
import Particles from "@/components/Particles";
const inter = Inter({ subsets: ["latin"] });

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata = {
  title: { APP_NAME },
  description: { APP_DESCRIPTION },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <Providers>
          <Nav></Nav>

          <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={300}
          />

          {children}
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
