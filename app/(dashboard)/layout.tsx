// DashboardLayout.tsx

"use client"; // Mark this component as a Client Component

import { Footer } from "@/components/global/footer";
import { Header } from "@/components/global/header";
import { Toaster } from "@/components/ui/sonner";
import TrailingCursor from "@/components/ui/TrailingCursor"; // Ensure the path is correct

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full mx-auto min-h-screen max-w-screen-2xl">
        <Header />
        <Toaster />
        <main className="flex-grow px-3 lg:px-14">
          {children} {/* Render the child components */}
        </main>
        <Footer />
      </div>
      <TrailingCursor /> {/* Include the custom cursor */}
    </div>
  );
};

export default DashboardLayout;
