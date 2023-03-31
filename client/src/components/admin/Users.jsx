import React, {useEffect} from "react";
// import me from "../../assets/founder.webp";
import { useDispatch } from "react-redux";
import { getAdminUsers } from "../../redux/actions/admin";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

const Users = () => {
  // const arr = [1, 2, 3, 4];

  const dispatch = useDispatch();
  const {loading, user } = useSelector(state => state.admin);
  console.log(user[0])
  useEffect(() => {
    dispatch(getAdminUsers())
  }, [dispatch])
  

  return (
    <section className="tableClass">
      { loading ? (
        <main>
        <table>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Photo</th>
              <th>Role</th>
              <th>Since</th>
            </tr>
          </thead>

          <tbody>
            {user && user.map((i) => (
              <tr key={i}>
                <td>#sdkfsdfdsf</td>
                <td>Abhi</td>
                <td>
                  {/* <img src={me} alt="User" /> */}
                </td>
                <td>Admin</td>
                <td>{"24-23-2023"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      ) : (
        <Loader />
      ) }
    </section>
  );
};

export default Users;
