import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";

const UploadMoreImage = ({ onChange, thumails, isLoading }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (thumails && thumails.length > 0) {
      setImages(thumails);
    }
  }, [thumails]);

  const onChangeHandler = (imageList) => {
    setImages(imageList);
    onChange(imageList);
  };

  return (
    <ImageUploading
      multiple
      maxNumber={8}
      value={images}
      onChange={onChangeHandler}
      dataURLKey="data_url"
      acceptType={["jpg", "gif", "png"]}
    >
      {({
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        errors,
      }) => (
        <div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
            onClick={onImageUpload}
          >
            Upload images
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-6 mx-3"
            onClick={onImageRemoveAll}
          >
            Xoát tất cả
          </button>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {images.map((image, index) => (
              <div className="px-0" key={index}>
                <div className="flex flex-col w-[120px] h-[200px]">
                  <img
                    className="w-full  h-[120px] object-cover border-2 border-primary"
                    src={image.data_url || image.imgUrl}
                    alt=""
                  />
                  <div className="flex items-center w-full py-2">
                    <div className="flex item-center justify-between w-full">
                      <button
                        type="button"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onImageUpdate(index)}
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onImageRemove(index)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  );
};
UploadMoreImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  thumails: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default UploadMoreImage;
