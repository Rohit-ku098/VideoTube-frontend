import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from '../Input'

const UploadVideoForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleVideoDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setVideoFile(file);
  };

  const handleThumbnailDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setThumbnail(file);
    console.log(file)
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <div className="pt-6 p-4">
      <div className="max-w-lg mx-auto  p-4   border-2 rounded-xl bg-white shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              label="Title"
              type="text"
              placeholder="Title"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required"
                },

              })}
            />
          </div>
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="w-full block mb-2 font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="form-textarea w-full p-2 border min-h-24 outline-none "
              {...register("description")}
            ></textarea>
          </div>
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
          
          <div className="mb-4">
            <label
              htmlFor="videoFile"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Video
            </label>
            <div
              className="border border-dashed border-gray-400 rounded-md p-4 cursor-pointer"
              onDrop={handleVideoDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                className="hidden w-full h-full"
                {...register("videoFile", {
                  required: {
                    value: true,
                    message: "Video is required",
                  },
                  pattern: {
                    value: ".(mp4|avi|mov|wmv|mkv|flv|webm)$",
                    message: "invalid video file",
                  },
                })}
              />
              Drop video file here or{" "}
              <label
                htmlFor="videoFile"
                className="text-indigo-600 cursor-pointer"
              >
                browse
              </label>
            </div>
          </div>
          {errors.videoFile && (
            <div className="text-red-500">{errors.videoFile.message}</div>
          )}
          <div className="mb-4">
            <label
              htmlFor="videoFile"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Thumbnail
            </label>
            <div
              className="border border-dashed border-gray-400 rounded-md p-4 cursor-pointer"
              onDrop={handleThumbnailDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                className="hidden w-full h-full"
                {...register("thumbnail", {
                  required: {
                    value: true,
                    message: "Thumbnail is required",
                  },
                  pattern: {
                    value: "var imageReg = /[/.](gif|jpg|jpeg|tiff|png)$/i;",
                    message: "invalid image file",
                  },
                })}
              />
              Drop video file here or{" "}
              <label
                htmlFor="thumbnail"
                className="text-indigo-600 cursor-pointer"
              >
                browse
              </label>
            </div>
          </div>
          {errors.thumbnail && (
            <div className="text-red-500">{errors.thumbnail.message}</div>
          )}

          <div className="mb-4">
            <label htmlFor="isPublish" className="flex items-center">
              <input
                type="checkbox"
                id="isPublish"
                name="isPublish"
                className="form-checkbox"
                {...register("isPublished")}
              />
              <span className="ml-2 text-sm font-medium text-gray-600">
                Publish
              </span>
            </label>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Upload Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoForm;
