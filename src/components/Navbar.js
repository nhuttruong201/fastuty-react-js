import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar() {
    let location = useLocation();
    // console.log("Check path: ", location.pathname);

    let handleScrollTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
            <Link to={"/"} className="navbar-brand p-0">
                <h1 className="m-0 text-primary">
                    {/* <i className="fa fa-tooth me-2" /> */}
                    <i className="fas fa-meteor"></i>
                    &nbsp;Fast Uty
                </h1>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0">
                    <NavLink
                        to="/"
                        exact={true}
                        className="nav-item nav-link btn-to-top"
                        activeClassName="active"
                        onClick={handleScrollTop}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/note"
                        className="nav-item nav-link btn-to-top"
                        activeClassName="active"
                        onClick={handleScrollTop}
                    >
                        Note
                    </NavLink>
                    <NavLink
                        to="/chat"
                        className={"nav-item nav-link btn-to-top"}
                        activeClassName="active"
                        onClick={handleScrollTop}
                    >
                        Chat
                    </NavLink>
                    <NavLink
                        to="/image"
                        className={"nav-item nav-link btn-to-top"}
                        activeClassName="active"
                        onClick={handleScrollTop}
                    >
                        Image
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
