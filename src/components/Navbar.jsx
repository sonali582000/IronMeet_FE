import { Link } from "react-router-dom";
import { useContext } from "react"; 

function Navbar() {
    return (
        <nav>
            <Link to="/">
                <button>Home</button>
            </Link>
        </nav>
    )
}


export default Navbar;