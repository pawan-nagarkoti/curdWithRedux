import React, { useEffect, useState } from "react";
import { Table } from "../../components";
import { _get } from "../../util/api";
import useToast from "../../services/hook/useToast";
import { useDispatch, useSelector } from "react-redux";
import { CommonModal } from "../../components/modal";
import { useModal } from "../../services/hook/modalContext";
import Input from "../../components/Input";
import { userDetail, getEditUserId } from "../../services/store/features/apiData";

export default function UserData() {
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const { modalShow, handleClose, handleShow } = useModal();
  const userData = useSelector((state) => state.apiData.value);
  const editUserId = useSelector((state) => state.apiData.userId);

  const [data, setData] = useState(userData);

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Zipcode: "",
    City: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  // Sync data with userData when it changes
  useEffect(() => {
    setData(userData);
  }, [userData]);

  // Get data form modal form
  const handleUserFormData = (e) => {
    e.preventDefault();

    if (editUserId) {
      // Update existing user
      const updatedData = data.map((user) =>
        user.id === editUserId
          ? {
              ...user, // Keep other fields intact
              name: formData.Name,
              email: formData.Email,
              phone: formData.Phone,
              address: {
                zipcode: formData.Zipcode,
                city: formData.City,
              },
            }
          : user
      );

      setData(updatedData);
      dispatch(userDetail(updatedData)); // Dispatch updated data to Redux
      dispatch(getEditUserId(null)); // Dispatch updated data to Redux
    } else {
      // Create a new user object from form data
      const newUser = {
        id: data.length + 1, // Generate new ID
        name: formData.Name,
        email: formData.Email,
        phone: formData.Phone,
        address: {
          zipcode: formData.Zipcode,
          city: formData.City,
        },
      };

      const updatedData = [...data, newUser];
      setData(updatedData);
      dispatch(userDetail(updatedData)); // Dispatch new data to Redux
    }

    // Reset form fields
    setFormData({
      Name: "",
      Email: "",
      Phone: "",
      Zipcode: "",
      City: "",
    });

    handleClose(); // Close modal after submitting
  };

  useEffect(() => {
    if (editUserId) {
      const userData = data?.filter((v) => v.id === editUserId);
      setFormData({
        Name: userData[0]?.name,
        Email: userData[0]?.email,
        Phone: userData[0]?.phone,
        Zipcode: userData[0]?.address?.zipcode,
        City: userData[0]?.address?.city,
      });
      handleShow();
    }
  }, [editUserId]);

  // add user record
  const handleAddUserRecord = () => {
    setFormData({
      Name: "",
      Email: "",
      Phone: "",
      Zipcode: "",
      City: "",
    });
    handleShow();
  };

  return (
    <>
      {/* Adde new user record */}
      <button className="btn btn-primary mt-5" onClick={handleAddUserRecord}>
        Add User Record +
      </button>

      {/* common popup modal */}
      <CommonModal show={modalShow} handleClose={handleClose}>
        <form onSubmit={handleUserFormData}>
          <Input
            name="Name"
            placeholder="Enter name"
            type="text"
            value={formData.Name} // Bind value from state
            onChange={handleInputChange} // Handle input changes
          />
          <Input
            name="Email"
            placeholder="Enter email"
            type="email"
            value={formData.Email} // Bind value from state
            onChange={handleInputChange} // Handle input changes
          />
          <Input
            name="Phone"
            placeholder="Enter phone"
            type="text"
            value={formData.Phone} // Bind value from state
            onChange={handleInputChange} // Handle input changes
          />
          <Input
            name="Zipcode"
            placeholder="Enter zip code"
            type="text"
            value={formData.Zipcode} // Bind value from state
            onChange={handleInputChange} // Handle input changes
          />
          <Input
            name="City"
            placeholder="Enter city"
            type="text"
            value={formData.City} // Bind value from state
            onChange={handleInputChange} // Handle input changes
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </CommonModal>

      <Table />
    </>
  );
}
