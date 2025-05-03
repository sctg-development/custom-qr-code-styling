/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024-2025 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { useState, ReactElement } from 'react'

import { useQrCode } from '../../hooks/useQrCode'
import Submit from '../Submit'

const initialValues = {
  email: '',
  subject: '',
  body: ''
}

/**
 * Renders an email form component.
 *
 * @return {ReactElement} The rendered email form component.
 */
const EmailForm = (): ReactElement => {
  const { qrCode } = useQrCode()
  const [values, setValues] = useState(initialValues)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { email, subject, body } = values

    const data = `mailto:${email}?subject=${subject}&body=${body}`

    qrCode.update({
      data
    })
  }

  return (
    <form className='qrForm-email' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='eEmail'
          name='email'
          placeholder='Email'
          type='email'
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor='email'>Email</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          className='form-control'
          id='eSubject'
          name='subject'
          placeholder='Subject'
          type='text'
          value={values.subject}
          onChange={handleChange}
        />
        <label htmlFor='subject'>Subject</label>
      </div>
      <div className='form-floating mb-3'>
        <textarea
          className='form-control'
          id='body'
          name='body'
          placeholder='Message'
          rows={3}
          value={values.body}
          onChange={handleChange}
        />
        <label htmlFor='body'>Message</label>
      </div>

      <Submit />
    </form>
  )
}

export default EmailForm
