import "./globals.css";
import { Montserrat } from "next/font/google";
import ScrollbarVisibility from "./scrollbar-visibility";
import IntroAnimation from "./intro-animation";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata = {
  title: "Your Name | BSIT Portfolio",
  description:
    "Portfolio of an incoming 4th year BSIT student — languages, frameworks, projects, skills, and achievements.",
};

export const viewport = {
  themeColor: "#f4f6f2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        {children}
        <ScrollbarVisibility />
        <IntroAnimation />
      </body>
    </html>
  );
}
