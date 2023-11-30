import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { BsBox } from "react-icons/bs";

export const AdminNavigationLinks = [
    { label: "dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { label: "products", href: "/products", icon: HiOutlineShoppingBag },
    { label: "orders", href: "/orders", icon: BsBox },
]

export const BagsCategories = [
    { label: "Events", value: "event" },
    { label: "Large", value: "large" },
    { label: "Shoulder", value: "shoulder" },
    { label: "Backpacks", value: "back" },
]

export const NavLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/About" },
]

export const Gallerie = [
    { src:"/assets/bags/bag2.jpg" },
    { src:"/assets/bags/bag4.jpg" },
    { src:"/assets/bags/bag5.jpg" },
    { src:"/assets/bags/bag6.jpg" },
]