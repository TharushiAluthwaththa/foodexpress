
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminRestaurants() {

  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [editRestaurant, setEditRestaurant] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    image: "",
  });


  const headers = () => {

    const token = localStorage.getItem("admin_token");

    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

  };


  useEffect(() => {

    fetchRestaurants();

  }, []);


  const fetchRestaurants = async () => {

    try {

      const response = await axios.get(
        "http://10.0.2.2:8000/api/admin/restaurants",
        {
          headers: headers(),
        }
      );

      setRestaurants(
        response.data.restaurants || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editRestaurant) {

        await axios.put(
          `http://10.0.2.2:8000/api/admin/restaurants/${editRestaurant.id}`,
          form,
          {
            headers: headers(),
          }
        );

        alert(
          "Restaurant updated successfully."
        );

      } else {

        await axios.post(
          "http://10.0.2.2:8000/api/admin/restaurants",
          form,
          {
            headers: headers(),
          }
        );

        alert(
          "Restaurant added successfully."
        );

      }

      resetForm();

      fetchRestaurants();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to save restaurant."
      );

    }

  };


  const edit = (restaurant) => {

    setEditRestaurant(restaurant);

    setForm({
      name: restaurant.name || "",
      description: restaurant.description || "",
      address: restaurant.address || "",
      phone: restaurant.phone || "",
      image: restaurant.image || "",
    });

    setShowForm(true);

  };


  const deleteRestaurant = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this restaurant?"
      )
    ) {
      return;
    }

    try {

      await axios.delete(
        `http://10.0.2.2:8000/api/admin/restaurants/${id}`,
        {
          headers: headers(),
        }
      );

      alert(
        "Restaurant deleted successfully."
      );

      fetchRestaurants();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete restaurant."
      );

    }

  };


  const resetForm = () => {

    setShowForm(false);

    setEditRestaurant(null);

    setForm({
      name: "",
      description: "",
      address: "",
      phone: "",
      image: "",
    });

  };


  return (

    <div>

      <div className="admin-page-title">

        <div>

          <h1>
            Restaurants
          </h1>

          <p>
            Add, edit and manage restaurants.
          </p>

        </div>

        <button
          className="btn btn-warning"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          âž• Add Restaurant
        </button>

      </div>


      {/* FORM */}

      {showForm && (

        <div className="admin-panel mb-4">

          <div className="admin-panel-header">

            <h3>
              {editRestaurant
                ? "Edit Restaurant"
                : "Add Restaurant"
              }
            </h3>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>
                  Restaurant Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                />

              </div>


              <div className="col-md-6 mb-3">

                <label>
                  Phone
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                />

              </div>


              <div className="col-md-12 mb-3">

                <label>
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                />

              </div>


              <div className="col-md-12 mb-3">

                <label>
                  Address
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                />

              </div>


              <div className="col-md-12 mb-3">

                <label>
                  Image URL
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={form.image}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      image: e.target.value,
                    })
                  }
                />

              </div>

            </div>


            <button
              type="submit"
              className="btn btn-warning me-2"
            >
              {editRestaurant
                ? "Update Restaurant"
                : "Add Restaurant"
              }
            </button>


            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>

          </form>

        </div>

      )}


      {/* RESTAURANTS TABLE */}

      <div className="admin-panel">

        <div className="admin-panel-header">

          <h3>
            All Restaurants ({restaurants.length})
          </h3>

        </div>


        {loading ? (

          <div className="admin-loading">
            Loading restaurants...
          </div>

        ) : restaurants.length === 0 ? (

          <div className="empty-admin-data">
            No restaurants found.
          </div>

        ) : (

          <table className="admin-table">

            <thead>

              <tr>

                <th>ID</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
                <th>ACTIONS</th>

              </tr>

            </thead>


            <tbody>

              {restaurants.map(
                (restaurant) => (

                  <tr key={restaurant.id}>

                    <td>
                      #{restaurant.id}
                    </td>

                    <td>
                      <strong>
                        {restaurant.name}
                      </strong>
                    </td>

                    <td>
                      {restaurant.phone || "-"}
                    </td>

                    <td>
                      {restaurant.address || "-"}
                    </td>

                    <td>

                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() =>
                          edit(restaurant)
                        }
                      >
                        âœï¸ Edit
                      </button>


                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          deleteRestaurant(
                            restaurant.id
                          )
                        }
                      >
                        ðŸ—‘ï¸ Delete
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default AdminRestaurants;
