import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    roomType: "Single",
    attachedToilet: false,
  });
  const [editingRoomId, setEditingRoomId] = useState(null);

  // Fetch rooms from backend
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/rooms");
      setRooms(res.data.data);
    } catch (e) {
      setError("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle add or update room
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (editingRoomId) {
        // Update room
        await axios.put(`/api/rooms/${editingRoomId}`, form);
      } else {
        // Create room
        await axios.post("/api/rooms", form);
      }
      setForm({
        name: "",
        description: "",
        price: "",
        roomType: "Single",
        attachedToilet: false,
      });
      setEditingRoomId(null);
      fetchRooms();
    } catch (e) {
      setError("Failed to save room");
    } finally {
      setLoading(false);
    }
  };

  // Edit room click
  const startEditing = (room) => {
    setForm({
      name: room.name,
      description: room.description,
      price: room.price,
      roomType: room.roomType,
      attachedToilet: room.attachedToilet,
    });
    setEditingRoomId(room._id);
  };

  // Delete room
  const deleteRoom = async (id) => {
    try {
      await axios.delete(`/api/rooms/${id}`);
      fetchRooms();
    } catch {
      setError("Failed to delete room");
    }
  };

  // Toggle availability
  const toggleAvailability = async (id) => {
    try {
      await axios.patch(`/api/rooms/toggle-availability/${id}`);
      fetchRooms();
    } catch {
      setError("Failed to toggle availability");
    }
  };

  return (
    <div>
      <h1>Admin Room Management</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Room form */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Room Name"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <select
          name="roomType"
          value={form.roomType}
          onChange={handleInputChange}
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
        </select>
        <label>
          <input
            name="attachedToilet"
            type="checkbox"
            checked={form.attachedToilet}
            onChange={handleInputChange}
          />
          Attached Toilet
        </label>
        <button type="submit" disabled={loading}>
          {editingRoomId ? "Update Room" : "Add Room"}
        </button>
        {editingRoomId && (
          <button
            type="button"
            onClick={() => {
              setForm({
                name: "",
                description: "",
                price: "",
                roomType: "Single",
                attachedToilet: false,
              });
              setEditingRoomId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Rooms list */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Attached Toilet</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.name}</td>
                <td>{room.price}</td>
                <td>{room.roomType}</td>
                <td>{room.attachedToilet ? "Yes" : "No"}</td>
                <td>{room.isAvailable ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => startEditing(room)}>Edit</button>
                  <button onClick={() => deleteRoom(room._id)}>Delete</button>
                  <button onClick={() => toggleAvailability(room._id)}>
                    Toggle Availability
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
