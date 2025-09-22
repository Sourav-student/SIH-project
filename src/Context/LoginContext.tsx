"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type userInfoType = {
  phone_no: number;
  email: string;
  user_name: string;
  image: string;
  name: string;
  role: string;
}

type AppContextType = {
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  userInfo: userInfoType;
  setUserInfo: React.Dispatch<React.SetStateAction<userInfoType>>;
};

const AppContext = createContext<AppContextType | null>(null);

export function LoginContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(false);
  const [userType, setUserType] = useState("user");
  const [userInfo, setUserInfo] = useState({
    phone_no: 1111111111,
    email: "",
    user_name: "",
    image: "",
    name: "",
    role: "user"
  });

  useEffect(() => {
    const user_name = localStorage.getItem('user-name');
    if (user_name) {
      setUser(true);
    } else {
      setUser(false);
    }

    const fetchUser = async () => {
      try {
        const stored = localStorage.getItem("user-name");
        if (!stored) return;

        const user_name = JSON.parse(stored);
        const res = await axios.get(`/api/user`, { params: { user_name } });
        if(res.data?.data) setUserType(res.data.data.role);
        // console.log(res.data.data.role);
        // console.log(res.data.data);
        // if (res.data?.data) setUserInfo(res.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        // toast.error("Failed to load profile");
      }
    };

    fetchUser();
  }, [])
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        userType,
        setUserType,
        userInfo,
        setUserInfo
      }}>
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