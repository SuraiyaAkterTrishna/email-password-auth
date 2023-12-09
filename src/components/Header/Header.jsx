import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
    return (
        <nav className="d-flex justify-content-center my-4 fw-bold">
            <Link className="text-decoration-none" to="/">Home</Link>
            <Link className="text-decoration-none" to="/register">Register</Link>
            <Link className="text-decoration-none" to="/login">Login</Link>
            <Link className="text-decoration-none" to="/register-rbs">Register RBS</Link>
        </nav>
    );
};

export default Header;