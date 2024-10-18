import { Footer } from "@/components/global/footer";
import { Header } from "@/components/global/header";
import { Toaster } from "@/components/ui/sonner";

type Props = {
	children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
	return (
		<div className=" flex justify-center">
			<div className="flex flex-col w-full mx-auto min-h-screen max-w-screen-2xl">
				<Header />
				<Toaster />
				<main className="flex-grow px-3 lg:px-14">{children}</main>
				<Footer />
			</div>
		</div>
	);
};

export default DashboardLayout;
