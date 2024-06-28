import React, { useCallback, useContext } from 'react'
import { AppContext } from '../Context'
import { browserUtils } from '@liquid-js/qr-code-styling'
const Download = (): JSX.Element => {
  const { qrCode } = useContext(AppContext)

  
  const handleDownload = useCallback((ext: string) => browserUtils?.download(qrCode, ext as any), [qrCode])

  return (
    <div className='d-flex align-items-center pt-4'>
      <div className='pe-3 fw-bold text-uppercase'>Download</div>
      <button type='button' className='btn btn-outline-primary me-1' onClick={() => handleDownload('jpg')}>
        .JPG
      </button>
      <button type='button' className='btn btn-outline-primary me-1' onClick={() => handleDownload('png')}>
        .PNG
      </button>
      <button type='button' className='btn btn-outline-primary me-1' onClick={() => handleDownload('webp')}>
        .WEBP
      </button>
      <button type='button' className='btn btn-outline-primary' onClick={() => handleDownload('svg')}>
        .SVG
      </button>
    </div>
  )
}

export default Download
