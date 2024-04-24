import Trends from "../Models/Trends.schema.js";

export const getAllTrends = async (req, res) => {
  try {
    const trends = await Trends.find();
    res.json(trends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTrend = async (req, res) => {
  const { title, date, excerpt, image } = req.body;

  const newTrend = new Trends({
    title,
    date,
    excerpt,
    image,
  });

  try {
    const savedTrend = await newTrend.save();
    res.status(201).json(savedTrend);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTrend = async (req, res) => {
  const { id } = req.params;
  const { title, date, excerpt, image } = req.body;

  try {
    const updatedTrend = await Trends.findByIdAndUpdate(
      id,
      {
        title,
        date,
        excerpt,
        image,
      },
      { new: true }
    );

    if (!updatedTrend) {
      return res.status(404).json({ message: "Trend not found" });
    }

    res.json(updatedTrend);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
