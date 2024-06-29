import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context'
import Submit from '../Submit'

const initialValues = {
  number: '+33620465557'
}
function TelForm() {
  const [values, setValues] = useState(initialValues)
  const { qrCode } = useContext(AppContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const { name, value, checked } = event.target
    const type:React.HTMLInputTypeAttribute = event.target.type

    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox'  as React.HTMLInputTypeAttribute ? checked : value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    qrCode.update({
      data: `tel:${values.number}`
    })
  }

  return (
    <form className='qrForm-url' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <input
          id='number'
          className='form-control'
          type='phone'
          name='number'
          value={values.number}
          onChange={handleChange}
          placeholder='Phone number'
          required
        />
        <label htmlFor='number'>Destination number</label>
      </div>
      <Submit />
    </form>
  )
}

export default TelForm
