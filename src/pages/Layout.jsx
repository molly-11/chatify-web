import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>This will be the nav bar.</nav>
      <Outlet />
    </>
  );
}

export default Layout;
