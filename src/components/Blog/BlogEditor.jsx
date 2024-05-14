import React from 'react'
import { createTweet, updateTweet } from '../../services/tweet.service';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import { Controller } from 'react-hook-form';

function BlogEditor({defaultValue="", title="Create Post", setOpen, control}) {
 
  return (
    <Modal title={title} onCancel={() => setOpen(false)}>
      <div className="h-[50vh] w-[80vw]  md:w-[49vw]">
        <Controller
          control={control}
          name="content"
          defaultValue={defaultValue}
          rules={{
            required: true,
            maxLength: {value: 1500, message: "Max length is 1500 characters"},
            validate: (val) => val.trim().length > 0 || "Content is required",
          }}
          render={({
            formState: { errors },
            fieldState: { isDirty },
            field: { onChange },
          }) => (
            <div className="flex flex-col justify-between mb-4 w-full h-full pb-4 ">
              <textarea
                id="tweetContent"
                placeholder="Write something..."
                defaultValue={defaultValue}
                onChange={onChange}
                className="flex-grow form-textarea w-full p-2 border border-gray-300 bg-transparent rounded-lg min-h-20  outline-none resize-none"
              ></textarea>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="submit"
                  disabled={!isDirty}
                  className={` ${
                    isDirty
                      ? "cursor-pointer  bg-black dark:bg-white dark:text-black"
                      : "cursor-not-allowed bg-gray-300 dark:bg-gray-900 dark:text-gray-600"
                  } text-sm font-bold text-white px-3 py-2 rounded-2xl`}
                >
                  Post
                </button>
              </div>
              {errors?.content && <p className='text-red-500'>{errors?.content?.message}</p>}
            </div>
          )}
        />
      </div>
    </Modal>
  );
}

  

export default BlogEditor;
