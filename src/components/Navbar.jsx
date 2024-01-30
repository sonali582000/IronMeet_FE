import { Link } from "react-router-dom";
import logo from '../assets/navbarLogo.png'
import styles from '../styles/Navbar.module.css'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <img src={logo} className={styles.logo} alt="Logo" />
            <div className={styles.links}>
                <Link to="/" className={styles.link}><button>Home</button></Link>
                <Link to="/about" className={styles.link}><button>About us</button></Link>
                <Link to="/profile" className={styles.link}><button>Profile</button></Link>
                <Link to="/signup" className={styles.link}><button>Go to Signup</button></Link>
                <Link to="/login" className={styles.link}><button>Go to Login</button></Link>
            </div>
        </nav>
    )
}


export default Navbar;