import React, { useState } from "react";

function AdminSettings() {

  const [name, setName] = useState("FoodExpress");
  const [email, setEmail] = useState("admin@foodexpress.com");
  const [phone, setPhone] = useState("0112345678");

  const handleSave = (e) => {

    e.preventDefault();

    alert("Settings saved successfully!");
  };

  return (
    <div>

      <div className="admin-page-heading">

        <div>

          <h1 className="dashboard-title">
            Settings
          </h1>

          <p className="dashboard-subtitle">
            Manage FoodExpress system settings
          </p>

        </div>

      </div>

      <div className="admin-panel">

        <div className="admin-panel-header">

          <div>

            <h3>
              General Settings
            </h3>

            <p>
              Update your system information
            </p>

          </div>

        </div>

        <form onSubmit={handleSave}>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label fw-semibold">
                Website Name
              </label>

              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label fw-semibold">
                Admin Email
              </label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label fw-semibold">
                Contact Phone
              </label>

              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-warning fw-bold"
          >
            💾 Save Settings
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminSettings;