import { useState } from "react";
import api from "../api/api";

const AddContainer = () => {
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/vendor/add-container", { type });
      alert("Container added!");
      setType("");
    } catch (err) {
      alert("Error adding container");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add New Container</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          type="text"
          placeholder="Container Type"
          className="border p-2 w-full rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Container
        </button>
      </form>
    </div>
  );
};

export default AddContainer;
