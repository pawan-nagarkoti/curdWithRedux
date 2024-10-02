import React from "react";
import { editIcon, deleteIcon } from "../../assets";
import "./table.scss";
import { useModal } from "../../services/hook/modalContext";
import { CommonModal } from "../modal/index";
import { tableHeading } from "../../util/constant";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../util/Loading";

export default function Table() {
  const { modalShow, handleClose, handleShow } = useModal();
  const userData = useSelector((state) => state.apiData.value);

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
            <input type="text" className="form-control" id="nameBox" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group mb-4">
            <label for="emailbox">Email address</label>
            <input type="email" className="form-control" id="emailbox" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group mb-4">
            <label for="phoneBox">Phone</label>
            <input type="password" className="form-control" id="phoneBox" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </CommonModal>

      {/* Table  */}
      <div className="table-responsive text-center">
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              {tableHeading?.map((v, index) => (
                <th key={index}>{v}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.length === 0 ? (
              <tr>
                <td colSpan="6" className="loading-css-alignment">
                  <Loading />
                </td>
              </tr>
            ) : (
              userData?.map((v, index) => (
                <tr key={index}>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.phone}</td>
                  <td>
                    {v.address.zipcode} &nbsp;
                    {v.address.city}
                  </td>
                  <td>
                    <img src={editIcon} alt="edit-icon" className="icon-size" title="edit" /> &nbsp;
                    <img src={deleteIcon} alt="delete-icon" className="icon-size" title="delete" />
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
