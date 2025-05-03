/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */

import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer,
  ReactElement,
  lazy,
  Suspense,
  useCallback
} from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { DotType, CornerSquareType, CornerDotType, ShapeType, ErrorCorrectionLevel } from '@liquid-js/qr-code-styling'

import { AppContext } from './Context'
import Header from './Components/Header'
import Tabs from './Components/Tabs'
import Footer from './Components/Footer'
import Download from './Components/Download'
import { adWebsiteUrl, basicOptions, defaultBrand, embeddedLogos, initialOptions } from './configuration'

const TextForm = lazy(() => import('./Components/Forms/Text'))
const UrlForm = lazy(() => import('./Components/Forms/Url'))
const SmsForm = lazy(() => import('./Components/Forms/Sms'))
const GeoForm = lazy(() => import('./Components/Forms/Geo'))
const TelForm = lazy(() => import('./Components/Forms/Tel'))
const EmailForm = lazy(() => import('./Components/Forms/Email'))
const VCardForm = lazy(() => import('./Components/Forms/VCard'))
const WiFiForm = lazy(() => import('./Components/Forms/WiFi'))
const EventForm = lazy(() => import('./Components/Forms/Event'))

export type Tab = {
  /** The label of the tab. */
  label: 'URL' | 'Text' | 'E-mail' | 'VCard' | 'Place' | 'WiFi' | 'SMS' | 'Phone' | 'Event'
  /* eslint-disable-next-line no-unused-vars */
  LazyComponent: React.LazyExoticComponent<(T: { index: number }) => ReactElement>
}

/** Active tabs */
const tabs: Tab[] = [
  {
    label: 'URL',
    LazyComponent: UrlForm
  },
  {
    label: 'Text',
    LazyComponent: TextForm
  },
  {
    label: 'E-mail',
    LazyComponent: EmailForm
  },
  {
    label: 'VCard',
    LazyComponent: VCardForm
  },
  {
    label: 'Place',
    LazyComponent: GeoForm
  },
  {
    label: 'WiFi',
    LazyComponent: WiFiForm
  },
  {
    label: 'SMS',
    LazyComponent: SmsForm
  },
  {
    label: 'Phone',
    LazyComponent: TelForm
  },
  {
    label: 'Event',
    LazyComponent: EventForm
  }
]

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

const savedValues = localStorage.getItem('qr-code')
const optionsValues: Options = savedValues ? JSON.parse(savedValues) : initialOptions

declare type State = {
  offcanvas: boolean
}

type Action = { type: 'offcanvas-toggle' } | { type: 'offcanvas-close' }

/**
 * Reduces the state based on the given action.
 *
 * @param {State} state - The current state.
 * @param {Action} action - The action to be performed.
 * @return {State} The updated state.
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'offcanvas-toggle':
      return {
        offcanvas: !state.offcanvas
      }
    case 'offcanvas-close':
      return {
        offcanvas: false
      }
    default:
      return state
  }
}

/**
 * Renders the main application component.
 *
 * @return {ReactElement} The rendered application component.
 */
function App(): ReactElement {
  const { qrCode, canvasRef } = useContext(AppContext)
  const [options, setOptions] = useState(optionsValues)
  const [{ offcanvas }, dispatch] = useReducer(reducer, {
    offcanvas: false
  })

  const divRef = useRef<HTMLDivElement>(null)
  const offcanvasRef = useRef<HTMLInputElement>(null)
  const uploadRef = useRef<HTMLInputElement>(null)
  const uploadError = useRef('')

  /**
   * A function that handles setting internal logo options.
   * it is called when user clicks in the dropdown
   *
   * @param {string} path - The path of the internal logo image.
   * @return {() => void} A function that sets the options with the new internal logo image path.
   */
  const handleInternalLogo =
    (path: string): (() => void) =>
    () => {
      setOptions((prev) => ({
        ...prev,
        image: path
      }))
    }

  /**
   * Handles the options change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement & HTMLSelectElement>} event - The change event object.
   * @return {void} This function does not return anything but new values are recorded.
   */
  const memoizedHandleOptions = useCallback(
    (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const { name, value, checked, files } = event.target
      const type: React.HTMLInputTypeAttribute = event.target.type

      if (!files) {
        setOptions((prev) => ({
          ...prev,
          [name]: type === ('checkbox' as React.HTMLInputTypeAttribute) ? checked : value
        }))

        return
      }

      const image = files[0]

      uploadError.current = ''

      if (image) {
        // Check supported formats
        if (!image.type.match('image.*')) {
          uploadError.current = 'Error: File is not supported.'

          return
        }

        // Check max size (2M in Bytes)
        if (image.size > 2097152) {
          uploadError.current = 'Error: Maximum file size is 2 MB'

          return
        }

        const fileReader = new FileReader()

        fileReader.onerror = (err) => {
          uploadError.current = `Failed: ${err}`
        }

        fileReader.onload = () => {
          const image = fileReader.result as string

          setOptions((prev) => ({
            ...prev,
            image: image
          }))
        }
        fileReader.readAsDataURL(image)
      }
    },
    [setOptions]
  )

  const handleOffcanvas = () => dispatch({ type: 'offcanvas-toggle' })

  /**
   * Handles the save event when the "Save Style" button is clicked.
   * store the options object as a JSon string in the localstorage
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event object.
   * @return {void} This function does not return anything.
   */
  const handleSave = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const button = event.currentTarget

    button.innerText = 'Saving..'

    setTimeout(() => {
      button.innerText = 'Save Style'
    }, 1000)

    localStorage.setItem('qr-code', JSON.stringify(options))
    //console.log(JSON.stringify(options))
  }

  /**
   * Handles the saved values by parsing the JSON string stored in the local storage
   * and setting the options state with the parsed values.
   *
   * @return {void} This function does not return anything.
   */
  const handleSavedValues = (): void => {
    if (savedValues) {
      setOptions(JSON.parse(savedValues))
    }
  }

  /**
   * Resets the options and clears the upload ref.
   * revert the settings to initialOptions
   *
   * @return {void} This function does not return anything.
   */
  const handleResetOptions = (): void => {
    if (uploadRef.current) {
      uploadRef.current.value = ''
    }
    setOptions(initialOptions)
  }

  /**
   * Resets the upload input value and sets the options to basic options.
   * the basic options are a set for a square, black, standard QRCode
   * @returns {voide} This function does not return anything.
   *
   */
  const handleBasicOptions = (): void => {
    if (uploadRef.current) {
      uploadRef.current.value = ''
    }
    setOptions(basicOptions)
  }

  /**
   * Resets the image upload and clears the upload error.
   * It reverts the image to the defaultBrand
   *
   * @return {void} This function does not return anything.
   */
  const handleResetImage = (): void => {
    if (uploadRef.current) {
      uploadRef.current.value = ''
      uploadError.current = ''
      setOptions((prev) => ({
        ...prev,
        image: defaultBrand
      }))
    }
  }

  /**
   * Effect hook to update the QR code with the new options.
   */
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
  }, [qrCode, options])

  useEffect(() => {
    /**
     * A function that handles the click event on the window.
     *
     * @param {MouseEvent} event - The MouseEvent object.
     * @return {void} This function does not return anything.
     */
    window.onclick = (event: MouseEvent): void => {
      if (offcanvas && offcanvasRef.current) {
        if (event.target === offcanvasRef.current) dispatch({ type: 'offcanvas-close' })
      }
    }
  }, [offcanvas])

  // Dynamically resize SVG but ignore SVG inside SVG
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!mutation.addedNodes) return
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i]

          if (node.nodeName.toLowerCase() === 'svg') {
            const svg = node as SVGElement

            if (svg.parentElement instanceof SVGElement) {
              /* eslint-disable-next-line no-console */
              console.log(`Parent is SVG so don't touch it`)
            } else {
              /* eslint-disable-next-line no-console */
              console.log(`Parent is not SVG so touch it`)
              svg.setAttribute('width', '100%')
              svg.removeAttribute('height')
            }
          }
        }
      })
    })

    if (canvasRef.current) {
      observer.observe(canvasRef.current, {
        childList: true, // observe direct children
        subtree: true // and lower descendants too
      })
    }

    return () => observer.disconnect() // Clean up
  }, [])

  return (
    <div className='d-flex flex-column vh-100 App'>
      <Header />

      <main className='content'>
        <div className='container py-5'>
          <div className='row flex-lg-row-reverse justify-content-between g-5 py-5'>
            <div className='col-12 col-md-4'>
              <div ref={divRef} className='qr-code-container overflow-scroll'>
                <div ref={canvasRef} className='qr-code text-center mx-auto object-fit-contain' />
                <div className='customization'>
                  <div className='py-5'>
                    <input
                      className='form-range'
                      id='size'
                      max='1500'
                      min='500'
                      name='size'
                      step='50'
                      type='range'
                      value={options.size}
                      onChange={memoizedHandleOptions}
                    />
                    <div className='d-flex justify-content-between small'>
                      <span className='text-muted'>Low Quality</span>
                      <span className='fw-bold'>{` ${options.size} x ${options.size} Px`}</span>
                      <span className='text-muted'>High Quality</span>
                    </div>
                  </div>

                  <div className='d-grid py-4'>
                    <button className='btn btn-danger py-2' type='button' onClick={handleOffcanvas}>
                      Customize
                    </button>
                  </div>

                  <div className='d-grid py-4'>
                    <div className='form-check form-switch'>
                      <input
                        checked={options.removeBrand}
                        className='form-check-input'
                        id='removeBrand'
                        name='removeBrand'
                        type='checkbox'
                        onChange={memoizedHandleOptions}
                      />
                      <label className='form-check-label' htmlFor='removeBrand'>
                        Remove Brand
                      </label>
                    </div>
                  </div>

                  <Download />
                </div>
              </div>
            </div>

            <div className='col-12 col-md-6 col-lg-7'>
              <h1 className='display-5 fw-bold lh-1 mb-3 pt-5'>
                Generate your own QR code
                <br />
                and customize it!
              </h1>
              <p className='lead text-secondary'>
                Brought to you for free by{' '}
                <a className='text-secondary' href={adWebsiteUrl.url}>
                  {adWebsiteUrl.longName}
                </a>
                .
              </p>
              <Suspense
                fallback={
                  <button aria-selected='true' className='mt-5 nav nav-link' role='tab' type='button'>
                    Loading...
                  </button>
                }
              >
                <Tabs className='mt-5' tabs={tabs} type='pills' />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <div
        className={`offcanvas offcanvas-start${offcanvas ? ' show' : ''}`}
        style={offcanvas ? { visibility: 'visible' } : { visibility: 'hidden' }}
        tabIndex={-1}
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>Customization</h5>
          <button aria-label='Close' className='btn-close text-reset' type='button' onClick={handleOffcanvas} />
        </div>
        <div className='offcanvas-body'>
          <div className='main-shape'>
            <div className='row'>
              <label className='col-sm-6 col-form-label fw-bold mb-3' htmlFor='shape'>
                Outer Shape
              </label>
              <div className='col-sm-6'>
                <select
                  className='form-select'
                  id='shape'
                  name='shape'
                  title='Outer Shape'
                  value={options.shape}
                  onChange={memoizedHandleOptions}
                >
                  <option value={ShapeType.square}>Square</option>
                  <option value={ShapeType.circle}>Circle</option>
                </select>
              </div>
            </div>
            <hr />
            <div className='row'>
              <label className='col-sm-6 col-form-label fw-bold mb-3' htmlFor='mainShape'>
                Main Shape
              </label>
              <div className='col-sm-6'>
                <select
                  className='form-select'
                  id='mainShape'
                  name='mainShape'
                  value={options.mainShape}
                  onChange={memoizedHandleOptions}
                >
                  <option value={DotType.square}>Square</option>
                  <option value={DotType.smallSquare}>Small square</option>
                  <option value={DotType.tinySquare}>Tiny square</option>
                  <option value={DotType.dot}>Dots</option>
                  <option value={DotType.randomDot}>Random dots</option>
                  <option value={DotType.rounded}>Rounded</option>
                  <option value={DotType.extraRounded}>Extra rounded</option>
                  <option value={DotType.classy}>Classy</option>
                  <option value={DotType.classyRounded}>Classy rounded</option>
                  <option value={DotType.verticalLine}>Vertical lines</option>
                  <option value={DotType.horizontalLine}>Horizontal lines</option>
                  <option value={DotType.diamond}>Diamond</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <label className='col-sm-6 col-form-label fw-bold mb-3' htmlFor='shapeColor'>
                Shape Color
              </label>
              <div className='col-sm-6'>
                <input
                  className='form-control form-control-color'
                  id='shapeColor'
                  name='shapeColor'
                  type='color'
                  value={options.shapeColor}
                  onChange={memoizedHandleOptions}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='square-shape '>
            <div className='row pt-3'>
              <label className='col-sm-6 col-form-label fw-bold mb-3' htmlFor='squareShape'>
                Corners Square Shape
              </label>
              <div className='col-sm-6'>
                <select
                  className='form-select'
                  id='squareShape'
                  name='squareShape'
                  value={options.squareShape}
                  onChange={memoizedHandleOptions}
                >
                  <option value={CornerSquareType.square}>Square</option>
                  <option value={CornerSquareType.dot}>Dot</option>
                  <option value={CornerSquareType.extraRounded}>Extra rounded</option>
                  <option value={CornerSquareType.classy}>Classy</option>
                  <option value={CornerSquareType.inpoint}>Inpoint</option>
                  <option value={CornerSquareType.outpoint}>Outpoint</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <label className='col-sm-6 col-form-label fw-bold mb-3' htmlFor='squareColor'>
                Corners Squares Color
              </label>
              <div className='col-sm-6'>
                <input
                  className='form-control form-control-color'
                  id='squareColor'
                  name='squareColor'
                  type='color'
                  value={options.squareColor}
                  onChange={memoizedHandleOptions}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='corners-dots'>
            <div className='row pt-3'>
              <label className='col-sm-6 col-form-label fw-bold mb-3' htmlFor='cornersDotShape'>
                Corners Dot Shape
              </label>
              <div className='col-sm-6'>
                <select
                  className='form-select'
                  id='cornersDotShape'
                  name='cornersDotShape'
                  value={options.cornersDotShape}
                  onChange={memoizedHandleOptions}
                >
                  <option value={CornerDotType.square}>Square</option>
                  <option value={CornerDotType.dot}>Dot</option>
                  <option value={CornerDotType.classy}>Classy</option>
                  <option value={CornerDotType.extraRounded}>Extra rounded</option>
                  <option value={CornerDotType.heart}>Heart</option>
                  <option value={CornerDotType.inpoint}>Inpoint</option>
                  <option value={CornerDotType.outpoint}>Outpoint</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <label className='col-sm-6 col-form-label fw-bold mb-3' htmlFor='cornersDotColor'>
                Corners Dot Color
              </label>
              <div className='col-sm-6'>
                <input
                  className='form-control form-control-color'
                  id='cornersDotColor'
                  name='cornersDotColor'
                  type='color'
                  value={options.cornersDotColor}
                  onChange={memoizedHandleOptions}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='brand'>
            <div className='row pt-3'>
              <label className='col-sm-3 col-form-label fw-bold mb-3' htmlFor='image'>
                Logo
              </label>
              <div className='col-sm-9'>
                <div className='input-group'>
                  <input
                    ref={uploadRef}
                    accept='.gif,.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg'
                    className='form-control'
                    id='image'
                    name='image'
                    type='file'
                    onChange={memoizedHandleOptions}
                  />

                  <button
                    className={`input-group-text${
                      uploadRef.current && uploadRef.current.value === '' ? ' disabled' : ''
                    }`}
                    type='button'
                    onClick={handleResetImage}
                  >
                    &#x2715;
                  </button>
                </div>
                {uploadError.current && <span className='text-danger'>{uploadError.current}</span>}
                <div className='form-text'>
                  Upload your own logo image as .png, .jpg, .gif or .svg file format with a maximum size of 2 MB.
                </div>
                <div className='form-text'>Or use an intermal logo.</div>
                <div className='col-sm-12'>
                  <Dropdown id='collapsible-dropdown' title='Internal logo'>
                    <Dropdown.Toggle className='col-sm-12 text-start' id='dropdown-basic' variant='secondary'>
                      Internal logo
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {embeddedLogos.map((logo) => (
                        <Dropdown.Item key={logo.path} onClick={handleInternalLogo(logo.path)}>
                          <img
                            alt='React Bootstrap logo'
                            className='d-inline-block align-top me-2'
                            src={logo.path}
                            width='30'
                          />
                          {logo.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>

            <div className='row pt-3'>
              <label className='col-sm-6 col-form-label fw-bold mb-3' htmlFor='imageMargin'>
                Logo Margin
              </label>
              <div className='col-sm-6'>
                <input
                  className='form-control'
                  id='imageMargin'
                  max={100}
                  name='imageMargin'
                  type='number'
                  value={options.imageMargin}
                  onChange={memoizedHandleOptions}
                />
              </div>
            </div>

            <div className='main-shape'>
              <div className='row'>
                <label className='col-sm-6 col-form-label fw-bold mb-3' htmlFor='errorLevel'>
                  Error Correction Level
                </label>
                <div className='col-sm-6'>
                  <select
                    className='form-select'
                    id='errorCorrectionLevel'
                    name='errorCorrectionLevel'
                    title='Error Correction Level'
                    value={options.errorCorrectionLevel}
                    onChange={memoizedHandleOptions}
                  >
                    <option value={ErrorCorrectionLevel.H}>High</option>
                    <option value={ErrorCorrectionLevel.M}>Medium</option>
                    <option value={ErrorCorrectionLevel.Q}>Basic</option>
                    <option value={ErrorCorrectionLevel.L}>Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className='d-grid gap-2 d-md-flex justify-content-md-end pt-4'>
            <button className='btn btn-outline-danger me-auto' type='button' onClick={handleResetOptions}>
              Reset
            </button>
            <button className='btn btn-outline-danger me-auto' type='button' onClick={handleBasicOptions}>
              Basic
            </button>
            <button className='btn btn-primary' type='button' onClick={handleSavedValues}>
              Load Saved Style
            </button>
            <button className='btn btn-success' type='button' onClick={handleSave}>
              Save Style
            </button>
          </div>
        </div>
      </div>
      {offcanvas && <div ref={offcanvasRef} className={`modal-backdrop ${offcanvas ? 'fade show' : ''}`} />}
    </div>
  )
}

export default App
