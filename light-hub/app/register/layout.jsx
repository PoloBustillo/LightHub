import { APP_NAME, APP_DESCRIPTION } from "@/utils/constants";

export const metadata = {
  title: { APP_NAME },
  description: { APP_DESCRIPTION },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
