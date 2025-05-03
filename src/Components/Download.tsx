/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024-2025 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import { ReactElement, useCallback, useContext } from 'react'
import { browserUtils, FileExtension } from '@liquid-js/qr-code-styling'

import { AppContext } from '../Context'

const Download = (): ReactElement => {
  const { qrCode, options } = useContext(AppContext)

  const handleDownload = useCallback(
    (extension: FileExtension) => {
      const size = options.size || 1000

      // eslint-disable-next-line no-console
      console.log(`Downloading QR Code at size: ${size}x${size}`)

      return browserUtils?.download(qrCode, { extension, name: 'QRCode' }, { width: size, height: size })
    },
    [qrCode, options.size]
  )

  return (
    <div className='d-flex align-items-center pt-4'>
      <div className='pe-3 fw-bold text-uppercase'>Download</div>
      <button className='btn btn-outline-primary me-1' type='button' onClick={() => handleDownload(FileExtension.jpeg)}>
        .JPG
      </button>
      <button className='btn btn-outline-primary me-1' type='button' onClick={() => handleDownload(FileExtension.png)}>
        .PNG
      </button>
      <button className='btn btn-outline-primary me-1' type='button' onClick={() => handleDownload(FileExtension.webp)}>
        .WEBP
      </button>
      <button className='btn btn-outline-primary' type='button' onClick={() => handleDownload(FileExtension.svg)}>
        .SVG
      </button>
    </div>
  )
}

export default Download
