import "./globals.css";
import { Bevan, Francois_One, Inter, Lora } from "next/font/google";
import Nav from "@/components/Nav";
import { Providers } from "./providers";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { APP_NAME, APP_DESCRIPTION } from "@/utils/constants";
const inter = Inter({ subsets: ["latin"] });

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-lora",
  display: "swap",
});
const bevan = Bevan({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bevan",
  display: "swap",
});
const francois = Francois_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-francois_one",
  display: "swap",
});

// Font files can be colocated inside of `pages`
const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});
export const metadata = {
  title: { APP_NAME },
  description: { APP_DESCRIPTION },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={[
        inter.variable,
        lora.variable,
        calSans.variable,
        bevan.variable,
        francois.variable,
      ].join(" ")}
    >
      <body>
        <Providers>
          <Nav></Nav>
          {/* <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={300}
          /> */}{" "}
          {children}
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
