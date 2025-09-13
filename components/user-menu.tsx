"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Settings, LogOut, BarChart3, Users, FileText, Shield, Bell } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface UserMenuProps {
  user: any
  onLogout?: () => void
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      // Clear user session
      signOut()

      // Trigger logout callback if provided
      if (onLogout) {
        onLogout()
      }

      // Small delay for better UX
      setTimeout(() => {
        router.push("/")
      }, 500)
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-transparent hover:bg-primary/10 transition-all duration-300 hover:scale-105 border-sidebar-border"
        >
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline font-medium">{user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground mt-1">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">Status</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="space-y-1">
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center cursor-pointer">
              <BarChart3 className="mr-3 h-4 w-4 text-primary" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/clients" className="flex items-center cursor-pointer">
              <Users className="mr-3 h-4 w-4 text-primary" />
              <span>Clients</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/reports" className="flex items-center cursor-pointer">
              <FileText className="mr-3 h-4 w-4 text-primary" />
              <span>Reports</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className="space-y-1">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center cursor-pointer">
              <User className="mr-3 h-4 w-4" />
              <span>Profile Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings/account" className="flex items-center cursor-pointer">
              <Shield className="mr-3 h-4 w-4" />
              <span>Account Security</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center cursor-pointer">
              <Settings className="mr-3 h-4 w-4" />
              <span>Preferences</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center cursor-pointer">
            <Bell className="mr-3 h-4 w-4" />
            <span>Notifications</span>
            <div className="ml-auto w-2 h-2 bg-secondary rounded-full"></div>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
          {isLoggingOut && (
            <div className="ml-auto w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
