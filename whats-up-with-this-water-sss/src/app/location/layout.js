import "@sass/styles.scss";
import LocationHeader from "@/components/LocationHeader";
import Link from "next/link";

export const metadata = {
	title: "What-R",
	description: "Water resolution",
};

export default function LocationLayout({ children }) {
	return (
		<>
			<Link href={"/"} className={"home"}><h3>Home</h3></Link>
			<LocationHeader />
			<>{children}</>
		</>
	);
}
