import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Welcome to ironMeet!</h1>
            <Link to="/signup">
                <button>Go to Signup</button>
            </Link>
            <Link to="/login">
                <button>Go to Login</button>
            </Link>
        </div>
    )
}

export default HomePage;