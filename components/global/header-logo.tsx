import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
	return (
		<Link href="/">
			<div className=" items-center hidden lg:flex">
				<Image src="/logo.svg" alt="Logo" width={30} height={30} className=" invert-0 dark:invert"/>
				<p className="font-semibold text-2xl ml-2.5">CodeCache</p>
			</div>
		</Link>
	);
};
