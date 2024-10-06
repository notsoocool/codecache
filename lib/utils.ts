import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//  Automatically adjusts the height of a textarea based on its content.

export function autoGrow(ref: React.RefObject<HTMLTextAreaElement>) {
  if (ref.current) {
    const { current } = ref;
    current.style.height = "auto"; 
    current.style.height = `${current.scrollHeight}px`; 
  } else {
    console.warn("autoGrow: ref is not set or current is null");
  }
}
