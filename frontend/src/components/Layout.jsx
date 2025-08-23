import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "70px" }}>
        <Outlet /> 
      </main>
    </>
  );
}
