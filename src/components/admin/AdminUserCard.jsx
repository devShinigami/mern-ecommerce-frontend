import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setUserId } from "../../context/userSlice";
const AdminUserCard = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <main>
      <section>
        <aside className="w-full flex items-center space-x-3 border-b border-gray-300 justify-around">
          <img
            className="w-20 h-20 object-cover rounded-full"
            src={user.profilePic.url}
            alt=""
          />
          <p className="text-xl font-bold w-1/4 ">{user.name}</p>
          <p className="w-1/4">{user.email}</p>
          <aside c>
            <AiFillDelete
              onClick={() => {
                dispatch(setUserId(user._id));
              }}
              className="h-6 w-6 text-gray-300 hover:text-red-500 cursor-pointer"
            />
          </aside>
        </aside>
      </section>
    </main>
  );
};

export default AdminUserCard;
