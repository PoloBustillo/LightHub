import Nav from "@/components/Nav";

import { Footer } from "@/components/Footer";
import PageWraper from "@/components/PageWraper";

export default function RootLayout({ children }) {
  return (
    <>
      <Nav></Nav>
      <PageWraper>{children}</PageWraper>
      <Footer></Footer>
    </>
  );
}
