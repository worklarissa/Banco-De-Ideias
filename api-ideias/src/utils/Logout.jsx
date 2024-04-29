import { Redirect } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export const useUnlog = () => {
  const signOut = useSignOut();
  const unlogUser = () => {
    signOut();
    Redirect("/");
  };

  return unlogUser;
};
