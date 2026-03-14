import { Outlet } from "react-router-dom";
import Header from "@/widgets/header/Header";
import Sidebar from "@/widgets/sidebar/Sidebar";

const AppLayout = () => {
    return (
        <div className="flex h-screen">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Header />

                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default AppLayout;
