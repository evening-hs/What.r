import "@sass/styles.scss";

export const metadata = {
	title: "What-R",
	description: "Water resolution",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>{children}<img className={"background-img"} src="/aesthetic-ocean.gif" /></body>
		</html>
	);
}
