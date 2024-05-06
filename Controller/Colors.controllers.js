import Color from "../Models/Color.schema.js";
export const createDress = async (req, res) => {
  try {
    const dresscolor = await Color.create(req.body);
    // Send back the created dress as the response
    res.status(201).json(dresscolor);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: error.message });
  }
};
export const getallcolordress = async (req, res) => {
  try {
    const dresscolor = await Color.find();
    res.json(dresscolor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};