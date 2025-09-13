"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { signIn, signUp, getCurrentUser } from "@/lib/auth"
import { initializeDemoData, initializeDemoUser } from "@/lib/storage"

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const router = useRouter()

  useEffect(() => {
    // Initialize demo data on first load
    initializeDemoData()

    initializeDemoUser()

    // Redirect if already logged in
    if (getCurrentUser()) {
      router.push("/dashboard")
    }
  }, [router])

  const validateField = (name: string, value: string) => {
    const errors = { ...fieldErrors }

    switch (name) {
      case "name":
        if (isSignUp) {
          if (!value.trim()) {
            errors.name = "Name is required"
          } else if (value.trim().length < 2) {
            errors.name = "Name must be at least 2 characters"
          } else {
            errors.name = ""
          }
        }
        break
      case "email":
        if (!value) {
          errors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Please enter a valid email"
        } else {
          errors.email = ""
        }
        break
      case "password":
        if (!value) {
          errors.password = "Password is required"
        } else if (value.length < 6) {
          errors.password = "Password must be at least 6 characters"
        } else if (!/[A-Za-z]/.test(value)) {
          errors.password = "Password must contain at least one letter"
        } else if (!/[0-9]/.test(value)) {
          errors.password = "Password must contain at least one number"
        } else {
          errors.password = ""
        }
        break
    }

    setFieldErrors(errors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setFieldErrors({ name: "", email: "", password: "" })

    try {
      if (isSignUp) {
        const result = await signUp(formData.name, formData.email, formData.password)
        if (result.success) {
          router.push("/dashboard")
        } else {
          setError(result.error || "Failed to create account")
        }
      } else {
        const result = await signIn(formData.email, formData.password)

        if (result.success) {

          router.push("/dashboard")
        } else {

          setError(result.error || "Failed to sign in")
        }
      }
    } catch (err) {

      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")

    validateField(name, value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="opacity-100">
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="relative w-16 h-16 p-2 bg-white rounded-2xl shadow-lg">
                  <Image src="/mts-logo.png" alt="MTS Logo" width={48} height={48} className="object-contain" />
                </div>
              </div>

              <div>
                <CardTitle className="text-2xl font-montserrat font-bold">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </CardTitle>
                <CardDescription className="text-base">
                  {isSignUp
                    ? "Start managing your marketing campaigns today"
                    : "Sign in to your MTS Marketing Suite account"}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-1">All-in-One Digital Marketing</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={isSignUp}
                      className={`h-11 ${fieldErrors.name ? "border-red-500" : ""}`}
                    />
                    {fieldErrors.name && <p className="text-sm text-red-600">{fieldErrors.name}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`h-11 ${fieldErrors.email ? "border-red-500" : ""}`}
                  />
                  {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className={`h-11 pr-10 ${fieldErrors.password ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {fieldErrors.password && <p className="text-sm text-red-600">{fieldErrors.password}</p>}
                  {isSignUp && !fieldErrors.password && (
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 6 characters with letters and numbers
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={loading || Object.values(fieldErrors).some((error) => error !== "")}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      {isSignUp ? "Creating Account..." : "Signing In..."}
                    </>
                  ) : isSignUp ? (
                    "Create Account"
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              {!isSignUp && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Demo Credentials:</p>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Email:</strong> demo@mts.com
                    </p>
                    <p>
                      <strong>Password:</strong> demo123
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full bg-transparent"
                    onClick={() => {
                      setFormData({ name: "", email: "demo@mts.com", password: "demo123" })
                    }}
                  >
                    Use Demo Credentials
                  </Button>
                </div>
              )}

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError("")
                    setFieldErrors({ name: "", email: "", password: "" })
                    setFormData({ name: "", email: "", password: "" })
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Demo version - passwords are hashed client-side for demonstration purposes only. Not suitable for production
            use.
          </p>
        </div>
      </div>
    </div>
  )
}
