import { PropagateLoader } from "react-spinners";
import React from 'react'

function ButtonLoading() {
  return (
    <div className="-mt-2">
      <PropagateLoader size={15} color="white" />
    </div>
  );

}

export default ButtonLoading

// 18.15