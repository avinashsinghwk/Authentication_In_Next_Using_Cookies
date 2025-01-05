import React from 'react';

interface NormalInputType {
  placeholder: string,
  type: string,
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}
const NormalInput = ({ type, placeholder, onChange }: NormalInputType) => {
  return (
    <div>
      <input onChange={onChange} className='rounded-lg w-full py-2 font-bold text-3xl text-black px-10 outline-none' type={type} placeholder={placeholder} />
    </div>
  );
};

export default NormalInput;
