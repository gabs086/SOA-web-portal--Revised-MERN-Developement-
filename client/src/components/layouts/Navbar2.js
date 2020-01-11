import React, { Component } from 'react';
import { Link } from "react-router-dom";

import M from "materialize-css";// import materialize. M is the alias of materialize

//Navbar For Students
export class Navbar2 extends Component {
    componentDidMount() {

        //To make it float at right
        const elem = document.querySelector(".sidenav");
        M.Sidenav.init(elem, {
            edge: "right",
            inDuration: 250
        });

        //DropDown
        const elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {
            alignment: 'left',
            constrainWidth: false
        });

    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper" style={{ backgroundColor: "#820101" }}>
                        <div className="container">
                            <Link to="#" className="brand-logo">SOA Web Portal</Link>
                            {/* Hamburger Trigger */}
                            <Link to="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></Link>

                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to="#">Home</Link></li>
                                <li><Link to="#">Activities</Link></li>
                                <li><Link to="#">Events</Link></li>
                                <li><Link to="#">Assessments</Link></li>
                                {/* DropDown */}
                                <li>
                                    <Link to="#" className="dropdown-trigger" data-target="dropdown-settings">
                                        <i className="fa fa-cog fa-2x text-white" aria-hidden="true"></i>
                                        <i class="material-icons right">arrow_drop_down</i>
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>

                {/* LostandFound DropDown */}
                <ul id="dropdown-settings" className="dropdown-content">
                    <li><Link to="#" className="black-text">Downloadable Files</Link></li>
                    <li class="divider"></li>
                    <li><Link to="#" className="black-text">Logout</Link></li>

                </ul>



                {/* Side Nav for mobile screen size  */}
                <ul className="sidenav" id="mobile-demo" edge="right">
                    <li><Link to="#">Home</Link></li>
                    {/* DropDown */}
                    <li><Link to="#">Activities</Link></li>
                    <li><Link to="#">Events</Link></li>
                    <li><Link to="#">Assessments</Link></li>
                    {/* DropDown */}
                    <li><Link to="#"></Link></li>
                    <li class="divider"></li>
                    <br></br>
                    <li><Link to="#" className="black-text">Downloadable Files</Link></li>
                    <li><Link to="#" className="black-text">Logout</Link></li>

                </ul>
            </div>
        )
    }
}

export default Navbar2;
