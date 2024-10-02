import React, { useEffect } from "react";
import { Table } from "../../components";
import { _get } from "../../util/api";
import useToast from "../../services/hook/useToast";

export default function UserData() {
  const { showToast } = useToast();
  // Get user data from an api
  const getUserData = async () => {
    try {
      const response = await _get(`users`);
      console.log(response);
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
