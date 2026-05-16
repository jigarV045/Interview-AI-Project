import { useContext } from "react";
import { AuthContext } from "../services/auth.context";
import { register, login, logout } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      return true;
    } catch (error) {
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
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
