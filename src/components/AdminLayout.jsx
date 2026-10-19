import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    setSidebarOpen(false);

    navigate("/");
  };

  return (
    <div className="admin-container">

      {/* OVERLAY */}
      <div
        className={`admin-sidebar-overlay ${
          sidebarOpen ? "active" : ""
        }`}
        onClick={closeSidebar}
      ></div>


      {/* SIDEBAR */}
      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "active" : ""
        }`}
      >

        {/* BRAND */}
        <div className="admin-brand">

          <div className="admin-brand-icon">
            🍔
          </div>

          <div>
            <h2>FoodExpress</h2>
            <span>ADMIN PANEL</span>
          </div>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            ✕
          </button>

        </div>


        {/* MENU LABEL */}
        <div className="admin-menu-label">
          MAIN MENU
        </div>


        {/* NAVIGATION */}
        <nav className="admin-nav">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `admin-nav-item ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <span className="admin-nav-icon">
              📊
            </span>

            <span>
              Dashboard
            </span>
          </NavLink>


          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              `admin-nav-item ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <span className="admin-nav-icon">
              👥
            </span>

            <span>
              Customers
            </span>
          </NavLink>


          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `admin-nav-item ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <span className="admin-nav-icon">
              🛒
            </span>

            <span>
              Orders
            </span>
          </NavLink>


          <NavLink
            to="/admin/restaurants"
            className={({ isActive }) =>
              `admin-nav-item ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <span className="admin-nav-icon">
              🍽️
            </span>

            <span>
              Restaurants
            </span>
          </NavLink>


          <NavLink
            to="/admin/hotels"
            className={({ isActive }) =>
              `admin-nav-item ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <span className="admin-nav-icon">
              🏨
            </span>

            <span>
              Hotels
            </span>
          </NavLink>


          <NavLink
            to="/admin/foods"
            className={({ isActive }) =>
              `admin-nav-item ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <span className="admin-nav-icon">
              🍔
            </span>

            <span>
              Foods
            </span>
          </NavLink>


          <NavLink
            to="/admin/revenue"
            className={({ isActive }) =>
              `admin-nav-item ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <span className="admin-nav-icon">
              💰
            </span>

            <span>
              Revenue
            </span>
          </NavLink>


          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `admin-nav-item ${
                isActive ? "active" : ""
              }`
            }
            onClick={closeSidebar}
          >
            <span className="admin-nav-icon">
              ⚙️
            </span>

            <span>
              Settings
            </span>
          </NavLink>

        </nav>


        {/* BOTTOM */}
        <div className="admin-bottom">

          <div className="admin-profile">

            <div className="admin-avatar">
              👤
            </div>

            <div>
              <strong>
                Administrator
              </strong>

              <small>
                Admin
              </small>
            </div>

          </div>


          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* MAIN */}
      <main className="admin-main">

        {/* TOPBAR */}
        <header className="admin-topbar">

          <button
            type="button"
            className="admin-menu-toggle"
            onClick={toggleSidebar}
            aria-label="Open admin menu"
          >
            ☰
          </button>


          <div className="admin-top-title">

            <h3>
              Admin Panel
            </h3>

            <p>
              Manage your FoodExpress system
            </p>

          </div>


          <div className="admin-top-right">

            <button
              type="button"
              className="notification-btn"
            >
              🔔
            </button>


            <div className="admin-profile-dropdown">

              <button
                type="button"
                className="top-admin-profile-btn"
              >

                <div className="top-admin-avatar">
                  👤
                </div>

                <div className="top-admin-info">
                  <strong>
                    Administrator
                  </strong>

                  <small>
                    Admin
                  </small>
                </div>

                <span className="profile-arrow">
                  ▼
                </span>

              </button>


              <div className="admin-profile-menu">

                <div className="profile-menu-header">

                  <div className="profile-menu-avatar">
                    👤
                  </div>

                  <div>
                    <strong>
                      Administrator
                    </strong>

                    <small>
                      Administrator
                    </small>
                  </div>

                </div>


                <hr />


                <button
                  type="button"
                  className="profile-menu-item"
                  onClick={() => {
                    navigate("/admin/settings");
                  }}
                >
                  ⚙️
                  <span>
                    Settings
                  </span>
                </button>


                <button
                  type="button"
                  className="profile-menu-item logout-item"
                  onClick={handleLogout}
                >
                  🚪
                  <span>
                    Logout
                  </span>
                </button>

              </div>

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}
        <section className="admin-content">
          <Outlet />
        </section>

      </main>

    </div>
  );
}

export default AdminLayout;