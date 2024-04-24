import Dress from "../Models/Dress.schema.js";

export const apidress = async (req, res) => {
  try {
    res.status(200).send("Dresses API is working");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new dress
export const createDress = async (req, res) => {
  try {
    const dress = await Dress.create(req.body);
    // Send back the created dress as the response
    res.status(201).json(dress);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: error.message });
  }
};

// get all dress

export const getalldress = async (req, res) => {
  try {
    const dress = await Dress.find();
    res.json(dress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get dress by id

export const getdressbyid = async (req, res) => {
  try {
    const dress = await Dress.findById(req.params.id);
    if (!dress) {
      return res.status(404).json({ message: "Dress not found" });
    }
    res.json(dress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update dress

export const updatedress = async (req, res) => {
  try {
    const dress = await Dress.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!dress) {
      return res.status(404).json({ message: "Dress not found" });
    }
    res.json(dress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete dress by id

export const deletedress = async (req, res) => {
  try {
    const dress = await Dress.findByIdAndDelete(req.params.id);
    if (!dress) {
      return res.status(404).json({ message: "Dress not found" });
    }
    res.json({ message: "Dress deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addcart = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const newItem = new CartItem({ name, price, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
