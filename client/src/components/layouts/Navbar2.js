import React, { Component } from 'react';

import M from "materialize-css";// import materialize. M is the alias of materialize

//Navbar For Students
export class Navbar2 extends Component {
    componentDidMount() {

        //To make it float at right
        const elem = document.querySelector(".sidenav");
        const instance = M.Sidenav.init(elem, {
            edge: "right",
            inDuration: 250
        });

        //DropDown
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {
            alignment: 'left',
        });

    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper" style={{ backgroundColor: "#820101" }}>
                        <a href="#" className="brand-logo">SOA Web Portal</a>
                        {/* Hamburger Trigger */}
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>

                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#">Home</a></li>


                            <li><a href="#">Activities</a></li>
                            <li><a href="#">Events</a></li>
                            <li><a href="#">Assessments</a></li>
                            {/* DropDown */}
                            <li>
                                <a href="#" className="dropdown-trigger" data-target="dropdown-settings">
                                    <i className="fa fa-cog fa-2x text-white" aria-hidden="true"></i>
                                    <i class="material-icons right">arrow_drop_down</i>
                                </a>
                            </li>
                        </ul>


                    </div>
                </nav>

                {/* LostandFound DropDown */}
                <ul id="dropdown-settings" className="dropdown-content">
                    <li><a href="#" className="black-text">Downloadable Files</a></li>
                    <li class="divider"></li>
                    <li><a href="#" className="black-text">Logout</a></li>

                </ul>




                <ul className="sidenav" id="mobile-demo" edge="right">
                    <li><a href="#">Home</a></li>
                    {/* DropDown */}
                    <li><a href="#">Activities</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Assessments</a></li>
                    {/* DropDown */}
                    <li><a href="#"></a></li>
                    <li class="divider"></li>
                    <br></br>
                    <li><a href="#" className="black-text">Downloadable Files</a></li>
                    <li><a href="#" className="black-text">Logout</a></li>

                </ul>
            </div>
        )
    }
}

export default Navbar2;
