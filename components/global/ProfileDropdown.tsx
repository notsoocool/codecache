"use client"

import { useUser, useClerk } from "@clerk/nextjs"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react"

export function ProfileDropdown() {
  const { user, isSignedIn } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const [isOpen, setIsOpen] = useState(false)

  if (!isSignedIn || !user) return null

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
            <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 p-0 bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-lg" 
        align="end" 
        forceMount
      >
        <div className="flex flex-col items-center gap-2 p-6 pb-4 bg-zinc-800/50 min-h-44">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
            <AvatarFallback className="text-3xl">{user.firstName?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">{user.fullName}</p>
            <p className="text-sm text-zinc-400">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <div className="p-2">
          <DropdownMenuItem 
            onClick={() => openUserProfile()}
            className="cursor-pointer py-3 px-4 focus:bg-zinc-800 focus:text-zinc-100 rounded-md transition-colors"
          >
            <User className="mr-3 h-4 w-4" />
            <span className="font-medium">Manage account</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => signOut()}
            className="cursor-pointer py-3 px-4 text-red-400 focus:bg-red-500/20 focus:text-red-300 rounded-md transition-colors mt-1"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="font-medium">Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}