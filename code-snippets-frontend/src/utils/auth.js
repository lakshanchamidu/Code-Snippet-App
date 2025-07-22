export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("🔐 Sending token:", token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
