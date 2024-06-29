import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context'
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

const VCardForm = () => {
  const [values, setValues] = useState(initialValues)
  const { qrCode } = useContext(AppContext)

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
            <select
              id='title'
              className='form-select'
              name='title'
              value={values.title}
              onChange={handleChange}
            >
              <option value=''></option>
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
              id='firstName'
              className='form-control'
              type='text'
              name='firstName'
              placeholder='First Name'
              value={values.firstName}
              onChange={handleChange}
              required
            />
            <label htmlFor='firstName'>First Name</label>
          </div>
        </div>
        <div className='col'>
          <div className='form-floating'>
            <input
              id='lastName'
              className='form-control'
              type='text'
              name='lastName'
              placeholder='Last Name'
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
            id='mobile'
            className='form-control'
            type='text'
            name='mobile'
            placeholder='Mobile'
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
              id='phone'
              className='form-control'
              type='text'
              name='phone'
              placeholder='Phone'
              value={values.phone}
              onChange={handleChange}
            />
            <label htmlFor='phone'>Phone</label>
          </div>
        </div>
        <div className='col'>
          <div className='form-floating'>
            <input
              id='fax'
              className='form-control'
              type='text'
              name='fax'
              placeholder='Fax'
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
            id='email'
            className='form-control'
            type='email'
            name='email'
            placeholder='Email'
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
              id='company'
              className='form-control'
              type='text'
              name='company'
              placeholder='Company'
              value={values.company}
              onChange={handleChange}
            />
            <label htmlFor='company'>Company</label>
          </div>
        </div>
        <div className='col'>
          <div className='form-floating'>
            <input
              id='job'
              className='form-control'
              type='text'
              name='job'
              placeholder='Your Job'
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
            id='street'
            className='form-control'
            type='text'
            name='street'
            placeholder='Street'
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
              id='city'
              className='form-control'
              type='text'
              name='city'
              placeholder='City'
              value={values.city}
              onChange={handleChange}
            />
            <label htmlFor='city'>City</label>
          </div>
        </div>
        <div className='col-4'>
          <div className='form-floating'>
            <input
              id='zip'
              className='form-control'
              type='text'
              name='zip'
              placeholder='Zip'
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
            id='state'
            className='form-control'
            type='text'
            name='state'
            placeholder='State'
            value={values.state}
            onChange={handleChange}
          />
          <label htmlFor='state'>State</label>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            id='country'
            className='form-control'
            type='text'
            name='country'
            placeholder='Country'
            value={values.country}
            onChange={handleChange}
          />
          <label htmlFor='country'>Country</label>
        </div>
      </div>

      <div className='mb-3'>
        <div className='form-floating'>
          <input
            id='website'
            className='form-control'
            type='url'
            name='website'
            placeholder='Website'
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
