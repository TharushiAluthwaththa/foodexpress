import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const customer = JSON.parse(
    localStorage.getItem("customer_user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer_user");

    setUserMenuOpen(false);
    setMenuOpen(false);

    navigate("/");
    window.location.reload();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="food-navbar">
      <div className="container">
        <div className="navbar-inner">

          {/* =========================
              LOGO
          ========================== */}
          <Link
            to="/"
            className="food-logo"
            onClick={closeMenu}
          >
            <span>🍔</span>
            Food<span>Express</span>
          </Link>


          {/* =========================
              DESKTOP / MOBILE NAV
          ========================== */}
          <div
            className={`food-nav-links ${
              menuOpen ? "mobile-menu-open" : ""
            }`}
          >
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>

            <Link to="/restaurants" onClick={closeMenu}>
              🍽️ Restaurants
            </Link>

            <Link to="/hotels" onClick={closeMenu}>
              🏨 Hotels
            </Link>

            {/* Mobile only */}
            <div className="mobile-menu-cart">
              <Link to="/cart" onClick={closeMenu}>
                🛒 Cart
              </Link>
            </div>

            {/* Mobile only auth buttons */}
            {!customer && (
              <div className="mobile-auth-buttons">
                <Link
                  to="/login"
                  className="mobile-login-btn"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="mobile-register-btn"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>


          {/* =========================
              RIGHT SIDE
          ========================== */}
          <div className="navbar-right">

            {/* CART */}
            <Link
              to="/cart"
              className="cart-button"
            >
              🛒
              <span>Cart</span>
            </Link>


            {/* =========================
                CUSTOMER LOGGED IN
            ========================== */}
            {customer ? (
              <div className="user-dropdown">

                <button
                  type="button"
                  className="user-button"
                  onClick={() =>
                    setUserMenuOpen(!userMenuOpen)
                  }
                >
                  <div className="user-avatar">
                    {customer.name
                      ? customer.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>

                  <span className="user-name">
                    {customer.name}
                  </span>

                  <small
                    className={`user-arrow ${
                      userMenuOpen ? "open" : ""
                    }`}
                  >
                    ⌄
                  </small>
                </button>


                {/* USER DROPDOWN */}
                <div
                  className={`dropdown-menu-custom ${
                    userMenuOpen ? "show" : ""
                  }`}
                >

                  <div className="dropdown-user-info">

                    <div className="user-avatar large">
                      {customer.name
                        ? customer.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>

                    <div className="dropdown-user-text">
                      <strong>
                        {customer.name}
                      </strong>

                      <small>
                        {customer.email}
                      </small>
                    </div>

                  </div>

                  <hr />

                  <Link
                    to="/orders"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    📦 My Orders
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    🛒 My Cart
                  </Link>

                  <button
                    type="button"
                    onClick={logout}
                  >
                    🚪 Logout
                  </button>

                </div>
              </div>
            ) : (

              /* =========================
                 DESKTOP AUTH BUTTONS
              ========================== */
              <div className="auth-buttons">

                <Link
                  to="/login"
                  className="login-btn"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="register-btn"
                >
                  Sign Up
                </Link>

              </div>
            )}


            {/* =========================
                MOBILE MENU BUTTON
            ========================== */}
            <button
              type="button"
              className={`mobile-menu-button ${
                menuOpen ? "active" : ""
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
