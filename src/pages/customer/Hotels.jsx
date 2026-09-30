
import React from "react";
import { Link } from "react-router-dom";

function Hotels() {
  const hotels = [
    {
      id: 1,
      name: "Grand Hotel",
      location: "Colombo",
      rating: "4.8",
      delivery: "25-35 min",
      emoji: "🏨",
    },
    {
      id: 2,
      name: "Ocean View Hotel",
      location: "Mount Lavinia",
      rating: "4.7",
      delivery: "30-40 min",
      emoji: "🌊",
    },
    {
      id: 3,
      name: "City Palace Hotel",
      location: "Kandy",
      rating: "4.9",
      delivery: "25-35 min",
      emoji: "🏰",
    },
  ];

  return (
    <div
      style={{
        background: "#fffaf2",
        minHeight: "80vh",
        padding: "60px 0",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <small
            style={{
              color: "#6c5ce7",
              fontWeight: "800",
              letterSpacing: "2px",
            }}
          >
            FOOD EXPRESS
          </small>

          <h1 className="fw-bold display-5">
            🏨 Hotels
          </h1>

          <p className="text-muted fs-5">
            Enjoy delicious meals from popular hotels.
          </p>
        </div>

        <div className="row g-4">
          {hotels.map((hotel) => (
            <div
              className="col-md-6 col-lg-4"
              key={hotel.id}
            >
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "22px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "220px",
                    background:
                      "linear-gradient(135deg,#6c5ce7,#0984e3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "110px",
                  }}
                >
                  {hotel.emoji}
                </div>

                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3 className="fw-bold">
                        {hotel.name}
                      </h3>

                      <p className="text-muted">
                        📍 {hotel.location}
                      </p>
                    </div>

                    <span
                      className="badge bg-warning text-dark"
                      style={{ height: "fit-content" }}
                    >
                      ⭐ {hotel.rating}
                    </span>
                  </div>

                  <div className="text-muted mb-4">
                    🛵 {hotel.delivery}
                  </div>

                  <Link
                    to={`/hotels/${hotel.id}`}
                    className="btn btn-primary w-100 py-2 fw-bold"
                  >
                    View Hotel Menu →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hotels;
