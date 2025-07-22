// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { getAuthHeaders } from "../utils/auth";

// export default function MySnippets() {
//   const [snippets, setSnippets] = useState([]);

//   useEffect(() => {
//     const fetchSnippets = async () => {
//       try {
//         const res = await axios.get("/api/snippets", getAuthHeaders());
//         setSnippets(res.data);
//       } catch {
//         alert("Error loading snippets");
//       }
//     };
//     fetchSnippets();
//   }, []);

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-white">My Snippets</h2>
//       <div className="grid gap-4">
//         {snippets.map((s) => (
//           <div key={s._id} className="bg-gray-800 p-4 rounded shadow text-white">
//             <h3 className="text-xl font-semibold">{s.title}</h3>
//             <pre className="bg-gray-900 p-2 mt-2 rounded overflow-x-auto">{s.code}</pre>
//             <p className="text-sm mt-1 text-gray-400">Language: {s.language}</p>
//             <p className="text-sm">Tags: {s.tags.join(", ")}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
