import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    let handleScrollTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-2">
            <Link to={"/"} className="navbar-brand p-0">
                <h2 className="m-0 text-primary">
                    {/* <i className="fa fa-tooth me-2" /> */}
                    <i className="fas fa-meteor"></i>
                    &nbsp;Fast<span className="text-secondary">Uty</span>
                </h2>
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
                        className="nav-item nav-link btn-to-top py-3"
                        activeClassName="active"
                        onClick={handleScrollTop}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/note"
                        className="nav-item nav-link btn-to-top py-3"
                        activeClassName="active"
                        onClick={handleScrollTop}
                    >
                        Fast Note
                    </NavLink>
                    <NavLink
                        to="/chat"
                        className={"nav-item nav-link btn-to-top py-3"}
                        activeClassName="active"
                        onClick={handleScrollTop}
                    >
                        Fast Chat
                    </NavLink>
                    <NavLink
                        to="/image"
                        className={"nav-item nav-link btn-to-top py-3"}
                        activeClassName="active"
                        onClick={handleScrollTop}
                    >
                        Fast Image
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
