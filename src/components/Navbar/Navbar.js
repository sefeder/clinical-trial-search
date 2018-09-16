import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props => (
    <div>
    <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                    Clinical Trial Search App
        </Link>
            </div>
            <ul className="nav navbar-nav">
                <li className={window.location.pathname === "/saved" ? "active" : ""}>
                    <Link to="/saved">Saved Trials</Link>
                </li>
            </ul>
        </div>
    </nav>
    <br/><br/><br/>
    </div>
);

export default Navbar;