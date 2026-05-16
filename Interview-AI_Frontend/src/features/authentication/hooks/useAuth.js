import { useContext, useEffect } from "react";
import { AuthContext } from "../services/auth.context";
import { register, login, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      return true;
    } catch (error) {
      console.error("Logout failed", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetData = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getAndSetData();
  }, []);

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
