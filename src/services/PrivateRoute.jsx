// PrivateRoute.jsx
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return navigate("/sign-in");
  }
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
