import { Link } from "react-router-dom";
import logo from '../assets/navbarLogo.png'
import styles from '../styles/Navbar.module.css'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext)
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logoContainer}><button><img src={logo} className={styles.logo} alt="Logo" /></button></Link>
            
            <div className={styles.links}>
                <Link to="/about" className={styles.link}><button>About us</button></Link>
                <Link to="/profile" className={styles.link}><button>Profile</button></Link>
                <Link to="/signup" className={styles.link}><button>Signup</button></Link>
                <Link to="/login" className={styles.link}><button>Login</button></Link>
                {isAuthenticated ? (
                    <Link to="/event/new" className={styles.link}><button>Create an event</button></Link>
                ): <Link to="/login" className={styles.link}><button>Login</button></Link> }
                
            </div>
        </nav>
    )
}


export default Navbar;