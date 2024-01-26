import { Link } from "react-router-dom";
import { useContext } from "react";

function Navbar() {
    return (
        <nav>
            <Link to="/"><button>Home</button></Link>
            <Link to="/about"><button>Abous us</button></Link>
            <Link to="/profile"><button>Profile</button></Link>
        </nav>
    )
}


export default Navbar;