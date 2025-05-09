import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import InputField from "../elements/InputField"

function ReusableDeleteModal({
  setModal,
  onConfirm,
  loading,
  headerText,
  inputLabel = "type here",
  requiredText = "DELETE",
  confirmText = "confirm",
  cancelText = "cancel",
}) {
  const [input, setInput] = useState("");

  const handleConfirm = () => {
    if (input === requiredText) {
      onConfirm();
    } else {
      toast.error("Invalid input!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white py-6 px-9 rounded-2xl shadow-lg max-w-96 relative">
        <button
          onClick={() => setModal(false)}
          className="absolute cursor-pointer top-2 right-3 text-gray-600 hover:text-peach transition-colors duration-300"
        >
          ✖
        </button>
        <h2 className="text-md mb-2 text-center">If you want to delete the {headerText}, please type <span className="text-peach">DELETE</span> below</h2>

        <div className="flex justify-center mt-5 px-12">
          <InputField
            label={inputLabel}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex justify-around gap-2 mt-12">
          <button
            onClick={() => setModal(false)}
            className="px-7 py-2 cursor-pointer border-donut border-2 text-peach rounded  hover:bg-donut hover:text-white transition-colors duration-300"
          >
            {cancelText}
          </button>

          {loading ? (
            <div className="flex items-center justify-center px-11 bg-peach text-white rounded">
              <ClipLoader size={20} color="white" />
            </div>
          ) : (
            <button
              onClick={handleConfirm}
              className="px-7 cursor-pointer bg-peach rounded hover:bg-peach-hover text-white transition-colors duration-300"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReusableDeleteModal;
