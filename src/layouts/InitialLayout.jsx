

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// eslint-disable-next-line no-unused-vars
import IdleTimer from "../components/IdleTimer";
import Footer from "../components/Footer";

const InitialLayout = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isSidebarHovered, setSidebarHovered] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleSidebarHover = (isHovered) => {
        setSidebarHovered(isHovered);
    };

    const isCollapsed = isSidebarCollapsed && !isSidebarHovered;

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                isCollapsed={isCollapsed}
                handleHover={handleSidebarHover}
            />
            <div className="flex flex-col flex-1">
                <Navbar
                    toggleSidebar={toggleSidebar}
                    isCollapsed={isSidebarCollapsed}
                />
                {/* <IdleTimer /> */}
                <main className="flex-1 overflow-y-auto bg-[#e9e7f7]">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default InitialLayout;
