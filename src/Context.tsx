/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { createContext, createRef, useEffect, useState, useCallback } from 'react'
import {
  QRCodeStyling,
  DotType,
  CornerSquareType,
  CornerDotType,
  ShapeType,
  ErrorCorrectionLevel
} from '@liquid-js/qr-code-styling'

import { adWebsiteUrl, initialOptions, basicOptions } from './configuration'

const canvasRef = createRef<HTMLDivElement>()

export interface Options {
  /** The shape of the QR code (square or circle) */
  shape?: ShapeType
  /** The size of the QR code for exporting */
  size?: number
  /** If true, there is no logo in the center */
  removeBrand?: boolean
  /** The logo to be placed in the center (see embeddedLogos for the available options) */
  image?: string
  /** The margin around the logo */
  imageMargin?: number
  /** The shape of the main dots (dot, randomDot, rounded, extraRounded, verticalLine, horizontalLine, classy, classyRounded, square, smallSquare, diamond) */
  mainShape?: DotType
  /** The color of the main dots */
  shapeColor?: string
  /** The shape of the 3 corner zones (dot, square, heart, extraRounded, classy, outpoint, inpoint) */
  squareShape?: CornerSquareType
  /** The color of the 3 corner zones */
  squareColor?: string
  /** The shape of the dots in the 3 corner zones (dot, square, heart, extraRounded, classy, outpoint, inpoint) */
  cornersDotShape?: CornerDotType
  /** The color of the dots in the 3 corner zones */
  cornersDotColor?: string
  /** The error correction level (L, M, Q, H) */
  errorCorrectionLevel?: ErrorCorrectionLevel
}

interface ContextProps {
  qrCode: QRCodeStyling
  canvasRef: React.RefObject<HTMLDivElement | null>
  options: Options
  setOptions: React.Dispatch<React.SetStateAction<Options>>
  // eslint-disable-next-line no-unused-vars
  updateOption: <K extends keyof Options>(key: K, value: Options[K]) => void
  resetOptions: () => void
  setBasicOptions: () => void
  saveOptions: () => void
  loadSavedOptions: () => void
  // eslint-disable-next-line no-unused-vars
  setImageOption: (imagePath: string) => void
}

interface ProviderProps {
  children: React.ReactNode
}

const qrCode = new QRCodeStyling({
  data: adWebsiteUrl.url,
  shape: 'square',
  image: `${window.location.origin}/mcfly.svg`,

  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 1,
    imageSize: 0.5
  }
})

const savedValues = localStorage.getItem('qr-code')
const initialOptionsValues: Options = savedValues ? JSON.parse(savedValues) : initialOptions

export const AppContext = createContext<ContextProps>({
  qrCode,
  canvasRef,
  options: initialOptionsValues,
  setOptions: () => {},
  updateOption: () => {},
  resetOptions: () => {},
  setBasicOptions: () => {},
  saveOptions: () => {},
  loadSavedOptions: () => {},
  setImageOption: () => {}
})

export default function ContextProvider({ children }: ProviderProps) {
  const [options, setOptions] = useState<Options>(initialOptionsValues)

  /**
   * Updates a single option in the options state
   * @param key The option key to update
   * @param value The new value for the option
   */
  const updateOption = useCallback(<K extends keyof Options>(key: K, value: Options[K]) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value
    }))
  }, [])

  /**
   * Resets options to the initial default values
   */
  const resetOptions = useCallback(() => {
    setOptions(initialOptions)
  }, [])

  /**
   * Sets options to basic black and white QR code
   */
  const setBasicOptions = useCallback(() => {
    setOptions(basicOptions)
  }, [])

  /**
   * Saves current options to localStorage
   */
  const saveOptions = useCallback(() => {
    localStorage.setItem('qr-code', JSON.stringify(options))
  }, [options])

  /**
   * Loads previously saved options from localStorage
   */
  const loadSavedOptions = useCallback(() => {
    const saved = localStorage.getItem('qr-code')

    if (saved) {
      setOptions(JSON.parse(saved))
    }
  }, [])

  /**
   * Updates the image option
   * @param imagePath The path to the new image
   */
  const setImageOption = useCallback((imagePath: string) => {
    setOptions((prev) => ({
      ...prev,
      image: imagePath
    }))
  }, [])

  // Update QR code when options change
  useEffect(() => {
    const image = options.removeBrand ? '' : options.image

    qrCode.update({
      qrOptions: {
        errorCorrectionLevel: options.errorCorrectionLevel
      },
      shape: options.shape,
      width: options.size,
      height: options.size,
      image: image,
      dotsOptions: {
        type: options.mainShape,
        color: options.shapeColor
      },
      cornersSquareOptions: {
        type: options.squareShape,
        color: options.squareColor
      },
      cornersDotOptions: {
        type: options.cornersDotShape,
        color: options.cornersDotColor
      },
      imageOptions: {
        margin: options.imageMargin === undefined ? 0 : options.imageMargin / 10
      }
    })
  }, [options])

  useEffect(() => {
    canvasRef.current && qrCode.append(canvasRef.current)
  }, [])

  const contextValue = {
    qrCode,
    canvasRef,
    options,
    setOptions,
    updateOption,
    resetOptions,
    setBasicOptions,
    saveOptions,
    loadSavedOptions,
    setImageOption
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
