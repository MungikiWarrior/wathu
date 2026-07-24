import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { startLogin } from "@/const";
import { Link } from "wouter";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="container flex items-center justify-between py-4">
        {/* Logo / Brand */}
        <Link href="/">
          <a className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
            Design Hub
          </a>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Home
            </a>
          </Link>

          {isAuthenticated && (
            <Link href="/profile">
              <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                My Profile
              </a>
            </Link>
          )}

          {isAuthenticated && (
            <Link href="/settings">
              <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Settings
              </a>
            </Link>
          )}

          {isAuthenticated && (
            <Link href="/submit">
              <a className="text-sm font-medium text-accent hover:text-accent/80 transition-colors font-semibold">
                Submit Work
              </a>
            </Link>
          )}

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <Button
                onClick={() => startLogin()}
                className="btn-premium-primary"
              >
                Log In
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground/70">{user?.name || user?.email}</span>
                <Button
                  onClick={() => logout()}
                  variant="outline"
                  className="text-sm"
                >
                  Log Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
