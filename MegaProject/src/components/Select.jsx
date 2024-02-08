import React, {useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (//label hoga to hi show hoga 
    <div className='w-full'>
        
        {label && <label htmlFor={id} className=''></label>} 
        
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            //loop krne layak value h tbhi loop kro
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}
//2nd way to use forwardRef hook
export default React.forwardRef(Select)