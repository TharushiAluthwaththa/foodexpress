import React from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const admin = JSON.parse(
    localStorage.getItem("admin_user") || "null"
  );

  const logout = () => {
    // Remove ONLY admin login data
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    // Go back to customer Home
    navigate("/");

    // Refresh customer Navbar
    window.location.reload();
  };

  const menu = [
    ["📊", "Dashboard", "/admin/dashboard"],
    ["👥", "Customers", "/admin/customers"],
    ["🛒", "Orders", "/admin/orders"],
    ["🍽️", "Restaurants", "/admin/restaurants"],
    ["🏨", "Hotels", "/admin/hotels"],
    ["🍔", "Foods", "/admin/foods"],
    ["💰", "Revenue", "/admin/revenue"],
    ["⚙️", "Settings", "/admin/settings"],
  ];

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        {/* LOGO */}
        <div className="admin-brand">
          <div className="admin-brand-icon">
            🍔
          </div>

          <div>
            <h2>FoodExpress</h2>
            <span>ADMIN PANEL</span>
          </div>
        </div>

        {/* MENU TITLE */}
        <div className="admin-menu-label">
          MAIN MENU
        </div>

        {/* MENU */}
        <nav className="admin-nav">

          {menu.map(([icon, name, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `admin-nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="admin-nav-icon">
                {icon}
              </span>

              <span>{name}</span>
            </NavLink>
          ))}

        </nav>



        

        {/* BOTTOM AREA */}
        <div className="admin-bottom">

          {/* ADMIN PROFILE */}
          <div className="admin-profile">

            <div className="admin-avatar">
              👤
            </div>

            <div>
              <strong>
                {admin?.name || "Administrator"}
              </strong>

              <small>
                {admin?.email || "Admin Account"}
              </small>
            </div>

          </div>

          {/* LOGOUT BUTTON */}
          <button
            type="button"
            className="admin-logout"
            onClick={logout}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* MAIN AREA */}
      <main className="admin-main">

        {/* TOP BAR */}
        <header className="admin-topbar">

          <div>
            <h3>Dashboard</h3>

            <p>
              Welcome back! Here's what's happening today.
            </p>
          </div>



      
        
<div className="admin-top-right">

  {/* Notification */}
  <button
    type="button"
    className="notification-btn"
  >
    🔔
  </button>

  {/* ADMIN PROFILE */}
  <div className="admin-profile-dropdown">

    <button
      type="button"
      className="top-admin-profile-btn"
    >
      <div className="top-admin-avatar">
        👤
      </div>

      <div className="top-admin-info">
        <strong>Admin</strong>
        <small>Administrator</small>
      </div>

      <span className="profile-arrow">
        ▾
      </span>
    </button>

    {/* DROPDOWN */}
    <div className="admin-profile-menu">

      <div className="profile-menu-header">
        <div className="profile-menu-avatar">
          👤
        </div>

        <div>
          <strong>Admin</strong>
          <small>Administrator</small>
        </div>
      </div>

      <hr />

      <button
        type="button"
        className="profile-menu-item logout-item"
        onClick={() => {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");

          window.location.href = "/";
        }}
      >
        <span>🚪</span>
        <span>Logout</span>
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