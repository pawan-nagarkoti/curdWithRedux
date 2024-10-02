import React, { useEffect, useState } from "react";
import { editIcon, deleteIcon } from "../../assets";
import "./table.scss";
import { useModal } from "../../services/hook/modalContext";
import { CommonModal } from "../modal/index";
import { subHeading, tableHeading } from "../../util/constant";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../util/Loading";
import { userDetail } from "../../services/store/features/apiData";

export default function Table() {
  const { modalShow, handleClose, handleShow } = useModal();
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

  return (
    <>
      {/* Adde new user record */}
      <button className="btn btn-primary mt-5" onClick={() => handleShow()}>
        Add User Record +
      </button>

      {/* common popup modal */}
      <CommonModal show={modalShow} handleClose={handleClose}>
        <form>
          <div className="form-group mb-4">
            <label for="nameBox">Name</label>
            <input type="text" className="form-control" id="nameBox" placeholder="Enter Name" />
          </div>
          <div className="form-group mb-4">
            <label for="emailbox">Email address</label>
            <input type="email" className="form-control" id="emailbox" placeholder="Enter email" />
          </div>
          <div className="form-group mb-4">
            <label for="phoneBox">Phone</label>
            <input type="number" className="form-control" id="phoneBox" placeholder="Enter Phone" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </CommonModal>

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
              data?.map((v, index) => (
                <tr key={index}>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.phone}</td>
                  <td>{v.address.zipcode}</td>
                  <td>{v.address.city}</td>
                  <td>
                    <img src={editIcon} alt="edit-icon" className="icon-size" title="edit" /> &nbsp;
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
