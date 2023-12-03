/*-------------------------------------------------------------------
|  🐼 React FC Input
|
|  🐯 Purpose: RE-USEABLE INPUT COMPOENT
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

import cn from 'classnames'
import { findInputError, isFormInvalid } from '../../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import { BiDownArrow } from "react-icons/bi";

export const Input = ({
  name,
  label,
  type,
  id,
  placeholder,
  validation,
  multiline,
  className,
  value,
  toUpload,
  setToUpload,
  selection
  // disabled
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputErrors = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputErrors)

  const input_tailwind =
    'cursor-pointer p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60'

  const select_tailwind="cursor-pointer font-medium rounded border-2 text-gray-600 h-14 w-full pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"

    const handleChange = (e) => {

      setToUpload({ ...toUpload, [e.target.name]: e.target.value });
    };

  return (
    <div className={cn('flex flex-col w-full gap-2', className)}>
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      {multiline ? (
        <textarea
          id={id}
          type={type}
          className={cn(input_tailwind, 'min-h-[10rem] max-h-[20rem] resize-y')}
          placeholder={placeholder}
          {...register(name, validation)}
        ></textarea>
      ) : selection
            ? (
            <div style={{position: "relative"}}>
             <BiDownArrow style={{position: "absolute", right: "25px", top: "25px"}}/>
             <select name={name} id={id} className={cn(input_tailwind)} onChange={handleChange}>
              {
                selection.map((option, idx) =>
                  <option value={option} key={`${name}_${idx}`}>{option}</option>
                )
              }
            </select>
            </div>
           )
          :(
          <input
            id={id}
            name={name}
            type={type}
            className={cn(input_tailwind)}
            placeholder={placeholder}
            {...register(name, validation)}
            value={value}
            onChange={handleChange}
            // disabled={disabled}
          />
        )
      }
    </div>
  )
}

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  )
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}
