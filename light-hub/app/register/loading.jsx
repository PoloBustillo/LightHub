import React from "react";

const loading = () => {
  return (
    <div id="loading-growing-spinner" class="h-[300px] w-full">
      <div
        data-te-loading-management-init
        data-te-parent-selector="#loading-growing-spinner"
      >
        <div
          data-te-loading-icon-ref
          class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
          role="status"
        ></div>
        <span data-te-loading-text-ref>Cargando...</span>
      </div>
    </div>
  );
};

export default loading;
