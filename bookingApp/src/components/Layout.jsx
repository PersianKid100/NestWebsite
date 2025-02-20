import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen py-3 px-5 ">
      <Header />
      <Outlet />
    </div>
  );
}
