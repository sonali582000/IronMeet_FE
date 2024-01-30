import { Link } from "react-router-dom";
import { useContext } from "react";
import logo from '../assets/navbarLogo.png'

function Navbar() {
    return (
        <nav>
            <img src={logo} style={{ width: '100px', height: 'auto' }}/>
            <Link to="/"><button>Home</button></Link>
            <Link to="/about"><button>Abous us</button></Link>
            <Link to="/profile"><button>Profile</button></Link>
        </nav>
    )
}


export default Navbar;