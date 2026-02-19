import { useContext } from "react";
import ModeContext from "../context/ModeContext";



export default function Header() {
    const { mode, toggleMode } = useContext(ModeContext);
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/add">Add Profile</Link>
            <Link to="/fetched">Fetched Profiles</Link>
            <Link to="/about">About</Link>
            
        </nav>
    );
}