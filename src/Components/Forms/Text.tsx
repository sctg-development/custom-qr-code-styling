/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024-2025 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { useState, ReactElement } from 'react'

import { useQrCode } from '../../hooks/useQrCode'
import Submit from '../Submit'

/**
 * Handles the change event of the textarea input, updating the state with the new value.
 *
 * @return {ReactElement} The rendered form component.
 */
const TextForm = (): ReactElement => {
  const [values, setValues] = useState('')
  const { qrCode } = useQrCode()

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
          required
          className='form-control'
          cols={3}
          id='text'
          name='text'
          placeholder='Add Text'
          value={values}
          onChange={handleChange}
        />
        <label htmlFor='text'>Add Text</label>
      </div>
      <Submit />
    </form>
  )
}

export default TextForm
