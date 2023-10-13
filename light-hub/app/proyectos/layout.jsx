import "../globals.css";

import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { APP_NAME, APP_DESCRIPTION } from "@/utils/constants";

export const metadata = {
  title: { APP_NAME },
  description: { APP_DESCRIPTION },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Nav></Nav>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
