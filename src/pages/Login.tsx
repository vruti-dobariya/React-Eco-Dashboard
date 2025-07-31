import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate loading for animation
    await new Promise(res => setTimeout(res, 1200));

    if (!username || !password) {
      setError("Please enter both username and password.");
      setLoading(false);
      return;
    }
    // Demo: accept any username/password
    localStorage.setItem("isAdminLoggedIn", "true");
    localStorage.setItem("adminUser", JSON.stringify({ name: username }));
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/30 animate-fade-in">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-card/90 rounded-2xl shadow-2xl p-10 border border-border/50 animate-fade-in-up relative overflow-hidden"
        style={{ backdropFilter: "blur(8px)" }}
      >
        {/* Animated gradient ring */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full blur-2xl opacity-40 animate-pulse" />
        <div className="flex flex-col items-center mb-6 z-10 relative">
          <div className="w-16 h-16 bg-admin-gradient rounded-full flex items-center justify-center shadow-lg mb-2 animate-bounce">
            <span className="text-3xl font-bold text-white">A</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1 animate-fade-in-up">Admin Login</h1>
          <p className="text-muted-foreground text-sm animate-fade-in">Sign in to your admin panel</p>
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-center animate-shake">{error}</div>
        )}
        <div className="space-y-4 z-10 relative">
          <Input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="bg-background/80 border-border/50 focus:border-primary transition-all duration-200"
            autoFocus
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-background/80 border-border/50 focus:border-primary transition-all duration-200"
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          className="w-full mt-6 bg-admin-gradient hover:shadow-glow transition-all duration-300 animate-fade-in"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
              Signing in...
            </span>
          ) : (
            "Login"
          )}
        </Button>
        <Button
          type="button"
          variant="link"
          className="w-full mt-2 text-primary"
          onClick={() => navigate("/forgot-password")}
          disabled={loading}
        >
          Forgot Password?
        </Button>
      </form>
    </div>
  );
}