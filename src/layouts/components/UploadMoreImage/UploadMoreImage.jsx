import { useState } from "react";
import ImageUploading from "react-images-uploading";

const UploadMoreImage = ({ onChange }) => {
  const [images, setImages] = useState([]);

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
          <div className="flex items-center">
            {images.map((image, index) => (
              <div className=" px-4 " key={index}>
                <div className=" flex flex-col w-[120px] h-[200px]">
                  <img
                    className="w-full h-[120px] object-cover border-2 border-primary"
                    src={image.data_url}
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

export default UploadMoreImage;
