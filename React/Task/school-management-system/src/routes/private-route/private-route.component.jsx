import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, currentUser, ...rest }) => {

    return (
        <Route
          {...rest}
          element={currentUser ? element : <Navigate to="/" replace />}
        />
      );
}
export default PrivateRoute;