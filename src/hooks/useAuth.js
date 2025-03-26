import { useState, useEffect } from "react";
import { baseURL } from '../constants'

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    // Load from localStorage first
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(!user); // Skip loading if user exists
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) return; // If user exists, no need to fetch again

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${baseURL}/auth/me`, {
          credentials: "include",
          signal,
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setUser(null);
          localStorage.removeItem("user"); // Remove invalid user data
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort(); // Cleanup on unmount
  }, [user]);

  return { user, loading, error };
};
