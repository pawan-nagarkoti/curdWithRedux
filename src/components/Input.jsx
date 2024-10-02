import React, { useId } from "react";

export default function Input({ name = "", placeholder = "", type = "text" }) {
  const id = useId();
  return (
    <div className="form-group mb-4">
      <label htmlFor="nameBox" className="mb-2">
        {name}
      </label>
      <input type={type} className="form-control" id={id} placeholder={placeholder} name={name} />
    </div>
  );
}
