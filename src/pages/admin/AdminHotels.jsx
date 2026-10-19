import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminHotels() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        phone: "",
        description: "",
        address: "",
        image: "",
        rating: "",
        delivery_time: "",
        location: "",
        is_active: true,
    });

    // ==============================
    // API CONFIG
    // ==============================

    const getConfig = () => {
        const token = localStorage.getItem("admin_token");

        return {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
    };

    // ==============================
    // FETCH HOTELS
    // ==============================

    const fetchHotels = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "http://10.0.2.2:8000/api/admin/hotels",
                getConfig()
            );

            console.log("Hotels:", response.data);

            setHotels(response.data.hotels || []);
        } catch (error) {
            console.error(
                "Failed to load hotels:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Failed to load hotels."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    // ==============================
    // FORM INPUT
    // ==============================

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // ==============================
    // OPEN ADD MODAL
    // ==============================

    const handleAdd = () => {
        setEditingHotel(null);

        setFormData({
            name: "",
            type: "",
            phone: "",
            description: "",
            address: "",
            image: "",
            rating: "",
            delivery_time: "",
            location: "",
            is_active: true,
        });

        setShowModal(true);
    };

    // ==============================
    // OPEN EDIT MODAL
    // ==============================

    const handleEdit = (hotel) => {
        setEditingHotel(hotel);

        setFormData({
            name: hotel.name || "",
            type: hotel.type || "",
            phone: hotel.phone || "",
            description: hotel.description || "",
            address: hotel.address || "",
            image: hotel.image || "",
            rating: hotel.rating || "",
            delivery_time: hotel.delivery_time || "",
            location: hotel.location || "",
            is_active:
                hotel.is_active === true ||
                hotel.is_active === 1,
        });

        setShowModal(true);
    };

    // ==============================
    // SAVE HOTEL
    // ==============================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                name: formData.name,
                type: formData.type || null,
                phone: formData.phone || null,
                description: formData.description || null,
                address: formData.address || null,
                image: formData.image || null,
                rating:
                    formData.rating === ""
                        ? null
                        : Number(formData.rating),
                delivery_time: formData.delivery_time || null,
                location: formData.location || null,
                is_active: formData.is_active,
            };

            let response;

            if (editingHotel) {
                response = await axios.put(
                    `http://10.0.2.2:8000/api/admin/hotels/${editingHotel.id}`,
                    data,
                    getConfig()
                );
            } else {
                response = await axios.post(
                    "http://10.0.2.2:8000/api/admin/hotels",
                    data,
                    getConfig()
                );
            }

            console.log("Save hotel response:", response.data);

            alert(
                editingHotel
                    ? "Hotel updated successfully!"
                    : "Hotel added successfully!"
            );

            setShowModal(false);
            setEditingHotel(null);

            fetchHotels();

        } catch (error) {
            console.error(
                "Hotel save error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                JSON.stringify(error.response?.data) ||
                "Failed to save hotel."
            );
        }
    };

    // ==============================
    // DELETE HOTEL
    // ==============================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this hotel?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(
                `http://10.0.2.2:8000/api/admin/hotels/${id}`,
                getConfig()
            );

            alert("Hotel deleted successfully!");

            fetchHotels();

        } catch (error) {
            console.error(
                "Delete hotel error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete hotel."
            );
        }
    };

    // ==============================
    // SEARCH
    // ==============================

    const filteredHotels = hotels.filter((hotel) => {
        const searchText = search.toLowerCase();

        return (
            hotel.name?.toLowerCase().includes(searchText) ||
            hotel.type?.toLowerCase().includes(searchText) ||
            hotel.address?.toLowerCase().includes(searchText) ||
            hotel.phone?.toLowerCase().includes(searchText)
        );
    });

    // ==============================
    // LOADING
    // ==============================

    if (loading) {
        return (
            <div className="admin-page">
                <div className="admin-page-heading">
                    <div>
                        <h1 className="dashboard-title">
                            Hotels
                        </h1>

                        <p className="dashboard-subtitle">
                            Manage hotels and their food menus
                        </p>
                    </div>
                </div>

                <div className="admin-panel">
                    <div className="text-center p-5">
                        <h5>Loading hotels...</h5>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>

            {/* =====================================
                PAGE HEADER
            ====================================== */}

            <div className="admin-page-heading">

                <div>
                    <h1 className="dashboard-title">
                        Hotels
                    </h1>

                    <p className="dashboard-subtitle">
                        Manage hotels and their food menus
                    </p>
                </div>

                <button
                    className="btn btn-warning"
                    onClick={handleAdd}
                >
                    + Add Hotel
                </button>

            </div>


            {/* =====================================
                HOTEL LIST
            ====================================== */}

            <div className="admin-panel">

                <div className="admin-panel-header">

                    <div>
                        <h3>
                            Hotel List
                        </h3>

                        <p>
                            All registered hotels
                        </p>
                    </div>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search hotel..."
                        style={{
                            maxWidth: "230px",
                        }}
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                {/* =====================================
                    TABLE
                ====================================== */}

                <div className="table-responsive">

                    <table className="table align-middle">

                        <thead>

                            <tr>

                                <th>#</th>

                                <th>Hotel</th>

                                <th>Type</th>

                                <th>Address</th>

                                <th>Phone</th>

                                <th>Rating</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredHotels.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center py-5"
                                    >
                                        No hotels found.
                                    </td>

                                </tr>

                            ) : (

                                filteredHotels.map((hotel) => (

                                    <tr key={hotel.id}>

                                        <td>
                                            {hotel.id}
                                        </td>


                                        {/* HOTEL */}

                                        <td>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                }}
                                            >

                                                {hotel.image ? (

                                                    <img
                                                        src={hotel.image}
                                                        alt={hotel.name}
                                                        style={{
                                                            width: "55px",
                                                            height: "55px",
                                                            objectFit: "cover",
                                                            borderRadius: "10px",
                                                        }}
                                                        onError={(e) => {
                                                            e.target.style.display =
                                                                "none";
                                                        }}
                                                    />

                                                ) : (

                                                    <div
                                                        style={{
                                                            width: "55px",
                                                            height: "55px",
                                                            borderRadius: "10px",
                                                            background:
                                                                "#f1f1f1",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            fontSize: "25px",
                                                        }}
                                                    >
                                                        ðŸ¨
                                                    </div>

                                                )}

                                                <strong>
                                                    {hotel.name}
                                                </strong>

                                            </div>

                                        </td>


                                        {/* TYPE */}

                                        <td>
                                            {hotel.type || "-"}
                                        </td>


                                        {/* ADDRESS */}

                                        <td>
                                            {hotel.address || "-"}
                                        </td>


                                        {/* PHONE */}

                                        <td>
                                            {hotel.phone || "-"}
                                        </td>


                                        {/* RATING */}

                                        <td>
                                            â­{" "}
                                            {hotel.rating ?? "0"}
                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            {hotel.is_active ? (

                                                <span className="status-badge status-success">
                                                    Active
                                                </span>

                                            ) : (

                                                <span
                                                    className="status-badge"
                                                    style={{
                                                        background:
                                                            "#f8d7da",
                                                        color:
                                                            "#842029",
                                                    }}
                                                >
                                                    Inactive
                                                </span>

                                            )}

                                        </td>


                                        {/* ACTION */}

                                        <td>

                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() =>
                                                    handleEdit(hotel)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    handleDelete(
                                                        hotel.id
                                                    )
                                                }
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


            {/* =====================================
                ADD / EDIT MODAL
            ====================================== */}

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
                            maxWidth: "700px",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            borderRadius: "16px",
                            padding: "30px",
                        }}
                    >

                        {/* MODAL HEADER */}

                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center",
                                marginBottom: "25px",
                            }}
                        >

                            <div>

                                <h3>
                                    {editingHotel
                                        ? "Edit Hotel"
                                        : "Add New Hotel"}
                                </h3>

                                <p
                                    style={{
                                        color: "#777",
                                        marginBottom: 0,
                                    }}
                                >
                                    Enter hotel details below
                                </p>

                            </div>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            ></button>

                        </div>


                        {/* FORM */}

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                {/* NAME */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Hotel Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* TYPE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Type
                                    </label>

                                    <input
                                        type="text"
                                        name="type"
                                        className="form-control"
                                        placeholder="5 Star Hotel"
                                        value={formData.type}
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* PHONE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        placeholder="0112345678"
                                        value={formData.phone}
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* RATING */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Rating
                                    </label>

                                    <input
                                        type="number"
                                        name="rating"
                                        className="form-control"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        placeholder="4.5"
                                        value={formData.rating}
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* ADDRESS */}

                                <div className="col-md-12 mb-3">

                                    <label className="form-label">
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        placeholder="Colombo 07"
                                        value={formData.address}
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* LOCATION */}

                                <div className="col-md-12 mb-3">

                                    <label className="form-label">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        className="form-control"
                                        placeholder="Colombo, Sri Lanka"
                                        value={
                                            formData.location
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* DELIVERY TIME */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Delivery Time
                                    </label>

                                    <input
                                        type="text"
                                        name="delivery_time"
                                        className="form-control"
                                        placeholder="30 - 40 mins"
                                        value={
                                            formData.delivery_time
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* IMAGE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Image URL
                                    </label>

                                    <input
                                        type="text"
                                        name="image"
                                        className="form-control"
                                        placeholder="https://..."
                                        value={formData.image}
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="col-md-12 mb-3">

                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Hotel description..."
                                        value={
                                            formData.description
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    ></textarea>

                                </div>


                                {/* ACTIVE */}

                                <div className="col-md-12 mb-3">

                                    <div className="form-check">

                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            className="form-check-input"
                                            id="hotelActive"
                                            checked={
                                                formData.is_active
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <label
                                            className="form-check-label"
                                            htmlFor="hotelActive"
                                        >
                                            Hotel is Active
                                        </label>

                                    </div>

                                </div>

                            </div>


                            {/* BUTTONS */}

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "flex-end",
                                    gap: "10px",
                                    marginTop: "10px",
                                }}
                            >

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                >
                                    {editingHotel
                                        ? "Update Hotel"
                                        : "Save Hotel"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default AdminHotels;
