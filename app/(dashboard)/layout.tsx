import { Footer } from "@/components/global/footer";
import { Header } from "@/components/global/header";

type Props = {
	children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<main className=" px-3 lg:px-14">{children}</main>
			<Footer />
		</>
	);
};

export default DashboardLayout;
