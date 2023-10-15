import React from "react";

const InputForm = (register, label = "") => {
  console.log(label);

  return (
    <label
      for={label}
      class="font-medium relative block rounded-md border-2 bg-transparent border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type="text"
        id={label}
        class="peer w-full mt-2 px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={label}
      />

      <span class="pointer-events-none absolute bg-background start-2.5 top-0 -translate-y-1/2  p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {label}
      </span>
    </label>
  );
};

export default InputForm;
