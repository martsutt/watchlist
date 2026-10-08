import "./globals.css";

export const metadata = {
  title: "Watchlist",
  description: "My movie watchlist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}