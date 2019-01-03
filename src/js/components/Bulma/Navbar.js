import React from 'react'

export class Navbar extends React.Component {
  /**
   * Has Brand or Logo
   * @returns {boolean}
   */
  hasBrandOrLogo () {
    return (typeof this.props.brand !== "undefined" || typeof  this.props.brandLogo !== "undefined")
  }

  /**
   * Render brand.
   * @returns {*}
   */
  renderBrand () {
    if (!this.hasBrandOrLogo()) {
      return ''
    }

    let brandLogo = ''
    if (typeof this.props.brandLogo !== "undefined") {
      brandLogo = <img src={this.props.brandLogo} alt="Logo" width="112" height="28" />
    }
    let brand = ''
    if (typeof this.props.brand !== "undefined") {
      brand = this.props.brand
    }

    return (
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          {brandLogo}{brand}
        </a>
      </div>
    )
  }

  /**
   * Render the Navbar component.
   * @returns {*}
   */
  render () {
    let brand = this.renderBrand()

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          {brand}
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
            </div>

            <div className="navbar-end">
            </div>
          </div>
      </nav>
    )
  }
}