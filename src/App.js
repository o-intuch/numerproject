import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Routing from './routes'


class App extends Component {
  render() {
    return (
      <div className="my-app">
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="http://localhost:3000">
                <img src={process.env.PUBLIC_URL + '/images/devahoy-text-logo.png'} alt="DEVAHOY LOGO" width="112" height="28" />
              </a>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <NavLink exact to="/root" activeClassName="is-active" className="navbar-item">Root of Eqaution</NavLink>
                <NavLink to="/linear" activeClassName="is-active" className="navbar-item">linear Equation</NavLink>
                <NavLink to="/Inter" activeClassName="is-active" className="navbar-item">Interpolation</NavLink>
                <NavLink to="/least" activeClassName="is-active" className="navbar-item">Least sqaures Regresstion</NavLink>
                {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                รายการ
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            
              </div>
            </div>
          </div>
        </nav>     
        <Routing />
      </div>
    )
  }
}

export default App
