const express = require("express");
const { getSnippetById,createSnippet,getAllPublicSnippets, getSnippets, getUserPublicSnippets, deleteSnippet, updateSnippet } = require("../controllers/snippetController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", auth, createSnippet);
router.get("/", auth, getSnippets);
router.get("/public", getAllPublicSnippets);
router.get("/:id", auth, getSnippetById);
router.get("/public/mine", auth, getUserPublicSnippets);
router.put("/:id", auth, updateSnippet);
router.delete("/:id", auth, deleteSnippet);

module.exports = router;
