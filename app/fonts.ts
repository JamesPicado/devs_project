import localFont from "next/font/local";

export const geist = localFont({
  src: [
    {
      path: "./fonts/Geist-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/Geist-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-geist",
});
