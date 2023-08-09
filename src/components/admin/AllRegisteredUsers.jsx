import React, { useEffect, useState } from "react";
import AdminLoading from "./AdminLoading";
import handleRequest from "../../utils/handleRequest";
import { useCookies } from "react-cookie";
// import { setUser } from "../../context/userSlice";
import { useSelector } from "react-redux";
import AdminUserCard from "./AdminUserCard";

const AllRegisteredUsers = () => {
  const [cookies, setCookies] = useCookies(["token"]);
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);

  console.log(cookies.token);
  const { user, userId } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await handleRequest(
        "GET",
        `/admin/getallusers?page=${page}&id=${user._id}`,
        {},
        cookies.token,
        user.role
      );
      console.log(response);
      setAllUsers(response.filteredUsers);
    };
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const deleteUser = async () => {
      const response = await handleRequest(
        "DELETE",
        `/admin/delete/${userId}`,
        {},
        cookies.token,
        user.role
      );
      const dleted = allUsers.filter(
        (user) => user._id.toString() !== userId.toString()
      );
      setAllUsers(dleted);
    };
    deleteUser();
  }, [userId]);

  return (
    <div className="bg-black min-h-screen text-gray-300  w-full">
      {/* <AdminLoading /> */}
      {allUsers.map((user) => (
        <AdminUserCard user={user} />
      ))}
    </div>
  );
};

export default AllRegisteredUsers;
