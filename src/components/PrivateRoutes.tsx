import React from "react";
import { Redirect, Route } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  component: React.FC;
  path: string;
  exact?: boolean;
}

// export default function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         auth.user ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }
