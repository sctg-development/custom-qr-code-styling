import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context'
import Submit from '../Submit'

const initialValues = {
  latitude: 45.926436,
  longitude: 6.8676
}
function GeoForm() {
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
