import { Outlet } from "react-router-dom";

import MainHeader from "../components/MainHeader/MainHeader";
import SideMenu from "../components/SideMenu/SideMenu";
import useUser from "../hooks/useUser";
import useStuff from "../hooks/useStuff";
import SimpleBackdrop from "../components/SimpleBackdrop/SimpleBackdrop";

const RootLayout = () => {
  useStuff();
  const user = useUser();

  return (
    <>
      {user ? (
        <>
          <MainHeader />
          <SideMenu userId={user._id} />
          <Outlet />
        </>
      ) : (
        <SimpleBackdrop />
      )}
    </>
  );
};

export default RootLayout;
