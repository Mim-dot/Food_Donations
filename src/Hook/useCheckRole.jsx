import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../LayOut/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const useCheckRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiossecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [isRoleLoader, setIsRoleLoader] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (!authLoading && user?.email) {
        try {
          const encodedEmail = encodeURIComponent(user.email);
          const response = await axiossecure.get(
            `/api/users/${encodedEmail}/role`
          );

          if (response.data?.role) {
            setRole(response.data.role);
          } else {
            console.warn("No role returned, defaulting to 'user'");
            setRole("user");
          }
        } catch (error) {
          console.error(
            "Role check failed:",
            error.response?.data || error.message
          );
          setRole("user"); // Default fallback
        } finally {
          setIsRoleLoader(false);
        }
      } else if (!authLoading && !user) {
        setRole(null);
        setIsRoleLoader(false);
      }
    };

    checkRole();
  }, [user?.email, authLoading, axiossecure]);

  return { role, isRoleLoader };
};
export default useCheckRole;
