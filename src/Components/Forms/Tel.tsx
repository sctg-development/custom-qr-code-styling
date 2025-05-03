/**
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { useState, useContext, ReactElement } from 'react'

import { AppContext } from '../../Context'
import Submit from '../Submit'

const initialValues = {
  number: '+33620465557'
}

/**
 * Renders a form for entering a telephone number and updating the QR code with the entered number.
 *
 * @return {ReactElement} The rendered form component.
 */
function TelForm(): ReactElement {
  const [values, setValues] = useState(initialValues)
  const { qrCode } = useContext(AppContext)

  /**
   * Handles the change event for input and select elements.
   *
   * @param {React.ChangeEvent<HTMLInputElement & HTMLSelectElement>} event - The change event.
   * @return {void} No return value.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const { name, value, checked } = event.target
    const type: React.HTMLInputTypeAttribute = event.target.type

    setValues((prev) => ({
      ...prev,
      [name]: type === ('checkbox' as React.HTMLInputTypeAttribute) ? checked : value
    }))
  }

  /**
   * Handle form submission for updating qrCode with telephone number data.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   * @return {void} No return value.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    qrCode.update({
      data: `tel:${values.number}`
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
      <Submit />
    </form>
  )
}

export default TelForm
