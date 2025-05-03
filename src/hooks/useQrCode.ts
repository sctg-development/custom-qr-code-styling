/**
 * Copyright (c) 2024-2025 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import { useContext } from 'react'

import { AppContext } from '../Context'

/**
 * Custom hook for accessing the QR code context data and functions.
 * This simplifies component access to QR code state and operations.
 *
 * @returns The QR code context values and functions
 */
export const useQrCode = () => {
  return useContext(AppContext)
}
