"use client";

import { useRouter, usePathname } from "next/navigation";
import { animatePageOut } from "@/utils/animations";
import { Button } from "@/components/ui/button";

interface Props {
  href: string;
  label: string;
}

const TransitionLink = ({ href, label }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };
  // return <Button onClick={handleClick}>{label}</Button>;
  return (
    <Button
      key={href}
      onClick={handleClick}
      variant={href === pathname ? "secondary" : "ghost"}
      className="w-full justify-start"
    >
      {label}
    </Button>
  );
};

export default TransitionLink;
