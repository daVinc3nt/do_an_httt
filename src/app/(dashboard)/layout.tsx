import { Inter } from "next/font/google";
import "../globals.css";
import { Roboto } from "next/font/google";
import { SessionProvider } from "@/providers/SessionProvider";
import { Toaster, toast } from 'sonner'
import { ReactNode } from "react";
import Head from "next/head";
import Wrapper from "@/components/LayoutWrapper";
const inter = Inter({ subsets: ["latin"] });
const punycode = require('punycode/');

// export const metadata: Metadata = {
// 	title: "Engonow",
// 	description: "Create by Alpha Solutions",
// };
const roboto = Roboto({
	weight: ["300", "400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});
type Props = {
	children: ReactNode;
	params: {locale: string};
  };

export default async function RootLayout({
	children,
	params: {locale}
  }: Props) {
	// Enable static rendering

	// Providing all messages to the client
	// side is the easiest way to get started
  
	return (
		<html className={roboto.className} lang={locale}>
			<Head>
				<meta property="og:url" content="https://study.engonow.com"/>
				<meta property="og:image" content="https://study.engonow.com/opengraph-image.png" />
				<meta property="og:image:type" content="<generated>" />
				<meta property="og:image:width" content="<generated>" />
				<meta property="og:image:height" content="<generated>" />
			</Head>
			<body className="no-scrollbar hide-scrollbar">
				<Toaster closeButton  expand={false} richColors position="top-center" />
				<Wrapper>
				{children}
				</Wrapper>
			</body>
		</html>
	);
}