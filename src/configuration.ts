// All embedded logos

import { CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel, ShapeType } from "@liquid-js/qr-code-styling";
import { Options } from "./App";

export const adWebsiteUrl = {url:'https://lesailesdumontblanc.com', name:'Les Ailes du Mont-Blanc', longName:'Les Ailes du Mont-Blanc Paragliding School'}

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
  shape: ShapeType.square,
  size: 1000,
  removeBrand: false,
  image: defaultBrand,
  imageMargin: 10,
  mainShape: DotType.dot,
  shapeColor: '#1E2470',
  squareShape: CornerSquareType.extraRounded,
  squareColor: '#008ADC',
  cornersDotShape: CornerDotType.dot,
  cornersDotColor: '#D90012',
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

export const creationYear = 2024;