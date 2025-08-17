import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hook/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaUserShield,
  FaUtensils,
  FaHandsHelping,
  FaTrash,
  FaSearch,
  FaUserTimes,
} from "react-icons/fa";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const ManageUsers = () => {
  const [emailQuery, setEmailQuery] = useState("");
  const queryClient = useQueryClient();
  const axiossecure = useAxiosSecure();
  const axiosSecure = useAxios();
  useEffect(() => {
    document.title = "Manage Users";
  }, []);
  // All users fetch
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiossecure.get("/admin/users");
      return res.data;
    },
  });

  // Search users by email
  const {
    data: searchedUsers = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedUsers", emailQuery],
    enabled: !!emailQuery,
    queryFn: async () => {
      const res = await axiossecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  // Update Role
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }) =>
      axiossecure.patch(`/admin/users/${userId}/role`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire("Success", "User role updated successfully", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update user role", "error");
    },
  });

  // Delete User
  const deleteUserMutation = useMutation({
    mutationFn: (userId) => axiosSecure.delete(`/admin/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire("Success", "User deleted successfully", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete user", "error");
    },
  });

  const handleUpdateRole = (userId, role) => {
    Swal.fire({
      title: "Confirm Role Change",
      text: `Are you sure you want to change this user's role to ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ userId, role });
      }
    });
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(userId);
      }
    });
  };

  const displayUsers = emailQuery ? searchedUsers : allUsers;

  return (
    <section>
      <div className="p-6">
        <h2 className="text-2xl  nav-bite font-semibold mb-4">Manage Users</h2>

        <div className="flex gap-2 mb-6 items-center">
          <FaSearch className=" nav-bite" />
          <input
            type="text"
            className="input nav  nav-bite nav-b input-bordered w-full max-w-md"
            placeholder="Search user by email"
            value={emailQuery}
            onChange={(e) => setEmailQuery(e.target.value)}
          />
        </div>

        {isFetching && <p>Loading users...</p>}

        {!isFetching && displayUsers.length === 0 && emailQuery && (
          <p className="text-gray-500">No users found.</p>
        )}

        {displayUsers.length > 0 && (
          <div className="overflow-x-auto nav bg-white rounded-lg shadow">
            <table className="min-w-full table-zebra">
              <thead className="bg-gray-50 nav">
                <tr>
                  <th className="px-6  nav-bite py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-6  nav-bite py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6  nav-bite py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6  nav-bite py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white nav divide-y divide-gray-200">
                {displayUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              user.photoURL ||
                              "https://i.ibb.co/5GzXkwq/user.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm  nav-bite font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6  nav-bite py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6  nav-bite py-4 whitespace-nowrap">
                      <span
                        className={`px-2   inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "restaurant"
                            ? "bg-blue-100 text-blue-800"
                            : user.role === "charity"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateRole(user._id, "admin")}
                          disabled={user.role === "admin"}
                          className={`p-2 rounded-md ${
                            user.role === "admin"
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                          }`}
                          title="Make Admin"
                        >
                          <FaUserShield />
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateRole(user._id, "restaurant")
                          }
                          disabled={user.role === "restaurant"}
                          className={`p-2 rounded-md ${
                            user.role === "restaurant"
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          }`}
                          title="Make Restaurant"
                        >
                          <FaUtensils />
                        </button>
                        <button
                          onClick={() => handleUpdateRole(user._id, "charity")}
                          disabled={user.role === "charity"}
                          className={`p-2 rounded-md ${
                            user.role === "charity"
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-green-100 text-green-600 hover:bg-green-200"
                          }`}
                          title="Make Charity"
                        >
                          <FaHandsHelping />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageUsers;
