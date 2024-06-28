import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context'
import Submit from '../Submit'

function UrlForm() {
  const [values, setValues] = useState('https://lesailesdumontblanc.com')
  const { qrCode } = useContext(AppContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    qrCode.update({
      data: values
    })
  }

  return (
    <form className='qrForm-url' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <input
          id='url'
          className='form-control'
          type='url'
          name='url'
          value={values}
          onChange={handleChange}
          placeholder='Add URL'
          required
        />
        <label htmlFor='url'>Add URL</label>
      </div>
      <Submit />
    </form>
  )
}

export default UrlForm
