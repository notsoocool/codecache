"use client";
import { Footer } from "@/components/global/footer";
import { Header } from "@/components/global/header";
import { Toaster } from "@/components/ui/sonner";
import ProgressBar from "@/components/ui/scroll-progress";
type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className=" flex justify-center">
      <div className="flex flex-col w-full mx-auto min-h-screen max-w-screen-2xl">
        <Header />
        <Toaster />
        <ProgressBar />
        <main className="flex-grow px-3 lg:px-14">{children}</main>
        <Footer />
      </div>
      <style jsx global>{`
        /* Hide scrollbars in Webkit browsers (Chrome, Safari, etc.) */
        ::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbars in Firefox */
        html {
          scrollbar-width: none;
        }

        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
