import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api";

export default function Users() {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await API.get("/auth/users");
        setUsers(res.data);
        setError("");
      } catch (err) {
        setError("Error fetching users: " + (err.response?.data?.error || err.message));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (auth) {
      fetchUsers();
    }
  }, [auth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {users.map((user) => (
              <li key={user.id} className="py-3 flex justify-between items-center">
                <span className="text-gray-800">{user.email}</span>
                <span className="text-sm text-gray-500">ID: {user.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
