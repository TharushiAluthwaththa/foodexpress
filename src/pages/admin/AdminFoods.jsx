import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminFoods() {
  const [foods, setFoods] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [editingFood, setEditingFood] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    hotel_id: "",
    restaurant_id: "",
    is_available: true,
  });

  const token = localStorage.getItem("admin_token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    fetchFoods();
    fetchHotels();
    fetchRestaurants();
  }, []);

  // =========================
  // GET FOODS
  // =========================
  const fetchFoods = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/foods",
        config
      );

      setFoods(response.data.foods || []);
    } catch (error) {
      console.error("Failed to load foods:", error.response?.data || error);
    }
  };

  // =========================
  // GET HOTELS
  // =========================
  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/hotels",
        config
      );

      setHotels(response.data.hotels || []);
    } catch (error) {
      console.error("Failed to load hotels:", error.response?.data || error);
    }
  };

  // =========================
  // GET RESTAURANTS
  // =========================
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/restaurants",
        config
      );

      setRestaurants(response.data.restaurants || []);
    } catch (error) {
      console.error(
        "Failed to load restaurants:",
        error.response?.data || error
      );
    }
  };

  // =========================
  // FORM CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // =========================
  // OPEN ADD
  // =========================
  const openAddModal = () => {
    setEditingFood(null);

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      hotel_id: "",
      restaurant_id: "",
      is_available: true,
    });

    setShowModal(true);
  };

  // =========================
  // OPEN EDIT
  // =========================
  const openEditModal = (food) => {
    setEditingFood(food);

    setForm({
      name: food.name || "",
      description: food.description || "",
      price: food.price || "",
      category: food.category || "",
      image: food.image || "",
      hotel_id: food.hotel_id || "",
      restaurant_id: food.restaurant_id || "",
      is_available: food.is_available ?? true,
    });

    setShowModal(true);
  };

  // =========================
  // SAVE FOOD
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        image: form.image || null,
        hotel_id: form.hotel_id ? Number(form.hotel_id) : null,
        restaurant_id: form.restaurant_id
          ? Number(form.restaurant_id)
          : null,
        is_available: form.is_available,
      };

      if (!data.hotel_id && !data.restaurant_id) {
        alert("Please select a hotel or restaurant.");
        return;
      }

      if (editingFood) {
        await axios.put(
          `http://127.0.0.1:8000/api/admin/foods/${editingFood.id}`,
          data,
          config
        );

        alert("Food updated successfully!");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/admin/foods",
          data,
          config
        );

        alert("Food added successfully!");
      }

      setShowModal(false);
      fetchFoods();
    } catch (error) {
      console.error("Food save error:", error.response?.data || error);

      alert(
        error.response?.data?.message ||
          "Failed to save food. Check console."
      );
    }
  };

  // =========================
  // DELETE FOOD
  // =========================
  const deleteFood = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/admin/foods/${id}`,
        config
      );

      alert("Food deleted successfully!");

      fetchFoods();
    } catch (error) {
      console.error("Delete error:", error.response?.data || error);

      alert(
        error.response?.data?.message ||
          "Failed to delete food."
      );
    }
  };

  // =========================
  // SEARCH
  // =========================
  const filteredFoods = foods.filter((food) => {
    const text = search.toLowerCase();

    return (
      food.name?.toLowerCase().includes(text) ||
      food.category?.toLowerCase().includes(text) ||
      food.hotel?.name?.toLowerCase().includes(text) ||
      food.restaurant?.name?.toLowerCase().includes(text)
    );
  });

  return (
    <div>
      {/* HEADER */}
      <div className="admin-page-heading">
        <div>
          <h1 className="dashboard-title">Foods</h1>

          <p className="dashboard-subtitle">
            Manage hotel and restaurant foods
          </p>
        </div>

        <button
          className="btn btn-warning"
          onClick={openAddModal}
        >
          + Add Food
        </button>
      </div>

      {/* PANEL */}
      <div className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h3>Food List</h3>

            <p>
              All available hotel and restaurant foods
            </p>
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "250px" }}
          />
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Category</th>
                <th>Price</th>
                <th>Hotel</th>
                <th>Restaurant</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredFoods.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No foods found.
                  </td>
                </tr>
              ) : (
                filteredFoods.map((food) => (
                  <tr key={food.id}>
                    <td>{food.id}</td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        {food.image ? (
                          <img
                            src={food.image}
                            alt={food.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : null}

                        <strong>{food.name}</strong>
                      </div>
                    </td>

                    <td>
                      {food.category || "-"}
                    </td>

                    <td>
                      Rs. {Number(food.price || 0).toFixed(2)}
                    </td>

                    <td>
                      {food.hotel?.name || "-"}
                    </td>

                    <td>
                      {food.restaurant?.name || "-"}
                    </td>

                    <td>
                      {food.is_available ? (
                        <span className="status-badge status-success">
                          Available
                        </span>
                      ) : (
                        <span className="status-badge status-danger">
                          Unavailable
                        </span>
                      )}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => openEditModal(food)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteFood(food.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: "650px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "15px",
              padding: "25px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="mb-1">
                  {editingFood ? "Edit Food" : "Add Food"}
                </h3>

                <small className="text-muted">
                  Manage food details
                </small>
              </div>

              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* FOOD NAME */}
              <div className="mb-3">
                <label className="form-label">
                  Food Name *
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* CATEGORY */}
              <div className="mb-3">
                <label className="form-label">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  className="form-control"
                  placeholder="Burger, Pizza, Chicken..."
                  value={form.category}
                  onChange={handleChange}
                />
              </div>

              {/* PRICE */}
              <div className="mb-3">
                <label className="form-label">
                  Price *
                </label>

                <input
                  type="number"
                  name="price"
                  className="form-control"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mb-3">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* HOTEL */}
              <div className="mb-3">
                <label className="form-label">
                  Hotel
                </label>

                <select
                  name="hotel_id"
                  className="form-select"
                  value={form.hotel_id}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      hotel_id: e.target.value,
                      restaurant_id: "",
                    });
                  }}
                >
                  <option value="">
                    -- Select Hotel --
                  </option>

                  {hotels.map((hotel) => (
                    <option
                      key={hotel.id}
                      value={hotel.id}
                    >
                      {hotel.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* RESTAURANT */}
              <div className="mb-3">
                <label className="form-label">
                  Restaurant
                </label>

                <select
                  name="restaurant_id"
                  className="form-select"
                  value={form.restaurant_id}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      restaurant_id: e.target.value,
                      hotel_id: "",
                    });
                  }}
                >
                  <option value="">
                    -- Select Restaurant --
                  </option>

                  {restaurants.map((restaurant) => (
                    <option
                      key={restaurant.id}
                      value={restaurant.id}
                    >
                      {restaurant.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* IMAGE */}
              <div className="mb-3">
                <label className="form-label">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  className="form-control"
                  placeholder="https://..."
                  value={form.image}
                  onChange={handleChange}
                />
              </div>

              {/* AVAILABLE */}
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="is_available"
                  className="form-check-input"
                  id="is_available"
                  checked={form.is_available}
                  onChange={handleChange}
                />

                <label
                  className="form-check-label"
                  htmlFor="is_available"
                >
                  Food is available
                </label>
              </div>

              {/* BUTTONS */}
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-warning"
                >
                  {editingFood
                    ? "Update Food"
                    : "Save Food"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminFoods;