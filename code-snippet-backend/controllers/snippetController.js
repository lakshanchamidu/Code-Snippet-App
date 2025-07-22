const Snippet = require("../models/Snippet");

const createSnippet = async (req, res) => {
  try {
    const { title, code, language, tags, description, isPublic } = req.body;
    const snippet = await Snippet.create({
      title,
      code,
      language,
      tags,
      description,
      isPublic,
      user: req.user._id,  
    });
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const getSnippets = async (req, res) => {
  try {
    console.log("📥 Request from user:", req.user); // Log the user making the request

    const snippets = await Snippet.find({ user: req.user._id }).sort({ createdAt: -1 });
    console.log("📄 Snippets found:", snippets);
    res.json(snippets);
  } catch (error) {
    console.error("❌ getSnippets error:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};


const getAllPublicSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (error) {
    console.error("createSnippet error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const getUserPublicSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({
      user: req.user._id,
      isPublic: true,
    });

    res.json(snippets);
  } catch (error) {
    console.error("getUserPublicSnippets error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, user: req.user._id });
    if (!snippet) {
      return res.status(404).json({ msg: "Snippet not found" });
    }
    res.json(snippet);
  } catch (error) {
    console.error("getSnippetById error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


const deleteSnippet = async (req, res) => {
  try {
    const deleted = await Snippet.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deleted) return res.status(404).json({ msg: "Snippet not found or not authorized" });
    res.json({ msg: "Deleted successfully" });
  } catch (error) {
    console.error("createSnippet error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const updateSnippet = async (req, res) => {
  try {
    const updated = await Snippet.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Snippet not found or not authorized" });
    res.json(updated);
  } catch (error) {
    console.error("updateSnippet error:", error); 
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  getSnippetById,
  createSnippet,
  getSnippets,
  getUserPublicSnippets,
  deleteSnippet,
  updateSnippet,
  getAllPublicSnippets,
};
