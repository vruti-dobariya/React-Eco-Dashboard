import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/30 animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card/90 rounded-2xl shadow-2xl p-10 border border-border/50 animate-fade-in-up"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-admin-gradient rounded-full flex items-center justify-center shadow-lg mb-2 animate-bounce">
            <span className="text-3xl font-bold text-white">A</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Forgot Password</h1>
          <p className="text-muted-foreground text-sm">Reset your admin password</p>
        </div>
        {sent ? (
          <div className="text-green-600 text-center animate-fade-in">
            If this email exists, a reset link has been sent.
          </div>
        ) : (
          <>
            <Input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-background/80 border-border/50 focus:border-primary"
              autoFocus
            />
            <Button
              type="submit"
              className="w-full mt-6 bg-admin-gradient hover:shadow-glow transition-all duration-300 animate-fade-in"
              size="lg"
            >
              Send Reset Link
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
