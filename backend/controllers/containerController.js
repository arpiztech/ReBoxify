import Container from "../models/Container.js";

// Get all containers
export const listContainers = async (req, res) => {
  try {
    const containers = await Container.find().lean();
    res.json(containers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single container by ID
export const getContainer = async (req, res) => {
  try {
    const container = await Container.findById(req.params.id);

    if (!container) {
      return res.status(404).json({ message: "Container not found" });
    }

    res.json(container);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
