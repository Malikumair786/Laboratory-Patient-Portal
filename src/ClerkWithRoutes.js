
// import React from "react";
// import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import ProtectedApp from "protected/ProtectedApp";
// import App from "App";
// import Home from "scenes/home";

// if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

// const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// const ClerkWithRoutes = () => {
  
//   const navigate = useNavigate();

//   return (
//     <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
//       <Routes>
//         {/* Change the parent route path to <Route path="*"> */}
//         <Route path="*" element={<App />} />
//         {/* Clerk authentication routes */}
//         <Route path="/sign-in/*" element={<SignIn redirectUrl={'/main'} routing="path" path="/sign-in" />} />
//         <Route path="/sign-up/*" element={<SignUp redirectUrl={'/main '} routing="path" path="/sign-up" />} />
//         <Route
//           path="/main/*"
//           element={
//             <>
//               <SignedIn>
//                 <ProtectedApp />
//               </SignedIn>
//               <SignedOut>
//                 <RedirectToSignIn />
//               </SignedOut>
//             </>
//           }
//         />
//       </Routes>
//     </ClerkProvider>
//   );
// };

// export default ClerkWithRoutes;

import React from "react";
import {   
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  } from "@clerk/clerk-react";


import {  Route, Routes, useNavigate } from "react-router-dom";

import ProtectedApp from "protected/ProtectedApp";
import App from "App";

// import ProtectedPages from "./protected/ProtectedApp";
// import LandingPage from "LandingPage";


if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
 
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        /> */}
        <Route path="/sign-in/*" element={<SignIn redirectUrl={'/dashboard'} routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp redirectUrl={'/main '} routing="path" path="/sign-up" />} />

        <Route
          path="/*"
          element={
          <>
            <SignedIn>
              <ProtectedApp />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

export default ClerkProviderWithRoutes;