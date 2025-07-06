// Vendors
import { useEffect } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
// Assets
import logo from "@/assets/logo.svg";
// Components
import { IconButton } from "@/components/icon-button/icon-button.component";
// Icons
import { Menu, Moon, Sun } from "lucide-react";
// Stores
import { useMenuStore } from "@/stores/menu/menu.store";
import { useThemeStore } from "@/stores/theme/theme.store";
// Utils
import { cn } from "@/utils/app.util";

const AppLayout = () => {
  const { isOpen, close, open } = useMenuStore();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex w-full flex-1 flex-col bg-[var(--main-background)]">
      <header className="sticky top-0 z-30 flex h-20 shrink-0 justify-center bg-[var(--header-background)] backdrop-blur-md">
        <div className="flex w-full max-w-[var(--maxWidth)] flex-1 items-center justify-between px-4">
          <Link to="/" className="flex items-center">
            <img
              alt="Logo"
              className="h-12"
              height="48"
              loading="lazy"
              src={logo}
              width="130"
            />
          </Link>

          <div
            className={cn(
              "invisible fixed inset-0 z-50 h-dvh w-full bg-[var(--overlay-background)] lg:visible lg:static lg:h-auto lg:w-auto lg:bg-transparent",
              isOpen && "visible",
            )}
            onClick={close}
          >
            <div
              className="flex h-full w-full max-w-72 flex-col gap-6 overflow-auto bg-[var(--container-background)] p-4 lg:max-h-[calc(100dvh-96px)] lg:translate-x-0 lg:bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-6 py-8 text-sm font-medium text-[var(--text-muted)] lg:flex-row lg:py-0">
                <Link
                  to="/"
                  className="transition-colors hover:text-[var(--text)]"
                >
                  Teams
                </Link>
                <Link
                  to="/simulator"
                  className="transition-colors hover:text-[var(--text)]"
                >
                  Simulator
                </Link>
              </nav>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <IconButton ariaLabel="Toggle theme" onClick={toggleTheme}>
              <Moon className="hidden size-6 text-[var(--text-muted)] dark:block" />
              <Sun className="size-6 text-[var(--text-muted)] dark:hidden" />
            </IconButton>
            <IconButton
              ariaLabel="Toggle menu"
              className="visible lg:hidden"
              onClick={open}
            >
              <Menu className="size-6 text-[var(--text-muted)]" />
            </IconButton>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="flex h-12 justify-center">
        <div className="flex h-full items-center justify-center gap-4 px-4">
          <p className="text-center text-xs text-[var(--text-muted)]">
            Pokemon Arena developed by Oscar Velilla
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
