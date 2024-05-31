import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from '../Input'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/conf";
import Progressbar from "../Progressbar";
import { BarLoader } from "react-spinners";

const UploadVideo = () => {
  const { register, handleSubmit, setError, clearErrors, formState: {errors, isSubmitting, isDirty} } = useForm({defaultValues: {
    videoFile: null,
    thumbnail: null,
    title: '',
    description: '',
    isPublished: false
  }});
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate();

  const handleVideoDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setVideoFile(file);
    console.log(file)
    clearErrors("videoError");
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

  useEffect(() => {
    const isVideo = videoFile?.name.match(/\.(mp4|avi|mov|wmv|mkv|flv|webm)$/i);
    if (videoFile && !isVideo) setError("videoError", { type: "custom", message: "Only video files are allowed" });
    
    if (videoFile && 
        import.meta.env.VITE_LIMIT_VIDEO_UPLOAD_SIZE === 'true' &&
        videoFile?.size > import.meta.env.VITE_LIMIT_VIDEO_UPLOAD_SIZE_VALUE
      ) {
        setVideoFile(null);
        setError("videoError", {
          type: "custom",
          message: "File size should be less than " + Math.floor(Number.parseInt(import.meta.env.VITE_LIMIT_VIDEO_UPLOAD_SIZE_VALUE) / 1048576) + "MB",
        });
        toast.error("Sorry for inconvenience. Due to limited bandwidth of our server. I have limited the video upload size to " + Math.floor(Number.parseInt(import.meta.env.VITE_LIMIT_VIDEO_UPLOAD_SIZE_VALUE) / 1048576) + "MB", {
          position: "bottom-left",
          autoClose: 6000,
        })
    }
  }, [videoFile])

  useEffect(() => {
    const isThumbnailValid = thumbnail?.name.match(/\.(jpg|jpeg|png)$/i);
    if(thumbnail && !isThumbnailValid) setError("thumbnailError", {type: "custom", message: "Only .jpg .jpeg .png files are allowed"})
  }, [thumbnail])

  useEffect(() => {
    clearErrors()
  }, [isDirty])

    
  const uploadVideo = async (data) => {
    try {
      const response = await api.post("/videos", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: ({loaded, total}) => {
          console.log(loaded, total)
          setUploadProgress(Math.floor((loaded/total)*100))
        }
      });
      return response.data?.data;
    } catch (error) {
      throw error.response.data?.message
    }
  };

  useEffect(() => {
    if (uploadProgress === 100) {
      setProcessing(true);
    }
  }, [uploadProgress, uploading]);

  const onSubmit = (data) => {
    console.log(data)
    console.log('submitting')
    if(!data.title) {
      setError('title', {type: 'custom', message: 'Title is required'})
      return;
    }
    
    if(!videoFile) {
      setError('videoFile', {type: 'custom', message: 'Video is required'})
      return;
    }

    const isVideo = videoFile?.name.match(/\.(mp4|avi|mov|wmv|mkv|flv|webm)$/i);
    if (videoFile && !isVideo)
      setError("videoError", {
        type: "custom",
        message: "Only video files are allowed",
    });
    
    
    if(!thumbnail) {
      setError('thumbnail', {type: 'custom', message: 'Thumbnail is required'})
      return;
    }
    const isThumbnailValid = thumbnail?.name?.match(/\.(jpg|jpeg|png)$/i);
    if (thumbnail && !isThumbnailValid)
      setError("thumbnailError", {
        type: "custom",
        message: "Only .jpg .jpeg .png files are allowed",
      });

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", thumbnail);
    formData.append("videoFile", videoFile);
    formData.append("isPublished", data.isPublished)
    setUploading(true)

    uploadVideo(formData).then((res) => {
      console.log(res)
      toast.success('Video uploaded successfully', {
        position: "bottom-left"
      })
      navigate('/dashboard')
    }).catch((error) => {
      toast.error(error, {
        position: "bottom-left",
      });
    }).finally(() => {
      setUploading(false)
      setUploadProgress(0)
      setProcessing(false)
    })
  };

  console.log(uploadProgress + '%')
  const isEmpty = value => value.trim().length > 0 || "This field is required";
  return (
    <div className="pt-6 p-4">
      {/* {uploading && <Loader />} */}

      <div className="  p-4   border-2 dark:border-gray-800 rounded-xl bg-white dark:bg-[#20232f93] shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-4 flex-wrap md:flex-nowrap">
            <div className="w-full">
              <div className="mb-4">
                <Input
                  label="Title"
                  type="text"
                  placeholder="Title"
                  disabled={uploading}
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
                  disabled={uploading}
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
                  htmlFor="videoFile"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  Video
                </label>
                <div
                  className="border border-dashed h-52 border-gray-400 rounded-md p-4 cursor-pointer flex justify-center items-center overflow-hidden relative"
                  onDrop={handleVideoDrop}
                  onDragOver={handleDragOver}
                >
                  <input
                    type="file"
                    id="videoFile"
                    name="videoFile"
                    disabled={uploading}
                    onInput={(e) => setVideoFile(e.target.files[0])}
                    className="hidden w-full h-full"
                    {...register("videoFile", {
                      required: {
                        value: !videoFile,
                        message: "Video is required",
                      },
                    })}
                  />

                  {!videoFile ? (
                    <label
                      htmlFor="videoFile"
                      className="flex flex-col items-center cursor-pointer p-4"
                    >
                      <img
                        src="/drag-and-drop.jpg"
                        alt=""
                        className="w-44 dark:invert-0"
                        draggable="false"
                      />
                      <p>
                        Drop video file here or{" "}
                        <span className="text-indigo-600">browse</span>
                      </p>
                    </label>
                  ) : (
                    <div className="h-full max-h-full max-w-full flex justify-center items-center ">
                      <video
                        src={URL.createObjectURL(videoFile)}
                        alt=""
                        className="h-full w-full max-h-full max-w-full aspect-video object-cover"
                      ></video>
                      <FontAwesomeIcon
                        onClick={() => setVideoFile(null)}
                        icon={faTimes}
                        className="absolute top-0 right-0 text-2xl  p-2 rounded-lg "
                      />
                    </div>
                  )}
                </div>
              </div>
              {errors.videoFile && (
                <div className="text-red-500">{errors.videoFile.message}</div>
              )}
              {errors.videoError && (
                <div className="text-red-500">{errors.videoError.message}</div>
              )}

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
                    disabled={uploading}
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
                    <div className="h-full max-h-full max-w-full flex justify-center items-center ">
                      <img
                        src={URL.createObjectURL(thumbnail)}
                        alt=""
                        className="h-ful max-h-full max-w-full aspect-video object-cover"
                      />
                      <FontAwesomeIcon
                        onClick={() => setThumbnail(null)}
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
                {uploading ? (
                  processing ? (
                    <div>
                      <div className="absolute top-0 right-0 z-50 h-screen w-screen"></div>
                      <p className="text-gray-500 text-sm">Processing...</p>
                      <BarLoader
                        width={"100%"}
                        height={10}
                        color={"#4f46e5"}
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="absolute top-0 right-0 z-50 h-screen w-screen"></div>
                      <p className="text-gray-500 text-sm">Uploading...</p>
                      <Progressbar progress={uploadProgress} />
                    </div>
                  )
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white/95 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    Upload video
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
