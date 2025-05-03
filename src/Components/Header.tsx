/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import { ReactElement } from 'react'

import { adWebsiteUrl } from '../configuration'

function Header(): ReactElement {
  return (
    <header className='header bg-dark text-light'>
      <div className='container'>
        <div className='d-flex justify-content-between align-items-center py-3'>
          <div className='qr-logo'>
            <h1 className='h5 mb-0 fw-light'>
              <span className='fw-bolder'>{adWebsiteUrl.shortName}</span> QR CODE GENERATOR
            </h1>
          </div>
          <a href={adWebsiteUrl.url} rel='noopener noreferrer' target='_blank'>
            <img alt='ADMB' height='50' src={adWebsiteUrl.headerLogo} width='50' />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
