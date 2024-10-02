import React, { useEffect } from "react";
import { Table } from "../../components";
import { _get } from "../../util/api";
import useToast from "../../services/hook/useToast";
import { useDispatch } from "react-redux";

export default function UserData() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
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
  return (
    <>
      <Table />
    </>
  );
}
