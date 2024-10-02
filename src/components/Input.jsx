import React, { useId } from "react";

export default function Input({ name = "", placeholder = "", type = "text", value = "", onChange }) {
  const id = useId();
  return (
    <div className="form-group mb-4">
      <label htmlFor={id} className="mb-2">
        {name}
      </label>
      <input type={type} className="form-control" id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} required />
    </div>
  );
}
