import { Footer } from "@/components/global/footer";
import { Header } from "@/components/global/header";
import { Toaster } from "@/components/ui/sonner";

type Props = {
	children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<main className=" px-3 lg:px-14">{children}</main>
			<Toaster />
            <Footer />
		</>
	);
};

export default DashboardLayout;
