import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type="text",
    placeholder,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-base font-medium dark:text-gray-400 ">
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          className={`bg-gray-200 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          type={type}
          placeholder={placeholder}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
})

export default Input
