import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
    href: string;
    label: string;
    isActive: boolean;
};

export const NavButton = ({ href, label, isActive }: Props) => {   
    return (
        <Button
            asChild
            size="sm"
            variant="outline"
            className={cn(
                "w-full lg:w-auto justify-between font-normal hover:bg-foreground/20 hover:text-foreground border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-foreground focus:bg-foreground/30 transition",
                isActive ? "bg-foreground/10 text-foreground": "bg-transparent",
            )}>
            <Link href={href}>
            {label}
            </Link>
        </Button>
    );
}
