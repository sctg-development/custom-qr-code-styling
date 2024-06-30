/**
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import { CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel, ShapeType } from "@liquid-js/qr-code-styling";
import { Options } from "./App";

export const adWebsiteUrl = {
  // The URL of the website (used in the footer and the default QR code data)
  url: 'https://lesailesdumontblanc.com',
  // The name of the website (used in the footer)
  name: 'Les Ailes du Mont-Blanc',
  // The full name of the website (used in the main paragraph)
  longName: 'Les Ailes du Mont-Blanc Paragliding School',
  // The short name of the website (used in the header)
  shortName: 'ADMB',
  // The logo of the website (used in the header)
  headerLogo: '/admb-white.svg'
}

// All embedded logos
// See public directory for the images
export const embeddedLogos = [
  { path: '/admb.svg', label: 'Mini Admb light blue' },
  { path: '/admb-navy.svg', label: 'Mini Admb navy blue' },
  { path: '/admb-red.svg', label: 'Mini Admb red' },
  { path: '/admb-black.svg', label: 'Mini Admb black' },
  { path: '/admb-micro.svg', label: 'Micro Admb light blue' },
  { path: '/admb-micro-navy.svg', label: 'Micro Admb navy blue' },
  { path: '/admb-micro-red.svg', label: 'Micro Admb red' },
  { path: '/gin.svg', label: 'Website paraglider' },
  { path: '/wing.svg', label: 'Website wing' },
  { path: '/scanme.svg', label: 'Scan me' }
];
export const defaultBrand = '/admb.svg';

export const initialOptions: Options = {
  // the shape of the QR code
  shape: ShapeType.square,
  // the size of the QR code for exporting
  size: 1000,
  // if true there is no logo in the center
  removeBrand: false,
  // the logo to be placed in the center (see embeddedLogos for the available options)
  image: defaultBrand,
  // the margin around the logo
  imageMargin: 10,
  // the shape of the main dots
  mainShape: DotType.dot,
  // the color of the main dots
  shapeColor: '#1E2470',
  // the shape of the 3 corner zones
  squareShape: CornerSquareType.extraRounded,
  // the color of the 3 corner zones
  squareColor: '#008ADC',
  // the shape of the dots in the 3 corner zones
  cornersDotShape: CornerDotType.dot,
  // the color of the dots in the 3 corner zones
  cornersDotColor: '#D90012',
  // the error correction level (L, M, Q, H)
  errorCorrectionLevel: ErrorCorrectionLevel.H
}

export const basicOptions: Options = {
  shape: ShapeType.square,
  size: 1000,
  removeBrand: true,
  image: defaultBrand,
  imageMargin: 10,
  mainShape: DotType.square,
  shapeColor: '#000000',
  squareShape: CornerSquareType.square,
  squareColor: '#000000',
  cornersDotShape: CornerDotType.square,
  cornersDotColor: '#000000',
  errorCorrectionLevel: ErrorCorrectionLevel.H
}

// The year the project was created (used in the footer, if the current year is different from the creation year, the years are displayed as a range)
export const creationYear = 2024;