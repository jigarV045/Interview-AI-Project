import { useContext, useEffect } from "react";
import { AuthContext } from "../services/auth.context";
import { register, login, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register(username, email, password);
      setUser(data.user);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetData = async () => {
      // Keep loading = true while we check session
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        // Token invalid/expired — treat as logged out
        setUser(null);
      } finally {
        // Only NOW is it safe to let route guards run
        setLoading(false);
      }
    };

    getAndSetData();
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
