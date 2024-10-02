import React, { useEffect, useState } from "react";
import { Table } from "../../components";
import { _get } from "../../util/api";
import useToast from "../../services/hook/useToast";
import { useDispatch, useSelector } from "react-redux";
import { CommonModal } from "../../components/modal";
import { useModal } from "../../services/hook/modalContext";
import Input from "../../components/Input";

export default function UserData() {
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const { modalShow, handleClose, handleShow } = useModal();
  const userData = useSelector((state) => state.apiData.value);
  const [data, setData] = useState(userData);

  // Get user data from an api
  const getUserData = async () => {
    try {
      const apiResponse = await _get(`users`);
      // Dispatch only serializable data
      dispatch({
        type: "api/userDetail",
        payload: apiResponse.data, // only data, not headers
      });
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error Status Code:", error.response.status);
        console.error("Error Message:", error.response.data.message);
        showToast(error.response.status, "error");
      } else {
        console.error("An unknown error occurred.");
      }
    } finally {
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleUserFormData = (e) => {};

  return (
    <>
      {/* common popup modal */}
      <CommonModal show={modalShow} handleClose={handleClose}>
        <form onSubmit={handleUserFormData}>
          <Input name="Name" placeholder="Enter name" type="text" />
          <Input name="Email" placeholder="Enter email" type="email" />
          <Input name="Phone" placeholder="Enter phone" type="number" />
          <Input name="Zipcode" placeholder="Enter zip code" type="text" />
          <Input name="City" placeholder="Enter city" type="text" />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </CommonModal>
      <Table />
    </>
  );
}
