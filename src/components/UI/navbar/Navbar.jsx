import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-sm  navbar-dark">
            <ul className="navbar-nav">
                <li className="nav-item- m-1">
                    <NavLink className="btn btn-outline-secondary" to="/home">
                        Home
                    </NavLink>
                </li>
                <li className="nav-item- m-1">
                    <NavLink className="btn btn-outline-secondary" to="/applicationType">
                        App Types
                    </NavLink>
                </li>
                <li className="nav-item- m-1">
                    <NavLink className="btn btn-outline-secondary" to="/applicationInstance">
                        App Instances
                    </NavLink>
                </li>
                <li className="nav-item- m-1">
                    <NavLink className="btn btn-outline-secondary" to="/binding">
                        Bindings
                    </NavLink>
                </li>
                <li className="nav-item- m-1">
                    <NavLink className="btn btn-outline-secondary" to="/metadata">
                        Metadata
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;