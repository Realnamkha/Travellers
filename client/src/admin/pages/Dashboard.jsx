import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomManagement = () => {
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

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/v1/rooms");
      setRooms(res.data.data);
      setError(null);
    } catch {
      setError("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingRoomId) {
        await axios.put(
          `http://localhost:8000/api/v1/rooms/update-room/${editingRoomId}`,
          form
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/v1/rooms/create-room",
          form
        );
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
      setError(null);
    } catch {
      setError("Failed to save room");
    } finally {
      setLoading(false);
    }
  };

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

  const deleteRoom = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/rooms/delete-room/${id}`
      );
      fetchRooms();
      setError(null);
    } catch {
      setError("Failed to delete room");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Room Management</h1>

      {error && (
        <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="name"
          >
            Room Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Room Name"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Description"
            rows={3}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="roomType"
          >
            Room Type
          </label>
          <select
            id="roomType"
            name="roomType"
            value={form.roomType}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="attachedToilet"
              checked={form.attachedToilet}
              onChange={handleInputChange}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="ml-2 text-gray-700 font-semibold">
              Attached Toilet
            </span>
          </label>
        </div>

        <div className="flex items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
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
              className="ml-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading rooms...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Type
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Attached Toilet
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No rooms found.
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {room.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.roomType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.attachedToilet ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => startEditing(room)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRoom(room._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoomManagement;
