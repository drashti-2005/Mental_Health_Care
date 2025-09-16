import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Sidebar } from "primereact/sidebar";
import { Menu } from "primereact/menu";

const AppLayout = ({ children }) => {
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/login");
	};

	const menuItems = [
		{
			label: "Dashboard",
			icon: "pi pi-home",
			command: () => navigate("/dashboard"),
		},
		{
			label: "Journal",
			icon: "pi pi-book",
			command: () => navigate("/journal"),
		},
		{
			label: "Resources",
			icon: "pi pi-info-circle",
			command: () => navigate("/resources"),
		},
		{
			label: "Mental Health Tips",
			icon: "pi pi-heart",
			command: () => navigate("/mental-health-tips"),
		},
		{
			label: "Community",
			icon: "pi pi-users",
			command: () => navigate("/community"),
		},
		{
			label: "Settings",
			icon: "pi pi-cog",
			command: () => navigate("/settings"),
		},
		{
			separator: true,
		},
		{
			label: "Logout",
			icon: "pi pi-power-off",
			command: handleLogout,
		},
	];

	const navbarItems = [
		{
			label: "Home",
			icon: "pi pi-home",
			command: () => navigate("/dashboard"),
		},
		{
			label: "Services",
			icon: "pi pi-heart",
			items: [
				{
					label: "Mood Tracking",
					icon: "pi pi-chart-line",
					command: () => navigate("/mood-tracking"),
				},
				{
					label: "Journaling",
					icon: "pi pi-pencil",
					command: () => navigate("/journal"),
				},
				{
					label: "Meditation",
					icon: "pi pi-moon",
					command: () => navigate("/meditation"),
				},
				{
					label: "Mental Health Tips",
					icon: "pi pi-star",
					command: () => navigate("/mental-health-tips"),
				},
			],
		},
		{
			label: "Resources",
			icon: "pi pi-book",
			command: () => navigate("/resources"),
		},
		{
			label: "Contact",
			icon: "pi pi-envelope",
			command: () => navigate("/contact"),
		},
	];

	const navbarEnd = () => {
			return (
				<div className="flex items-center gap-2">
				{user ? (
					<>
						<Button
							icon="pi pi-bell"
							className="p-button-rounded p-button-text p-button-plain"
						/>
						<Avatar
							label={user.username?.charAt(0).toUpperCase() || "U"}
							style={{ backgroundColor: "#7B66FF", color: "#ffffff" }}
							shape="circle"
							onClick={() => setSidebarVisible(true)}
							className="cursor-pointer"
						/>
					</>
				) : (
					<Button
						label="Login"
						icon="pi pi-sign-in"
						onClick={() => navigate("/login")}
					/>
				)}
			</div>
		);
	};

	// Don't show the header on login/register pages
	const hideNavigation = ["/login", "/register"].includes(location.pathname);

	return (
		<>
			{!hideNavigation && (
				<header className="shadow">
					<Menubar
						model={navbarItems}
						end={navbarEnd}
						className="border-none"
					/>
				</header>
			)}

					<Sidebar
				visible={sidebarVisible}
				position="right"
				onHide={() => setSidebarVisible(false)}
						className="w-full md:w-[20rem]"
			>
						<div className="flex flex-col items-center p-4 border-b border-gray-300">
					<Avatar
						label={user?.username?.charAt(0).toUpperCase() || "U"}
						style={{ backgroundColor: "#7B66FF", color: "#ffffff" }}
						shape="circle"
						size="large"
						className="mb-2"
					/>
					<h3 className="m-0">{user?.username || "User"}</h3>
					<p className="text-sm text-gray-600 mt-1">Role | {user?.role}</p>
				</div>

				<Menu model={menuItems} className="w-full border-none" />
			</Sidebar>

			<main className="flex-1">{children}</main>

			{!hideNavigation && (
						<footer className="bg-gray-800 text-white p-4 mt-auto">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div>
							<h3 className="text-xl mb-3">Mental Health Care</h3>
							<p className="leading-relaxed">
								Providing tools and resources for your mental wellbeing journey.
							</p>
						</div>
						<div>
							<h3 className="text-xl mb-3">Quick Links</h3>
							<ul className="list-none p-0 m-0">
								<li className="mb-2">
									<Link to="/about" className="text-white hover:text-primary">
										About Us
									</Link>
								</li>
								<li className="mb-2">
									<Link
										to="/services"
										className="text-white hover:text-primary"
									>
										Services
									</Link>
								</li>
								<li className="mb-2">
									<Link
										to="/resources"
										className="text-white hover:text-primary"
									>
										Resources
									</Link>
								</li>
								<li className="mb-2">
									<Link to="/contact" className="text-white hover:text-primary">
										Contact Us
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-xl mb-3">Emergency Contact</h3>
							<p className="leading-relaxed">
								If you're experiencing a mental health crisis, please call:
							</p>
							<p className="text-xl font-bold">988 - Crisis Lifeline</p>
						</div>
					</div>
					  <div className="border-t border-gray-700 mt-3 pt-3 text-center">
						<p className="text-sm">
							© 2025 Mental Health Care. All rights reserved.
						</p>
					</div>
				</footer>
			)}
		</>
	);
};

export default AppLayout;
