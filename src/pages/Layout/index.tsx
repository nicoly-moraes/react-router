import { Outlet } from "react-router-dom";
import Menu from "../../components/Menu";
import style from "./Layout.module.css";

export default function Layout() {
    return (
        <>
            <Menu />
            <section className="container">
                <Outlet />
            </section>
        </>       
    );
}