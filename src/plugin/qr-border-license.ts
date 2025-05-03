import * as CryptoJS from 'crypto-js'
/**
 * Generates a license key for the QR Border Plugin
 * @param {Object} options - License configuration options
 * @param {number} [options.version=1] - License version
 * @param {string} [options.scope='qr-border-plugin'] - License scope
 * @param {string} [options.licensingModel='perpetual'] - Either 'perpetual' or 'subscription'
 * @param {string} [options.organization='qr-code-styling'] - Organization name
 * @param {number} [options.expiryTimestamp] - Expiry date as timestamp (milliseconds)
 * @param {string} [options.domain] - Domain restriction for the license
 * @returns {string} The generated license key
 */

export type LicenseOptions = {
  version?: number
  scope?: string
  licensingModel?: 'perpetual' | 'subscription'
  organization?: string
  expiryTimestamp?: number
  domain?: string
}
export function generateLicense(options: LicenseOptions = {}): string {
  // Default license values
  const license = {
    version: options.version || 1,
    scope: options.scope || 'qr-border-plugin',
    licensingModel: options.licensingModel || 'perpetual',
    organization: options.organization || 'qr-code-styling',
    expiryTimestamp: options.expiryTimestamp || Date.now() + 10 * 365.25 * 24 * 60 * 60 * 1000, // Default 1 year
    domain: options.domain || null
  }

  // Format as comma-separated key=value pairs
  let licenseString = ''

  if (license.version !== undefined) licenseString += `V=${license.version},`
  if (license.scope) licenseString += `S=${license.scope},`
  if (license.licensingModel) licenseString += `L=${license.licensingModel},`
  if (license.organization) licenseString += `O=${license.organization},`
  if (license.expiryTimestamp) licenseString += `E=${license.expiryTimestamp},`
  if (license.domain) licenseString += `D=${license.domain}`

  // Remove trailing comma if present
  licenseString = licenseString.replace(/,$/, '')

  // Base64 encode the license string
  const encodedLicense = base64Encode(licenseString)

  // Calculate MD5 hash of the encoded license
  const md5Hash = md5(encodedLicense)

  // Return the full license key (MD5 hash + encoded license)
  return md5Hash + encodedLicense
}

/**
 * Base64 encodes a string
 * @param {string} str - String to encode
 * @returns {string} Base64 encoded string
 */
function base64Encode(str: string): string {
  // Browser implementation
  if (typeof btoa === 'function') {
    return btoa(str)
  }

  // Node.js implementation
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64')
  }

  // Fallback implementation
  const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  let output = ''
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4
  let i = 0

  while (i < str.length) {
    chr1 = str.charCodeAt(i++)
    chr2 = i < str.length ? str.charCodeAt(i++) : NaN
    chr3 = i < str.length ? str.charCodeAt(i++) : NaN

    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63

    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }

    output += base64chars.charAt(enc1) + base64chars.charAt(enc2) + base64chars.charAt(enc3) + base64chars.charAt(enc4)
  }

  return output
}

/**
 * Calculates an MD5 hash of a string
 * @param {string} str - String to hash
 * @returns {string} MD5 hash
 */
function md5(str: string): string {
  // For Node.js environments
  if (typeof require === 'function') {
    try {
      const crypto = require('crypto')

      return crypto.createHash('md5').update(str).digest('hex')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Node.js crypto module not available', e)
    }
  }

  // For browser environments, you can use a library like CryptoJS
  if (typeof CryptoJS !== 'undefined' && CryptoJS.MD5) {
    return CryptoJS.MD5(str).toString()
  }

  // Include your preferred MD5 implementation here
  // This is a simplified placeholder implementation
  // eslint-disable-next-line no-console
  console.warn('No MD5 implementation available')

  return '00000000000000000000000000000000'
}

// Example usage:
// const license = generateLicense({
//   scope: 'qr-border-plugin',
//   licensingModel: 'perpetual',
//   expiryTimestamp: Date.now() + 2 * 365 * 24 * 60 * 60 * 1000 // 2 years (not needed for perpetual)
// });
// console.log(license);
// QRBorderPlugin.setKey(license);
