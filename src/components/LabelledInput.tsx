import React from "react"

interface LabelledInputType{
    id: string,
    label: string,
    type: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
}

export default function LabelledInput({ id, label, type, placeholder, onChange }: LabelledInputType) {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={id} className="block text-white text-xl font-bold mb-2">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          onChange={onChange}
          className="font-bold shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    );
  }
  
  