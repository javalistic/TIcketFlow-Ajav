import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowLeft, UserPlus, Sparkles, Eye, EyeOff, CheckCircle } from "lucide-react";

const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z
      .string()
      .trim()
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100, { message: "Password must be less than 100 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      // Validate input
      signupSchema.parse({ name, email, password, confirmPassword });

      // Attempt signup
      await signup(email, password, name);
      toast.success("Account created successfully! Welcome to TicketFlow.");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = password.length >= 6 ? "strong" : password.length >= 3 ? "medium" : "weak";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30 py-12 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-200/[0.02] bg-[size:40px_40px]" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Back to home button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors group z-10"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to home</span>
      </Link>

      <Card className="w-full max-w-md shadow-xl border-slate-200/60 backdrop-blur-sm bg-white/80 relative z-10 group hover:shadow-2xl transition-all duration-300">
        {/* Card accent gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-t-lg" />
        
        <CardHeader className="space-y-3 text-center pb-4">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Create account
            </CardTitle>
            <CardDescription className="text-slate-600 leading-relaxed">
              Join thousands of teams managing their workflow with TicketFlow
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Joshua Dodo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="h-12 bg-white/50 border-slate-300/80 focus:border-blue-500/80 transition-colors placeholder:text-slate-400"
                disabled={isLoading}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-red-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  {errors.name}
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="h-12 bg-white/50 border-slate-300/80 focus:border-blue-500/80 transition-colors placeholder:text-slate-400"
                disabled={isLoading}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Show
                    </>
                  )}
                </button>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className="h-12 bg-white/50 border-slate-300/80 focus:border-blue-500/80 transition-colors placeholder:text-slate-400"
                disabled={isLoading}
              />
              
              {/* Password strength indicator */}
              {password && (
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        passwordStrength === "weak" ? "w-1/3 bg-red-500" :
                        passwordStrength === "medium" ? "w-2/3 bg-yellow-500" :
                        "w-full bg-green-500"
                      }`}
                    />
                  </div>
                  <span className={`font-medium ${
                    passwordStrength === "weak" ? "text-red-600" :
                    passwordStrength === "medium" ? "text-yellow-600" :
                    "text-green-600"
                  }`}>
                    {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                  </span>
                </div>
              )}
              
              {errors.password && (
                <p id="password-error" className="text-sm text-red-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                  Confirm Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1"
                >
                  {showConfirmPassword ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Show
                    </>
                  )}
                </button>
              </div>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                className="h-12 bg-white/50 border-slate-300/80 focus:border-blue-500/80 transition-colors placeholder:text-slate-400"
                disabled={isLoading}
              />
              
              {/* Password match indicator */}
              {confirmPassword && password && (
                <div className="flex items-center gap-2 text-xs">
                  {confirmPassword === password ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-green-600 font-medium">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-red-600 font-medium">Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
              
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="text-sm text-red-600 font-medium flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating your account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Create account
                </div>
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-5 pt-2">
          <div className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Sign in here
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Free 14-day trial</span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>No credit card</span>
            </div>
          </div>
        </CardFooter>
      </Card>

     
    </div>
  );
};

export default Signup;