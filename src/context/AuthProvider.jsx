import { PropTypes } from "prop-types";
import { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../auth";

const AuthContext = createContext(null);

function AuthProvider(props) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <AuthContext.Provider value={user}>
      {!loading ? props.children : null}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
