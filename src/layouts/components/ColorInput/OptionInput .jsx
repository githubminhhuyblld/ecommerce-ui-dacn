import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

import { AiOutlineCheckCircle } from "react-icons/ai";

OptionInput.propTypes = {
  title: PropTypes.string.isRequired,
  onOptionAdded: PropTypes.func.isRequired,
  defaultData: PropTypes.array,
};

function OptionInput(props) {
  const { onOptionAdded, title, defaultData } = props;
  const [option, setOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (defaultData && defaultData.length > 0) {
      setSelectedOptions(defaultData);
    }
  }, [defaultData]);

  useEffect(() => {
    onOptionAdded(selectedOptions);
  }, [selectedOptions, onOptionAdded]);

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  const handleAddOption = () => {
    if (option) {
      setSelectedOptions((prevOptions) => [...prevOptions, option]);
      setOption("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddOption();
    }
  };

  const handleRemoveOption = (optionToRemove) => {
    const updatedOptions = selectedOptions.filter((o) => o !== optionToRemove);
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className="w-full">
      <div className="flex items-center w-full">
        <TextField
          type="text"
          className="input-field "
          placeholder={title}
          fullWidth
          value={option}
          onChange={handleOptionChange}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 mb-[8px] ml-3 px-12 rounded flex-1"
          onClick={handleAddOption}
        >
          Thêm
        </button>
      </div>
      <div className=" bg-white shadow-lg w-5/6 rounded-xl">
        {selectedOptions.map((selectedOption, index) => (
          <div
            key={index}
            className="flex items-center justify-between  w-full  "
          >
            <div className="flex justify-between w-full px-5 bg-white hover:bg-[#f5f5f5] ">
              <div className="p-2 ">
                <span className="text-3xl flex items-center">
                  <AiOutlineCheckCircle className="text-green-400 mr-3 " />
                  {selectedOption.colorName ||
                    selectedOption.name ||
                    selectedOption}
                </span>
              </div>
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => handleRemoveOption(selectedOption)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionInput;
