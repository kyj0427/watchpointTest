import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
    display: "swap",
});

export const borda = localFont({
    src: [
        {
            path: "../assets/fonts/Borda_Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../assets/fonts/Borda.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../assets/fonts/Borda_Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../assets/fonts/Borda_DemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../assets/fonts/Borda_Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../assets/fonts/Borda_ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
    ],
    variable: "--font-borda",
    display: "swap",
});
