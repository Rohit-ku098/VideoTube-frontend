import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/conf";
import { useLocation } from "react-router-dom";

const EditVideo = ({ videoId }) => {
  const location = useLocation();
  const video = location.state?.video;

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      thumbnail: video?.thumbnail || null,
      title: video?.title || "",
      description: video?.description || "",
      isPublished: video?.isPublished ||false,
    },
  });

  const [thumbnail, setThumbnail] = useState(video?.thumbnail || null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleThumbnailDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setThumbnail(file);
    console.log(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const isThumbnailValid = thumbnail?.name?.match(/\.(jpg|jpeg|png)$/i);
    if (thumbnail && !isThumbnailValid)
      setError("thumbnailError", {
        type: "custom",
        message: "Only .jpg .jpeg .png files are allowed",
      });
  }, [thumbnail]);

  useEffect(() => {
    clearErrors();
  }, [isDirty]);

  const editVideo = async (data) => {
    try {
      const response = await api.patch(`/videos/${video?._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: ({ loaded, total }) => {
          console.log(loaded, total);
          setUploadProgress(Math.floor((loaded / total) * 100));
        },
      });
      return response.data?.data;
    } catch (error) {
      throw error.response.data?.message
    }
  };

  const onSubmit = (data) => {
    console.log(data);    
    console.log("submitting");
    const formData = new FormData();
 
    if(video?.title !== data.title ) {
        formData.append("title", data.title);
    }

    if(video?.description !== data.description ) {
        formData.append("description", data.description);
    }
    
    if(video?.thumbnail !== data.thumbnail ) {
        formData.append("thumbnail", thumbnail);
    }

    if(video?.isPublished !== data.isPublished ) {
        formData.append("isPublished", data.isPublished);
    }

    setLoading(true);
    editVideo(formData).then((res) => {
      console.log(res);
      toast.success("Video updated successfully", {
        position: "bottom-left",
      });
      navigate("/dashboard");
    }).catch((error) => {
      toast.error(error, {
        position: "bottom-left",
      });
    }).finally(() => {
      setLoading(false);
    })
  };

  console.log(uploadProgress + "%");
  const isEmpty = (value) =>
    value.trim().length > 0 || "This field is required";

  return (
    <div className="pt-6 p-4  ">
      {loading && <Loader />}

      <div className=" p-4   border-2 dark:border-gray-800 rounded-xl bg-white dark:bg-[#20232f93] shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-4 flex-wrap md:flex-nowrap">
            <div className="w-full">
              <div className="mb-4">
                <Input
                  label="Title"
                  type="text"
                  placeholder="Title"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Title is required",
                    },
                    validate: isEmpty,
                  })}
                />
              </div>
              {errors.title && (
                <div className="text-red-500">{errors.title.message}</div>
              )}
              <div className="mb-4 w-full">
                <label
                  htmlFor="description"
                  className="w-full block mb-2 font-medium text-gray-600 dark:text-gray-400"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  // rows="3"
                  className="form-textarea w-full p-2 border border-gray-300 bg-transparent rounded-lg min-h-52 md:h-80 lg:h-96 outline-none "
                  {...register("description")}
                ></textarea>
              </div>
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>

            <div className="w-full">
              <div className="mb-4">
                <label
                  htmlFor="thumbnail"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  Thumbnail
                </label>
                <div
                  className="border border-dashed h-52 border-gray-400 rounded-md p-4 cursor-pointer flex justify-center items-center overflow-hidden relative"
                  onDrop={handleThumbnailDrop}
                  onDragOver={handleDragOver}
                >
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    onInput={(e) => setThumbnail(e.target.files[0])}
                    className="hidden w-full h-full"
                    {...register("thumbnail", {
                      required: {
                        value: !thumbnail,
                        message: "Thumbnail is required",
                      },
                    })}
                  />

                  {!thumbnail ? (
                    <label
                      htmlFor="thumbnail"
                      className="flex flex-col items-center cursor-pointer p-4"
                    >
                      <img
                        src="/drag-and-drop.jpg"
                        alt=""
                        className="w-44 dark:invert-0"
                        draggable="false"
                      />
                      <p>
                        Drop thumbnail file here or{" "}
                        <span className="text-indigo-600">browse</span>
                      </p>
                    </label>
                  ) : (
                    // <p>{thumbnail?.name}</p>
                    <div className="max-h-full h-full max-w-full flex justify-center items-center ">
                      <img
                        src={video?.thumbnail || URL.createObjectURL(thumbnail)}
                        alt=""
                        className=" h-full max-h-full max-w-full object-cover"
                      />
                      <FontAwesomeIcon
                        onClick={() => {
                            setThumbnail(null);
                            video.thumbnail = null
                            console.log(video.thumbnail)
                        }}
                        icon={faTimes}
                        className="absolute top-0 right-0 text-2xl p-2 rounded-lg "
                      />
                    </div>
                  )}
                </div>
              </div>
              {errors.thumbnail && (
                <div className="text-red-500">{errors.thumbnail.message}</div>
              )}
              {errors.thumbnailError && (
                <div className="text-red-500">
                  {errors.thumbnailError.message}
                </div>
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
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Publish
                  </span>
                </label>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white/95 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  {isSubmitting ? "Uploading..." : "Upload Video"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;
