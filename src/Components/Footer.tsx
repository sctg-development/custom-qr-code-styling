/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { ReactElement } from 'react'
import { adWebsiteUrl, creationYear } from '../configuration'

function Footer(): ReactElement {
  const currentYear = new Date().getFullYear()
  const copyrightString = currentYear === creationYear ? `${currentYear}` : `${creationYear}-${currentYear}`
  return (
    <footer className='mt-auto text-center text-secondary fs-6 fw-light'>
      <p>
        Build with React {React.version}, based on{' '}
        <a className="text-secondary" target='_blank' rel='noopener noreferrer' href='https://github.com/kozakdenys/qr-code-styling'>
          QR Code Styling JS library
        </a>
        {' - '}{' '}
        <a className="text-secondary" target='_blank' rel='noopener noreferrer' href='https://github.com/awran5/custom-qr-code-styling'>
          Custom QR Code Styling
        </a>
        {' - '}{' '}
        <a className="text-secondary" target='_blank' rel='noopener noreferrer' href={adWebsiteUrl.url}>
        © {copyrightString} {adWebsiteUrl.name}
        </a>
        &nbsp;and&nbsp;
        <a className="text-secondary" target='_blank' rel='noopener noreferrer' href='https://sctg.eu.org'>
        Ronan Le Meillat
        </a>
      </p>
    </footer>
  )
}

export default Footer
