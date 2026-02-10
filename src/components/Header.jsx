export default function Header() {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/add">Add Profile</Link>
            <Link to="/fetched">Fetched Profiles</Link>
            <Link to="/about">About</Link>
        </nav>
    );
}