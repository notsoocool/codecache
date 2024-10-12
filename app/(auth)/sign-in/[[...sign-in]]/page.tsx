import { SignIn } from "@clerk/nextjs";
import { ClerkProvider } from '@clerk/nextjs';
export default function Page() {
	return (
		<div className="flex justify-center py-24">
			<SignIn path="/sign-in" />
		</div>
	);
}
