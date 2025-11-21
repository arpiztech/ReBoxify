import { useEffect, useState } from "react";
import api from "../api/api";

const VendorContainers = () => {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/vendor/containers");
        setContainers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-3">My Containers</h1>

      {containers.map((c) => (
        <div key={c._id} className="border p-3 rounded mb-2">
          <p>ID: {c._id}</p>
          <p>Type: {c.type}</p>
          <p>Status: {c.status}</p>
        </div>
      ))}
    </div>
  );
};

export default VendorContainers;
