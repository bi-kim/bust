import React, { Component } from 'react';
import logo from '../../images/logo@2x.png';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img className="d-inline-block align-top" height="32" src={logo} alt={this.props.name} title={this.props.name}/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="">{this.props.DEPT_NAME}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">{this.props.SCHL_NAME}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">{this.props.STAT_NAME}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">{this.props.USER_NAME}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">{this.props.USER_NUMB}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">{this.props.uuid}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">{this.props.sid}</a>
                    </li>

                    {/*
                    @ 삭제하거나 수정해서 써야할 코드.
                    <li className="nav-item active">
                        <a className="nav-link" href="">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="">Disabled</a>
                    </li> */}
                </ul>
            </div>
        </nav>
        );
    }
}

export default Navbar;