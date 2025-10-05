/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024-2025 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import { ReactElement, useCallback, useContext } from 'react'
import { browserUtils, FileExtension, QRCodeStyling } from '@liquid-js/qr-code-styling'

import { AppContext } from '../Context'

const Download = (): ReactElement => {
  const { qrCode, options } = useContext(AppContext)

  const handleDownload = useCallback(
    async (extension: FileExtension) => {
      const size = options.size || 1000

      // eslint-disable-next-line no-console
      console.log(`Downloading QR Code at size: ${size}x${size}`)

      console.log(await qrCode.serialize())
      return browserUtils?.download(qrCode, { extension, name: 'QRCode' }, { width: size, height: size })
    },
    [qrCode, options.size]
  )

  const handleDownloadSvg = useCallback(async () => {
    const size = options.size || 1000

    // eslint-disable-next-line no-console
    console.log(`Downloading SVG QR Code at size: ${size}x${size}`)

    let svgContent = await qrCode.serialize() || ''

    // Flatten nested SVGs
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgContent, 'image/svg+xml')
    const nestedSvgs = Array.from(doc.querySelectorAll('svg svg')).reverse()
    nestedSvgs.forEach(nestedSvg => {
      const x = parseFloat(nestedSvg.getAttribute('x') || '0')
      const y = parseFloat(nestedSvg.getAttribute('y') || '0')
      const width = (nestedSvg.getAttribute('width') || '').replace('px', '')
      const height = (nestedSvg.getAttribute('height') || '').replace('px', '')
      const viewBox = nestedSvg.getAttribute('viewBox') || ''
      if (width && height && viewBox) {
        const vbMatch = viewBox.match(/^([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)$/)
        if (vbMatch) {
          const vbX = parseFloat(vbMatch[1])
          const vbY = parseFloat(vbMatch[2])
          const vbW = parseFloat(vbMatch[3])
          const vbH = parseFloat(vbMatch[4])
          const widthNum = parseFloat(width)
          const heightNum = parseFloat(height)
          const scaleX = widthNum / vbW
          const scaleY = heightNum / vbH
          const g = doc.createElementNS('http://www.w3.org/2000/svg', 'g')
          g.setAttribute('transform', `translate(${x - vbX * scaleX},${y - vbY * scaleY}) scale(${scaleX.toFixed(3)},${scaleY.toFixed(3)})`)
          while (nestedSvg.firstChild) {
            g.appendChild(nestedSvg.firstChild)
          }
          for (const attr of Array.from(nestedSvg.attributes)) {
            if (!['x', 'y', 'width', 'height', 'viewBox', 'fill', 'overflow'].includes(attr.name)) {
              g.setAttribute(attr.name, attr.value)
            }
          }
          nestedSvg.parentNode?.replaceChild(g, nestedSvg)
        }
      }
    })
    // Add comment
    doc.insertBefore(doc.createComment('Generated with https://qr.mcfly-parapente.com/'), doc.documentElement)
    doc.insertBefore(doc.createComment('(c) Ronan Le Meillat - SCTG Development'), doc.documentElement)
    const serializer = new XMLSerializer()
    svgContent = serializer.serializeToString(doc)

    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent)
    browserUtils?.downloadURI(url, `QRCode.svg`)
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
      <button className='btn btn-outline-primary' type='button' onClick={() => handleDownloadSvg()}>
        .SVG
      </button>
    </div>
  )
}

export default Download
