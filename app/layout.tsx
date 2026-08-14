import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barışın Küçük Büyük Kitabı",
  description: "6–12 yaş için Montessori yaklaşımına dayalı, yedi senaryolu interaktif çatışma çözümü kitapçığı.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="tr"><body>{children}</body></html>;
}
