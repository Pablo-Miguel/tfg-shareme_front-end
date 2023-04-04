import { Outlet } from "react-router-dom";

import MainHeader from "../components/MainHeader/MainHeader";
import SideMenu from "../components/SideMenu/SideMenu";
import useUser from "../hooks/useUser";
import useStuff from "../hooks/useStuff";

const RootLayout = () => {
  useStuff();
  const user = useUser();

  return (
    <>
      {user ? (
        <>
          <MainHeader />
          <SideMenu />
          <Outlet />
        </>
      ) : (
        <h1 style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>Loading...</h1>
      )}
    </>
  );
};

export default RootLayout;
