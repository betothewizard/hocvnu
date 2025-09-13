import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "~/app/components/ui/button";
import { Logo } from "./logo";

const navLinks = [
	{ to: "/", label: "Trang chủ" },
	{ to: "/tai-lieu", label: "Tài liệu" },
	{ to: "/trac-nghiem", label: "Trắc nghiệm" },
	{ to: "/dong-gop", label: "Đóng góp" },
];

type NavItemProps = {
	to: string;
	label: string;
	isMobile?: boolean;
	onClick?: () => void;
};

const NavItem = ({ to, label, isMobile, onClick }: NavItemProps) => {
	const navLinkClass = ({ isActive }: { isActive: boolean }) => {
		return isActive ? "underline underline-offset-4" : "opacity-70";
	};

	return (
		<li
			className={
				isMobile
					? "w-full rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-zinc-500/10"
					: ""
			}
		>
			<NavLink
				to={to}
				onClick={onClick}
				className={navLinkClass}
				style={({ isTransitioning }) => ({
					viewTransitionName: isTransitioning ? "slide" : "",
				})}
			>
				{label}
			</NavLink>
		</li>
	);
};

const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<nav className="flex items-center justify-between w-full py-10">
			<NavLink to="/" className="flex items-center space-x-4">
				<Logo size={64} role="img" aria-label="hocvnu" />
			</NavLink>
			<ul className="items-center justify-end flex-1 hidden gap-5 font-bold text-lg list-none sm:flex">
				{navLinks.map((link) => (
					<NavItem key={link.to} {...link} />
				))}
			</ul>

			<div className="flex items-center justify-end sm:hidden">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setToggle((t) => !t)}
					className="transition-transform duration-200 ease-in-out hover:scale-110"
				>
					{toggle ? <XIcon /> : <Menu />}
				</Button>
				<div
					className={`z-100 absolute right-0 top-24 mx-4 my-2 min-w-[150px] transform rounded-xl border bg-card p-4 shadow-lg transition-all duration-300 ease-in-out ${
						toggle
							? "scale-100 opacity-100"
							: "pointer-events-none scale-95 opacity-0"
					} origin-top-right`}
				>
					<ul className="flex flex-col items-start justify-end flex-1 gap-2 list-none">
						{navLinks.map((link) => (
							<NavItem
								key={link.to}
								{...link}
								isMobile
								onClick={() => setToggle(false)}
							/>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export { Navbar };
