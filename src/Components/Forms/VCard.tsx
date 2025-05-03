/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024-2025 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { useState, ReactElement } from 'react'

import { useQrCode } from '../../hooks/useQrCode'
import Submit from '../Submit'

const initialValues = {
  title: '',
  firstName: '',
  lastName: '',
  company: '',
  job: '',
  mobile: '',
  phone: '',
  fax: '',
  email: '',
  street: '',
  city: '',
  zip: '',
  state: '',
  country: '',
  website: ''
}

/**
 * Renders a form for creating a VCard.
 *
 * @return {ReactElement} The VCard form.
 */
const VCardForm = (): ReactElement => {
  const [values, setValues] = useState(initialValues)
  const { qrCode } = useQrCode()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const { name, value } = event.target

    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const {
      title,
      firstName,
      lastName,
      company,
      job,
      mobile,
      phone,
      fax,
      email,
      street,
      city,
      zip,
      state,
      country,
      website
    } = values

    const data = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;${title};
FN:${firstName} ${lastName}
ORG:${company}.
TITLE:${job}
TEL;TYPE#WORK,VOICE:${phone}
TEL;TYPE#CELL,VOICE:${mobile}
TEL;TYPE#FAX:${fax}
ADR:;;${street};${city};${state};${zip};${country}
EMAIL:${email}
URL:${website}
END:VCARD`

    qrCode.update({
      data
    })
  }

  return (
    <form className='qrForm-vcard' onSubmit={handleSubmit}>
      <div className='row mb-3'>
        <div className='col'>
          <div className='form-floating'>
            <select className='form-select' id='title' name='title' value={values.title} onChange={handleChange}>
              <option value='' />
              <option value='M.'>M.</option>
              <option value='Mr.'>Mr.</option>
              <option value='Ms.'>Ms.</option>
              <option value='Mme.'>Mme.</option>
              <option value='Mle.'>Mlle.</option>
              <option value='Mrs.'>Mrs.</option>
              <option value='Dr.'>Dr.</option>
              <option value='Prof.'>Prof.</option>
            </select>
            <label htmlFor='title'>Title</label>
          </div>
        </div>
        <div className='col'>
          <div className='form-floating'>
            <input
              required
              className='form-control'
              id='firstName'
              name='firstName'
              placeholder='First Name'
              type='text'
              value={values.firstName}
              onChange={handleChange}
            />
            <label htmlFor='firstName'>First Name</label>
          </div>
        </div>
        <div className='col'>
          <div className='form-floating'>
            <input
              className='form-control'
              id='lastName'
              name='lastName'
              placeholder='Last Name'
              type='text'
              value={values.lastName}
              onChange={handleChange}
            />
            <label htmlFor='lastName'>Last Name</label>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            className='form-control'
            id='mobile'
            name='mobile'
            placeholder='Mobile'
            type='text'
            value={values.mobile}
            onChange={handleChange}
          />
          <label htmlFor='mobile'>Mobile</label>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col'>
          <div className='form-floating'>
            <input
              className='form-control'
              id='phone'
              name='phone'
              placeholder='Phone'
              type='text'
              value={values.phone}
              onChange={handleChange}
            />
            <label htmlFor='phone'>Phone</label>
          </div>
        </div>
        <div className='col'>
          <div className='form-floating'>
            <input
              className='form-control'
              id='fax'
              name='fax'
              placeholder='Fax'
              type='text'
              value={values.fax}
              onChange={handleChange}
            />
            <label htmlFor='fax'>Fax</label>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            className='form-control'
            id='email'
            name='email'
            placeholder='Email'
            type='email'
            value={values.email}
            onChange={handleChange}
          />
          <label htmlFor='email'>Email</label>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col'>
          <div className='form-floating'>
            <input
              className='form-control'
              id='company'
              name='company'
              placeholder='Company'
              type='text'
              value={values.company}
              onChange={handleChange}
            />
            <label htmlFor='company'>Company</label>
          </div>
        </div>
        <div className='col'>
          <div className='form-floating'>
            <input
              className='form-control'
              id='job'
              name='job'
              placeholder='Your Job'
              type='text'
              value={values.job}
              onChange={handleChange}
            />
            <label htmlFor='job'>Job</label>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            className='form-control'
            id='street'
            name='street'
            placeholder='Street'
            type='text'
            value={values.street}
            onChange={handleChange}
          />
          <label htmlFor='street'>Street</label>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col-8'>
          <div className='form-floating'>
            <input
              className='form-control'
              id='city'
              name='city'
              placeholder='City'
              type='text'
              value={values.city}
              onChange={handleChange}
            />
            <label htmlFor='city'>City</label>
          </div>
        </div>
        <div className='col-4'>
          <div className='form-floating'>
            <input
              className='form-control'
              id='zip'
              name='zip'
              placeholder='Zip'
              type='text'
              value={values.zip}
              onChange={handleChange}
            />
            <label htmlFor='zip'>Zip</label>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            className='form-control'
            id='state'
            name='state'
            placeholder='State'
            type='text'
            value={values.state}
            onChange={handleChange}
          />
          <label htmlFor='state'>State</label>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            className='form-control'
            id='country'
            name='country'
            placeholder='Country'
            type='text'
            value={values.country}
            onChange={handleChange}
          />
          <label htmlFor='country'>Country</label>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            className='form-control'
            id='website'
            name='website'
            placeholder='Website'
            type='url'
            value={values.website}
            onChange={handleChange}
          />
          <label htmlFor='website'>Website</label>
        </div>
      </div>

      <Submit />
    </form>
  )
}

export default VCardForm
