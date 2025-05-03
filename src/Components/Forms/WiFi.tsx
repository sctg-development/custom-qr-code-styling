/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024-2025 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { useState, useReducer, ReactElement } from 'react'

import { useQrCode } from '../../hooks/useQrCode'
import Submit from '../Submit'

const VisibleSVG = () => {
  return (
    <svg fill='currentColor' focusable='false' height='20' viewBox='0 0 24 24' width='20'>
      <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
    </svg>
  )
}

const UnVisibleSVG = () => {
  return (
    <svg fill='currentColor' focusable='false' height='20' viewBox='0 0 24 24' width='20'>
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

/**
 * WiFi form component for entering WiFi network details.
 *
 * @return {ReactElement} The WiFi form JSX element.
 */
const WiFiForm = (): ReactElement => {
  const [values, setValues] = useState(initialValues)
  const [{ isVisible }, dispatch] = useReducer(reducer, {
    isVisible: false
  })
  const { qrCode } = useQrCode()

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
          required
          className='form-control'
          id='ssid'
          name='ssid'
          placeholder='SSID'
          type='text'
          value={values.ssid}
          onChange={handleChange}
        />
        <label htmlFor='ssid'>SSID</label>
      </div>

      <div className='form-floating mb-3'>
        <select
          className='form-select'
          id='encryption'
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
            className='form-control position-relative'
            id='password'
            name='password'
            placeholder='Password'
            type={isVisible ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
          />
          <label htmlFor='password'>Password</label>
          <span
            aria-hidden='true'
            className='input-group-text'
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: 55,
              justifyContent: 'center'
            }}
            onClick={() => dispatch({ type: 'toggle-visible' })}
          >
            {isVisible ? <UnVisibleSVG /> : <VisibleSVG />}
          </span>
        </div>
      )}

      <div className='form-check form-switch mb-4'>
        <input
          checked={values.hidden}
          className='form-check-input'
          id='hidden'
          name='hidden'
          type='checkbox'
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
