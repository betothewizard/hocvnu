import { Github, Menu, XIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { Button } from "~/app/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/app/components/ui/dropdown-menu";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "~/app/components/ui/navigation-menu";
import { Logo } from "./logo";

const navLinks = [
	{ to: "/", label: "Trang chủ" },
	{ to: "/tai-lieu", label: "Tài liệu" },
	{ to: "/trac-nghiem", label: "Trắc nghiệm" },
	{ to: "/dong-gop", label: "Đóng góp" },
];

const githubLink = {
	to: "https://github.com/betothewizard/hocvnu",
	label: "GitHub",
};

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinkClass = ({ isActive }: { isActive: boolean }) => {
		return isActive
			? "underline underline-offset-4"
			: "opacity-70 transition-opacity hover:opacity-100";
	};

	const navLinkStyle = ({ isTransitioning }: { isTransitioning: boolean }) => ({
		viewTransitionName: isTransitioning ? "slide" : "",
	});

	return (
		<nav className="flex items-center justify-between w-full py-10">
			<NavLink to="/" className="flex items-center space-x-4">
				<Logo size={64} role="img" aria-label="hocvnu" />
			</NavLink>

			{/* Desktop Navigation */}
			<NavigationMenu className="hidden sm:flex justify-end flex-1">
				<NavigationMenuList className="gap-5 font-bold text-lg">
					{navLinks.map((link) => (
						<NavigationMenuItem key={link.to}>
							<NavLink
								to={link.to}
								className={navLinkClass}
								style={navLinkStyle}
							>
								{link.label}
							</NavLink>
						</NavigationMenuItem>
					))}
					<NavigationMenuItem>
						<a
							href={githubLink.to}
							target="_blank"
							rel="noopener noreferrer"
							className="opacity-70 transition-opacity hover:opacity-100"
							aria-label={githubLink.label}
						>
							<Github />
						</a>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			{/* Mobile Navigation */}
			<div className="flex items-center justify-end sm:hidden">
				<DropdownMenu onOpenChange={setIsMobileMenuOpen}>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="transition-transform duration-200 ease-in-out hover:scale-110"
						>
							{isMobileMenuOpen ? (
								<XIcon className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="min-w-[150px]">
						{navLinks.map((link) => (
							<DropdownMenuItem
								key={link.to}
								asChild
								className="text-base py-2 px-3"
							>
								<NavLink to={link.to} className="w-full" style={navLinkStyle}>
									{link.label}
								</NavLink>
							</DropdownMenuItem>
						))}
						<DropdownMenuItem asChild className="text-base py-2 px-3">
							<a
								href={githubLink.to}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full flex items-center justify-between"
							>
								GitHub
								<Github className="h-5 w-5" />
							</a>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
};

export { Navbar };
