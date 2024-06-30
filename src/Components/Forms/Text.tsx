import React, { useState, useContext, ReactElement } from 'react'
import { AppContext } from '../../Context'
import Submit from '../Submit'

/**
 * Handles the change event of the textarea input, updating the state with the new value.
 *
 * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The event object containing the new value.
 * @return {ReactElement} This function does not return anything.
 */
const TextForm = ():ReactElement => {
  const [values, setValues] = useState('')
  const { qrCode } = useContext(AppContext)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    qrCode.update({
      data: values
    })
  }

  return (
    <form className='qrForm-text' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <textarea
          id='text'
          className='form-control'
          name='text'
          value={values}
          cols={3}
          onChange={handleChange}
          placeholder='Add Text'
          required
        />
        <label htmlFor='text'>Add Text</label>
      </div>
      <Submit />
    </form>
  )
}

export default TextForm
