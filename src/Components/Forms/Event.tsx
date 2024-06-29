import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context'
import Submit from '../Submit'
import { get } from 'http';

/*
BEGIN:VEVENT
SUMMARY:Event Title
DTSTART:20240101T000000Z
DTEND:20240101T010000Z
LOCATION:Event Location
DESCRIPTION:Event Description
END:VEVENT
*/

/**
 * Formats the given date into a string with the format YYYYMMDDTHHMMSSZ.
 *
 * @param {Date} now - The current date to format.
 * @return {string} The formatted date string.
 */
function getCurrentDateFormatted(now: Date): string {
  const year = now.getUTCFullYear();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = now.getUTCDate().toString().padStart(2, '0');
  const hours = now.getUTCHours().toString().padStart(2, '0');
  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
  const seconds = now.getUTCSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Adds one hour to the given date.
 *
 * @param {Date} date - The date to which one hour will be added.
 * @return {Date} The new date after adding one hour.
 */
function addOneHourToDate(date: Date): Date {
  return new Date(date.getTime() + 60 * 60 * 1000);
}

/**
 * format the date to a string with the format YYYY-MM-DDTHH:MM.
 * for use in the input type datetime-local
 * @param {Date} date - The date to format.
 * @return {string} The formatted date string.
 */
function formatDate(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
const initialValues = {
  summary: 'Tandem flight with Les Ailes du Mont-Blanc',
  latitude: 45.936562,
  longitude:6.851181,
  description: 'Tandem flight with an instructor',
  location: "29 Rte Henriette d'Angeville, 74400 Chamonix-Mont-Blanc",
  dtstart:  new Date(),
  dtend: addOneHourToDate(new Date())
}
function EventForm() {
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
          id='summary'
          className='form-control'
          type='text'
          name='summary'
          value={values.summary}
          onChange={handleChange}
          placeholder='Summary'
          required
        />
        <label htmlFor='summary'>Summary</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          id='description'
          className='form-control'
          type='text'
          name='description'
          value={values.description}
          onChange={handleChange}
          placeholder='Description'
          required
        />
        <label htmlFor='description'>Description</label>
      </div>
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
      <div className='form-floating mb-3'>
        <input
          id='dtstart'
          className='form-control'
          type='datetime-local'
          name='dtstart'
          value={formatDate(values.dtstart)}
          onChange={handleChange}
          placeholder='Start date'
          required
        />
        <label htmlFor='dtstart'>Start date</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          id='location'
          className='form-control'
          type='text'
          name='location'
          value={values.location}
          onChange={handleChange}
          placeholder='Location in text form'
          required
        />
        <label htmlFor='location'>Address</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          id='dtend'
          className='form-control'
          type='datetime-local'
          name='dtend'
          value={formatDate(values.dtend)}
          onChange={handleChange}
          placeholder='End date'
          required
        />
        <label htmlFor='dtend'>End date</label>
      </div>
      <Submit />
    </form>
  )
}

export default EventForm
