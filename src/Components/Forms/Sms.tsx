/**
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { useState, useContext, ReactElement } from 'react'

import { AppContext } from '../../Context'
import Submit from '../Submit'

const initialValues = {
  message: 'Please call me back',
  number: '+33620465557'
}

/**
 * Renders a form for sending an SMS message.
 *
 * @return {ReactElement} The rendered form component.
 */
function SmsForm(): ReactElement {
  const [values, setValues] = useState(initialValues)
  const { qrCode } = useContext(AppContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const { name, value, checked } = event.target
    const type: React.HTMLInputTypeAttribute = event.target.type

    setValues((prev) => ({
      ...prev,
      [name]: type === ('checkbox' as React.HTMLInputTypeAttribute) ? checked : value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    qrCode.update({
      data: `SMSTO:${values.number}:${values.message}`
    })
  }

  return (
    <form className='qrForm-url' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='number'
          name='number'
          placeholder='Phone number'
          type='phone'
          value={values.number}
          onChange={handleChange}
        />
        <label htmlFor='number'>Destination number</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='message'
          name='message'
          placeholder='Message'
          type='text'
          value={values.message}
          onChange={handleChange}
        />
        <label htmlFor='message'>Message</label>
      </div>
      <Submit />
    </form>
  )
}

export default SmsForm
