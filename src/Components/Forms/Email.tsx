import React, { useState, useContext, ReactElement } from 'react'
import { AppContext } from '../../Context'
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
const EmailForm = ():ReactElement => {
  const { qrCode } = useContext(AppContext)
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
          id='eEmail'
          className='form-control'
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
        <label htmlFor='email'>Email</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          id='eSubject'
          className='form-control'
          type='text'
          name='subject'
          value={values.subject}
          onChange={handleChange}
          placeholder='Subject'
        />
        <label htmlFor='subject'>Subject</label>
      </div>
      <div className='form-floating mb-3'>
        <textarea
          id='body'
          className='form-control'
          name='body'
          rows={3}
          value={values.body}
          onChange={handleChange}
          placeholder='Message'
        />
        <label htmlFor='body'>Message</label>
      </div>

      <Submit />
    </form>
  )
}

export default EmailForm
