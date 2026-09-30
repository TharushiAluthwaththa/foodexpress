import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-5">

      <div className="container">

        <div className="row">

          <div className="col-md-5 mb-4">

            <h4 className="text-warning fw-bold">
              🍔 FoodExpress
            </h4>

            <p className="text-secondary mt-3">
              Delicious food from your favorite restaurants
              and hotels, delivered straight to your door.
            </p>

          </div>

          <div className="col-md-3 mb-4">

            <h6 className="fw-bold">
              Quick Links
            </h6>

            <div className="d-flex flex-column gap-2 mt-3">

              <Link
                className="text-white text-decoration-none"
                to="/"
              >
                Home
              </Link>

              <Link
                className="text-white text-decoration-none"
                to="/restaurants"
              >
                Restaurants
              </Link>

              <Link
                className="text-white text-decoration-none"
                to="/hotels"
              >
                Hotels
              </Link>

            </div>

          </div>

          <div className="col-md-4">

            <h6 className="fw-bold">
              Customer
            </h6>

            <div className="d-flex flex-column gap-2 mt-3">

              <Link
                className="text-white text-decoration-none"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="text-white text-decoration-none"
                to="/register"
              >
                Register
              </Link>

              <Link
                className="text-white text-decoration-none"
                to="/orders"
              >
                My Orders
              </Link>

            </div>

          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center">

          <small className="text-secondary">
            © 2026 FoodExpress. All rights reserved.
          </small>

        </div>

      </div>

    </footer>
  );
}

export default Footer;