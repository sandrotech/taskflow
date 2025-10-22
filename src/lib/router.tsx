import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface RouterContextType {
  currentRoute: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentRoute: "/dashboard",
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

interface RouterProviderProps {
  children: ReactNode;
  initialRoute?: string;
}

export function RouterProvider({ children, initialRoute = "/dashboard" }: RouterProviderProps) {
  const [currentRoute, setCurrentRoute] = useState(() => {
    // Check hash on mount
    const hash = window.location.hash.slice(1);
    return hash || initialRoute;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setCurrentRoute(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentRoute(path);
  };

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

interface RouteProps {
  path: string;
  children: ReactNode;
}

export function Route({ path, children }: RouteProps) {
  const { currentRoute } = useRouter();
  return currentRoute === path ? <>{children}</> : null;
}
