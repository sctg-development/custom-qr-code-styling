/**
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { useState, useContext, ReactElement } from 'react'

import { AppContext } from '../../Context'
import Submit from '../Submit'

/**
 * Formats the given date into a string with the format YYYYMMDDTHHMMSSZ.
 *
 * @param {Date} now - The current date to format.
 * @return {string} The formatted date string.
 */
function getCurrentDateFormatted(now: Date): string {
  const year = now.getUTCFullYear()
  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = now.getUTCDate().toString().padStart(2, '0')
  const hours = now.getUTCHours().toString().padStart(2, '0')
  const minutes = now.getUTCMinutes().toString().padStart(2, '0')
  const seconds = now.getUTCSeconds().toString().padStart(2, '0')

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

/**
 * Adds one hour to the given date.
 *
 * @param {Date} date - The date to which one hour will be added.
 * @return {Date} The new date after adding one hour.
 */
function addOneHourToDate(date: Date): Date {
  return new Date(date.getTime() + 60 * 60 * 1000)
}

/**
 * format the date to a string with the format YYYY-MM-DDTHH:MM.
 * for use in the input type datetime-local
 * @param {Date} date - The date to format.
 * @return {string} The formatted date string.
 */
function formatDate(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const initialValues = {
  summary: 'Tandem flight with McFly Paragliding',
  latitude: 45.936562,
  longitude: 6.851181,
  description: 'Tandem flight with an instructor',
  location: "29 Rte Henriette d'Angeville, 74400 Chamonix-Mont-Blanc",
  dtstart: new Date(),
  dtend: addOneHourToDate(new Date())
}

/**
 * Handles the form submission for creating a QR code event.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
 * @return {ReactElement} The form element.
 */
function EventForm(): ReactElement {
  const [values, setValues] = useState(initialValues)
  const { qrCode } = useContext(AppContext)

  /**
   * Updates the state with the new value of the input field or checkbox.
   *
   * @param {React.ChangeEvent<HTMLInputElement & HTMLSelectElement>} event - The event triggered by the input field or checkbox.
   * @return {void} This function does not return anything.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>): void => {
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
      data: `BEGIN:VEVENT
UID:${Math.random().toString(36).substring(2, 9)}
SUMMARY:${values.summary}
DTSTART:${getCurrentDateFormatted(values.dtstart)}
DTEND:${getCurrentDateFormatted(values.dtend)}
LOCATION:${values.location.replaceAll(',', '\\,')}
GEO:${values.latitude};${values.longitude}
DESCRIPTION:${values.description}
END:VEVENT`
    })
  }

  return (
    <form className='qrForm-url' onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='summary'
          name='summary'
          placeholder='Summary'
          type='text'
          value={values.summary}
          onChange={handleChange}
        />
        <label htmlFor='summary'>Summary</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='description'
          name='description'
          placeholder='Description'
          type='text'
          value={values.description}
          onChange={handleChange}
        />
        <label htmlFor='description'>Description</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='latitude'
          name='latitude'
          placeholder='Latitude (in decimal)'
          type='number'
          value={values.latitude}
          onChange={handleChange}
        />
        <label htmlFor='latitude'>Latitude (in decimal)</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='longitude'
          name='longitude'
          placeholder='Longitude (in decimal)'
          type='number'
          value={values.longitude}
          onChange={handleChange}
        />
        <label htmlFor='longitude'>Longitude (in decimal)</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='dtstart'
          name='dtstart'
          placeholder='Start date'
          type='datetime-local'
          value={formatDate(values.dtstart)}
          onChange={handleChange}
        />
        <label htmlFor='dtstart'>Start date</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='location'
          name='location'
          placeholder='Location in text form'
          type='text'
          value={values.location}
          onChange={handleChange}
        />
        <label htmlFor='location'>Address</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          required
          className='form-control'
          id='dtend'
          name='dtend'
          placeholder='End date'
          type='datetime-local'
          value={formatDate(values.dtend)}
          onChange={handleChange}
        />
        <label htmlFor='dtend'>End date</label>
      </div>
      <Submit />
    </form>
  )
}

export default EventForm
