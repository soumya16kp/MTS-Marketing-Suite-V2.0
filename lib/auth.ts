import { storage, type User, type Session } from "./storage"

// Simple client-side password hashing (demo only - not production secure)
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export const initializeDemoUser = () => {
  const users = storage.getUsers()

  // Check if demo user already exists
  if (users.find((u) => u.email === "demo@mts.com")) {
    return
  }

  // Create demo user with pre-hashed password
  const demoUser: User = {
    id: "demo_user",
    name: "Demo User",
    email: "demo@mts.com",
    passwordHash: "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f", // SHA-256 of "demo123"
    role: "admin",
    createdAt: new Date().toISOString(),
  }

  users.push(demoUser)
  storage.setUsers(users)
}

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long")
  }

  if (!/[A-Za-z]/.test(password)) {
    errors.push("Password must contain at least one letter")
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const signUp = async (
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Validate inputs
    if (!name.trim()) {
      return { success: false, error: "Name is required" }
    }

    if (name.trim().length < 2) {
      return { success: false, error: "Name must be at least 2 characters long" }
    }

    if (!validateEmail(email)) {
      return { success: false, error: "Please enter a valid email address" }
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.errors[0] }
    }

    const users = storage.getUsers()

    // Check if user already exists
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists" }
    }

    // Create new user
    const passwordHash = await hashPassword(password)
    const newUser: User = {
      id: `u_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.toLowerCase(),
      passwordHash,
      role: "admin",
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    storage.setUsers(users)

    // Create session
    const session: Session = {
      email: newUser.email,
      name: newUser.name,
      token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    storage.setSession(session)

    return { success: true }
  } catch (error) {
    console.error("Signup error:", error)
    return { success: false, error: "Failed to create account. Please try again." }
  }
}

export const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {


    if (!validateEmail(email)) {

      return { success: false, error: "Please enter a valid email address" }
    }

    if (!password) {

      return { success: false, error: "Password is required" }
    }

    let users = storage.getUsers()


    if (users.length === 0) {

      initializeDemoUser()
      users = storage.getUsers() // Get updated users list after initialization
    }

    const passwordHash = await hashPassword(password)


    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === passwordHash)


    if (!user) {
      const userByEmail = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (userByEmail) {



      } else {

      }
      return { success: false, error: "Invalid email or password" }
    }

    // Create session
    const session: Session = {
      email: user.email,
      name: user.name,
      token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    storage.setSession(session)


    return { success: true }
  } catch (error) {

    return { success: false, error: "Failed to sign in. Please try again." }
  }
}

export const signOut = () => {
  storage.setSession(null)
}

export const getCurrentUser = (): Session | null => {
  return storage.getSession()
}

export const isAuthenticated = (): boolean => {
  return storage.getSession() !== null
}
