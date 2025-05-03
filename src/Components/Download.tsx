/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024-2025 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { ReactElement, useCallback, useContext } from 'react'
import { AppContext } from '../Context'
import { browserUtils, FileExtension } from '@liquid-js/qr-code-styling'
const Download = (): ReactElement => {
  const { qrCode } = useContext(AppContext)

  
  const handleDownload = useCallback((extension: FileExtension) => browserUtils?.download(qrCode, { extension, name:"QRCode" }), [qrCode])

  return (
    <div className='d-flex align-items-center pt-4'>
      <div className='pe-3 fw-bold text-uppercase'>Download</div>
      <button type='button' className='btn btn-outline-primary me-1' onClick={() => handleDownload(FileExtension.jpeg)}>
        .JPG
      </button>
      <button type='button' className='btn btn-outline-primary me-1' onClick={() => handleDownload(FileExtension.png)}>
        .PNG
      </button>
      <button type='button' className='btn btn-outline-primary me-1' onClick={() => handleDownload(FileExtension.webp)}>
        .WEBP
      </button>
      <button type='button' className='btn btn-outline-primary' onClick={() => handleDownload(FileExtension.svg)}>
        .SVG
      </button>
    </div>
  )
}

export default Download
