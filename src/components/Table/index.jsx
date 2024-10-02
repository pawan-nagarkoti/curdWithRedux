import React, { useEffect, useState } from "react";
import { editIcon, deleteIcon } from "../../assets";
import "./table.scss";
import { useModal } from "../../services/hook/modalContext";
import { subHeading, tableHeading } from "../../util/constant";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../util/Loading";
import { userDetail, getEditUserId } from "../../services/store/features/apiData";

export default function Table() {
  const { handleShow } = useModal();
  const userData = useSelector((state) => state.apiData.value);
  const [data, setData] = useState(userData);
  const dispatch = useDispatch();

  const handleDeletUserRecord = (id) => {
    const updatedData = userData?.filter((v) => v.id !== id);
    setData(updatedData); // Update the state with filtered data
    dispatch(userDetail(updatedData));
  };

  // Sync data with userData whenever it changes
  useEffect(() => {
    setData(userData);
  }, [userData]);

  // Get edit record id and save to redux
  const handleEditUserRecord = (id) => {
    dispatch(getEditUserId(id));
  };

  return (
    <>
      {/* Adde new user record */}
      <button className="btn btn-primary mt-5" onClick={() => handleShow()}>
        Add User Record +
      </button>

      {/* Table  */}
      <div className="table-responsive text-center">
        <table className="table table-bordered table-hover mt-3">
          <thead>
            <tr>
              {tableHeading.map((heading) => (
                <th key={heading.id} colSpan={heading.colSpan}>
                  {heading.label}
                </th>
              ))}
            </tr>
            <tr>
              <th colSpan="4"></th>
              {subHeading.map((sub) => (
                <th key={sub.id} colSpan={sub.colSpan}>
                  {sub.label}
                </th>
              ))}
              <th></th> {/* Empty for Action */}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="loading-css-alignment">
                  <Loading />
                </td>
              </tr>
            ) : (
              data
                ?.slice() // Create a shallow copy of the data array
                .reverse() // Reverse the copied array
                ?.map((v, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td> {/* Keep index ascending */}
                    <td>{v.name}</td>
                    <td>{v.email}</td>
                    <td>{v.phone}</td>
                    <td>{v.address.zipcode}</td>
                    <td>{v.address.city}</td>
                    <td>
                      <img src={editIcon} alt="edit-icon" className="icon-size" title="edit" onClick={() => handleEditUserRecord(v.id)} /> &nbsp;
                      <img src={deleteIcon} alt="delete-icon" className="icon-size" title="delete" onClick={() => handleDeletUserRecord(v.id)} />
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
