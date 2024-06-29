import React, { useState, useContext, useReducer } from 'react'
import { AppContext } from '../../Context'
import Submit from '../Submit'

const VisibleSVG = () => {
  return (
    <svg fill='currentColor' width='20' height='20' focusable='false' viewBox='0 0 24 24'>
      <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
    </svg>
  )
}

const UnVisibleSVG = () => {
  return (
    <svg fill='currentColor' width='20' height='20' focusable='false' viewBox='0 0 24 24'>
      <path d='M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z' />
    </svg>
  )
}

declare type State = {
  isVisible: boolean
}

type Action = { type: 'toggle-visible' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle-visible':
      return {
        isVisible: !state.isVisible
      }
    default:
      return state
  }
}

const initialValues = {
  ssid: '',
  password: '',
  encryption: 'nopass',
  hidden: false
}

const WiFiForm = () => {
  const [values, setValues] = useState(initialValues)
  const [{ isVisible }, dispatch] = useReducer(reducer, {
    isVisible: false
  })
  const { qrCode } = useContext(AppContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const { type, name, value, checked } = event.target

    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { ssid, password, encryption, hidden } = values

    const data = `WIFI:S:${ssid};T:${encryption};P:${password};H:${hidden};;`

    qrCode.update({
      data
    })
  }

  return (
    <form className='qrForm-wifi' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <input
          id='ssid'
          className='form-control'
          type='text'
          name='ssid'
          value={values.ssid}
          onChange={handleChange}
          placeholder='SSID'
          required
        />
        <label htmlFor='ssid'>SSID</label>
      </div>

      <div className='form-floating mb-3'>
        <select
          id='encryption'
          className='form-select'
          name='encryption'
          value={values.encryption}
          onChange={handleChange}
        >
          <option value='nopass'>Open</option>
          <option value='WEP'>WEP</option>
          <option value='WPA'>WPA/WPA2-PSK/WPA3</option>
        </select>
        <label htmlFor='encryption'>Encryption</label>
      </div>

      {values.encryption !== 'nopass' && (
        <div className='form-floating mb-3'>
          <input
            id='password'
            className='form-control position-relative'
            type={isVisible ? 'text' : 'password'}
            name='password'
            value={values.password}
            onChange={handleChange}
            placeholder='Password'
          />
          <label htmlFor='password'>Password</label>
          <span
            className='input-group-text'
            onClick={() => dispatch({ type: 'toggle-visible' })}
            aria-hidden='true'
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: 55,
              justifyContent: 'center'
            }}
          >
            {isVisible ? <UnVisibleSVG /> : <VisibleSVG />}
          </span>
        </div>
      )}

      <div className='form-check form-switch mb-4'>
        <input
          id='hidden'
          className='form-check-input'
          type='checkbox'
          name='hidden'
          checked={values.hidden}
          onChange={handleChange}
        />
        <label className='form-check-label' htmlFor='hidden'>
          Hidden?
        </label>
      </div>
      <Submit />
    </form>
  )
}

export default WiFiForm
