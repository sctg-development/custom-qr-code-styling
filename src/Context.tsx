import React, { createContext, createRef, useEffect } from 'react'
import {QRCodeStyling} from "@liquid-js/qr-code-styling"

const canvasRef = createRef<HTMLDivElement>()

interface ContextProps {
  qrCode: QRCodeStyling
  canvasRef: React.RefObject<HTMLDivElement>
}

interface ProviderProps {
  children: React.ReactNode
}

const qrCode = new QRCodeStyling({
  data: window.location.origin,
  image: `${window.location.origin}/scanme.svg`,

  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 1,
    imageSize: 0.5
  }
})

export const AppContext = createContext<ContextProps>({
  qrCode,
  canvasRef
})

export default function ContextProvider({ children }: ProviderProps) {
  useEffect(() => {
    canvasRef.current && qrCode.append(canvasRef.current)
  }, [])

  return <AppContext.Provider value={{ qrCode, canvasRef }}>{children}</AppContext.Provider>
}
