/**
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import { CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel, ShapeType } from "@liquid-js/qr-code-styling";
import { Options } from "./App";

export const adWebsiteUrl = {
  /** The URL of the website (used in the footer and the default QR code data) */
  url: 'https://mcfly-parapente.com',
  /** The name of the website (used in the footer) */
  name: 'McFly Parapente',
  /** The full name of the website (used in the main paragraph) */
  longName: 'McFly Paragliding School',
  /** The short name of the website (used in the header) */
  shortName: 'mcfly',
  /** The logo of the website (used in the header) */
  headerLogo: '/logo_origami_white_square.svg'
}

/**
 * All embedded logos.
 * See public directory for the images.
 */
export const embeddedLogos = [
  { path: '/mcfly.svg', label: 'McFly' },
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

/**  The default logo */
export const defaultBrand = '/mcfly.svg';

/** The default QR code customisation options */ 
export const initialOptions: Options = {
  /** The shape of the QR code (square or circle) */
  shape: ShapeType.square,
  /** The size of the QR code for exporting */
  size: 1000,
  /** If true, there is no logo in the center */
  removeBrand: false,
  /** The logo to be placed in the center (see embeddedLogos for the available options) */
  image: defaultBrand,
  /** The margin around the logo */
  imageMargin: 10,
  /** The shape of the main dots (dot, randomDot, rounded, extraRounded, verticalLine, horizontalLine, classy, classyRounded, square, smallSquare, diamond) */
  mainShape: DotType.diamond,
  /** The color of the main dots */
  shapeColor: '#8363AA',
  /** The shape of the 3 corner zones (dot, square, heart, extraRounded, classy, outpoint, inpoint) */
  squareShape: CornerSquareType.square,
  /** The color of the 3 corner zones */
  squareColor: '#00A79D',
  /** The shape of the dots in the 3 corner zones (dot, square, heart, extraRounded, classy, outpoint, inpoint) */
  cornersDotShape: CornerDotType.dot,
  /** The color of the dots in the 3 corner zones */
  cornersDotColor: '#FFF200',
  /** The error correction level (L, M, Q, H) */
  errorCorrectionLevel: ErrorCorrectionLevel.H
}

/** The basic QR code customisation options (here is a black and white QR code with a square shape) */ 
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

/** The year the project was created 
 * (used in the footer, if the current year is different from the creation year, the years are displayed as a range) 
 */
export const creationYear = 2024;