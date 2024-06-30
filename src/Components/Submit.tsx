/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import { ReactElement } from 'react'

/**
 * Renders a submit button for generating a QR code.
 *
 * @return {ReactElement} The submit button component.
 */
const Submit = ():ReactElement => {
  return (
    <button className='btn btn-dark' type='submit'>
      Generate
    </button>
  )
}

export default Submit
