import React, { useState, useContext, ReactElement } from 'react'
import { AppContext } from '../../Context'
import Submit from '../Submit'

const initialValues = {
  latitude: 45.926436,
  longitude: 6.8676
}
/**
 * Renders a form for entering geolocation coordinates and updates the QR code with the entered values.
 *
 * @return {ReactElement} The rendered form component.
 */
function GeoForm():ReactElement {
  const [values, setValues] = useState(initialValues)
  const { qrCode } = useContext(AppContext)

/**
 * Handles the change event for an input or select element.
 *
 * @param {React.ChangeEvent<HTMLInputElement & HTMLSelectElement>} event - The event object containing the target element.
 * @return {void} This function does not return anything.
 */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>):void => {
    const { name, value, checked } = event.target
    const type: React.HTMLInputTypeAttribute = event.target.type

    setValues((prev) => ({
      ...prev,
      [name]: type === ('checkbox' as React.HTMLInputTypeAttribute) ? checked : value
    }))
  }

/**
 * Handles the form submission event.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
 * @return {void}
 */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault()

    qrCode.update({
      data: `GEO:${values.latitude},${values.longitude}`
    })
  }

  return (
    <form className='qrForm-url' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <input
          id='latitude'
          className='form-control'
          type='number'
          name='latitude'
          value={values.latitude}
          onChange={handleChange}
          placeholder='Latitude (in decimal)'
          required
        />
        <label htmlFor='latitude'>Latitude (in decimal)</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          id='longitude'
          className='form-control'
          type='number'
          name='longitude'
          value={values.longitude}
          onChange={handleChange}
          placeholder='Longitude (in decimal)'
          required
        />
        <label htmlFor='longitude'>Longitude (in decimal)</label>
      </div>
      <Submit />
    </form>
  )
}

export default GeoForm
