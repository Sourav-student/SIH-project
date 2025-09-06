"use client";

import { createContext, useContext, useState, useEffect } from "react";

type AppContextType = {
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | null>(null);

export function LoginContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const user_name = localStorage.getItem('user-name');
    if (user_name) {
      setUser(true);
    }else{
      setUser(false);
    }
  }, [])
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside LoginContext");
  }
  return context;
}