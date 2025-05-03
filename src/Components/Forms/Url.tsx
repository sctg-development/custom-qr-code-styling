/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { useState, useContext, ReactElement } from 'react'

import { AppContext } from '../../Context'
import Submit from '../Submit'
import { adWebsiteUrl } from '../../configuration'

/**
 * Renders a form for entering a URL and updates the QR code with the entered URL when the form is submitted.
 *
 * @return {ReactElement} The rendered form component.
 */
function UrlForm(): ReactElement {
  const [values, setValues] = useState(adWebsiteUrl.url)
  const { qrCode } = useContext(AppContext)

  /**
   * Updates the values state with the new value from the input element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event object from the input element.
   * @return {void} This function does not return anything.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues(event.target.value)
  }

  /**
   * Handles the form submission event and updates the QR code data with the entered URL.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   * @return {void} This function does not return anything.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    qrCode.update({
      data: values
    })
  }

  return (
    <form className='qrForm-url' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='url'
          name='url'
          placeholder='Add URL'
          type='url'
          value={values}
          onChange={handleChange}
        />
        <label htmlFor='url'>Add URL</label>
      </div>
      <Submit />
    </form>
  )
}

export default UrlForm
