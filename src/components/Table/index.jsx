import React from "react";
import { editIcon, deleteIcon } from "../../assets";
import "./table.scss";
import { useModal } from "../../services/hook/modalContext";
import { CommonModal } from "../modal/index";
export default function Table() {
  const { modalShow, handleClose, handleShow } = useModal();

  return (
    <>
      <button className="btn btn-primary mt-5" onClick={() => handleShow()}>
        Add User Record +
      </button>
      <CommonModal show={modalShow} handleClose={handleClose} />
      <div className="table-responsive text-center">
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">City with zip code</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Mark</td>
              <td>mark @gmail.com</td>
              <td>123-1233-2323</td>
              <td>Ramnagar</td>
              <td>
                <img src={editIcon} alt="edit-icon" className="icon-size" title="edit" /> &nbsp;
                <img src={deleteIcon} alt="delete-icon" className="icon-size" title="delete" />
              </td>
            </tr>

            <tr>
              <th>1</th>
              <td>Mark</td>
              <td>mark @gmail.com</td>
              <td>123-1233-2323</td>
              <td>Ramnagar</td>
              <td>
                <img src={editIcon} alt="edit-icon" className="icon-size" title="edit" /> &nbsp;
                <img src={deleteIcon} alt="delete-icon" className="icon-size" title="delete" />
              </td>
            </tr>

            <tr>
              <th>1</th>
              <td>Mark</td>
              <td>mark @gmail.com</td>
              <td>123-1233-2323</td>
              <td>Ramnagar</td>
              <td>
                <img src={editIcon} alt="edit-icon" className="icon-size" title="edit" /> &nbsp;
                <img src={deleteIcon} alt="delete-icon" className="icon-size" title="delete" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
