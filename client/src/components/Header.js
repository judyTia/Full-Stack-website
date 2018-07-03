import React, { Component } from 'react';
import { connect } from 'react-redux';
class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return ;
            case false:
                return <li><a href="/auth/mygoogle">Login with Google</a></li>;
            default:
                return <li><a>Logout</a></li>;
        }
    }
    render() {
        console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="brand-logo left">
                        Emaily
                    </a>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
            </div>
            </nav>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Header);