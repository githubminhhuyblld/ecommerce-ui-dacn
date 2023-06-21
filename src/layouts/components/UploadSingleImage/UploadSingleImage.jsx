import React from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";


const UploadSingleImage = (props) => {
  const {
    images,
    onChange,
    maxNumber,
    open,
    imageProduct,
    name,
    showButton,
    handleImageUpload,
  } = props;
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
      acceptType={["jpg", "gif", "png"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="w-full h-full">
          {imageList.length > 0 &&
            imageList.map((image, index) => (
              <div key={index} className="relative w-full h-full  ">
                <img
                  src={image.data_url}
                  className="w-full h-full rounded-full object-cover "
                  alt={name}
                />
                <div className="image-item__bt-wrapper ">
                  <button
                    type="button"
                    className="bg-primary rounded-2xl p-2 text-base text-white absolute right-8 bottom-6"
                    onClick={() => onImageUpdate(index)}
                  >
                    Đổi ảnh
                  </button>
                </div>
              </div>
            ))}
          {open && (
            <div className="relative w-full h-full">
              <img
                src={imageProduct}
                className="relative rounded-full  w-full h-full object-cover bg-slate-200 border border-primary"
                alt={name}
              />
              {showButton && (
                <button
                  type="button"
                  className="bg-primary absolute bottom-0 right-2 text-base text-white rounded-2xl p-2"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Chọn ảnh
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  );
};
UploadSingleImage.propTypes = {
  imageProduct: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  maxNumber: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  showButton: PropTypes.bool.isRequired,
};


export default UploadSingleImage;
