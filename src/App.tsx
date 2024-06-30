/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef, useContext, useReducer, ReactElement } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { DotType, CornerSquareType, CornerDotType, ShapeType, ErrorCorrectionLevel } from '@liquid-js/qr-code-styling'
import { AppContext } from './Context'
import Header from './Components/Header'
import Tabs from './Components/Tabs'
import TextForm from './Components/Forms/Text'
import UrlForm from './Components/Forms/Url'
import SmsForm from './Components/Forms/Sms'
import GeoForm from './Components/Forms/Geo'
import TelForm from './Components/Forms/Tel'
import EmailForm from './Components/Forms/Email'
import VCardForm from './Components/Forms/VCard'
import WiFiForm from './Components/Forms/WiFi'
import Footer from './Components/Footer'
import Download from './Components/Download'
import EventForm from './Components/Forms/Event'

type Tab = {
  label: 'URL' | 'Text' | 'E-mail' | 'VCard' | 'Place' | 'WiFi' | 'SMS' | 'Phone' | 'Event',
  Component: () => ReactElement
}

const tabs: Tab[] = [
  {
    label: 'URL',
    Component: UrlForm
  },
  {
    label: 'Text',
    Component: TextForm
  },
  {
    label: 'E-mail',
    Component: EmailForm
  },
  {
    label: 'VCard',
    Component: VCardForm
  },
  {
    label: 'Place',
    Component: GeoForm
  },
  {
    label: 'WiFi',
    Component: WiFiForm
  },
  {
    label: 'SMS',
    Component: SmsForm
  },
  {
    label: 'Phone',
    Component: TelForm
  },
  {
    label: 'Event',
    Component: EventForm
  }
]

// All embedded logos
// See public directory for the images
const embeddedLogos = [
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
]
const defaultBrand = '/admb.svg'

interface Options {
  shape?: ShapeType
  size?: number
  removeBrand?: boolean
  image?: string
  imageMargin?: number
  mainShape?: DotType
  shapeColor?: string
  squareShape?: CornerSquareType
  squareColor?: string
  cornersDotShape?: CornerDotType
  cornersDotColor?: string
  errorCorrectionLevel?: ErrorCorrectionLevel
}

const initialOptions: Options = {
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

const basicOptions: Options = {
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
function App():ReactElement {
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
  const handleInternalLogo = (path: string) => () => {
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
  const handleOptions = (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
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
  }

  const handleOffcanvas = () => dispatch({ type: 'offcanvas-toggle' })

/**
 * Handles the save event when the "Save Style" button is clicked.
 * store the options object as a JSon string in the localstorage
 *
 * @param {React.MouseEvent<HTMLButtonElement>} event - The click event object.
 * @return {void} This function does not return anything.
 */
  const handleSave = (event: React.MouseEvent<HTMLButtonElement>):void => {
    const button = event.currentTarget
    button.innerText = 'Saving..'

    setTimeout(() => {
      button.innerText = 'Save Style'
    }, 1000)

    localStorage.setItem('qr-code', JSON.stringify(options))
    console.log(JSON.stringify(options))
  }

  const handleSavedValues = () => {
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
  const handleResetOptions = ():void => {
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
  const handleBasicOptions = ():void => {
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
  const handleResetImage = () => {
    if (uploadRef.current) {
      uploadRef.current.value = ''
      uploadError.current = ''
      setOptions((prev) => ({
        ...prev,
        image: defaultBrand
      }))
    }
  }

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
    window.onclick = (event: MouseEvent) => {
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
              console.log(`Parent is SVG so don't touch it`)
            } else {
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
              <div className='qr-code-container overflow-scroll' ref={divRef}>
                <div className='qr-code text-center mx-auto object-fit-contain' ref={canvasRef} />
                <div className='customization'>
                  <div className='py-5'>
                    <input
                      id='size'
                      className='form-range'
                      type='range'
                      name='size'
                      min='500'
                      max='1500'
                      step='50'
                      value={options.size}
                      onChange={handleOptions}
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
                        id='removeBrand'
                        className='form-check-input'
                        type='checkbox'
                        name='removeBrand'
                        checked={options.removeBrand}
                        onChange={handleOptions}
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
                <a className='text-secondary' href='https://lesailesdumontblanc.com'>
                  Les Ailes du Mont-Blanc Paragliding School
                </a>
                .
              </p>
              <Tabs className='mt-5' tabs={tabs} type='pills' />
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
          <button type='button' className='btn-close text-reset' aria-label='Close' onClick={handleOffcanvas} />
        </div>
        <div className='offcanvas-body'>
          <div className='main-shape'>
            <div className='row'>
              <label htmlFor='shape' className='col-sm-6 col-form-label fw-bold mb-3'>
                Outer Shape
              </label>
              <div className='col-sm-6'>
                <select
                  id='shape'
                  title='Outer Shape'
                  className='form-select'
                  name='shape'
                  value={options.shape}
                  onChange={handleOptions}
                >
                  <option value={ShapeType.square}>Square</option>
                  <option value={ShapeType.circle}>Circle</option>
                </select>
              </div>
            </div>
            <hr />
            <div className='row'>
              <label htmlFor='mainShape' className='col-sm-6 col-form-label fw-bold mb-3'>
                Main Shape
              </label>
              <div className='col-sm-6'>
                <select
                  id='mainShape'
                  className='form-select'
                  name='mainShape'
                  value={options.mainShape}
                  onChange={handleOptions}
                >
                  <option value={DotType.square}>Square</option>
                  <option value={DotType.smallSquare}>Small square</option>
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
              <label htmlFor='shapeColor' className='col-sm-6 col-form-label fw-bold mb-3'>
                Shape Color
              </label>
              <div className='col-sm-6'>
                <input
                  id='shapeColor'
                  className='form-control form-control-color'
                  name='shapeColor'
                  type='color'
                  onChange={handleOptions}
                  value={options.shapeColor}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='square-shape '>
            <div className='row pt-3'>
              <label htmlFor='squareShape' className='col-sm-6 col-form-label fw-bold mb-3'>
                Corners Square Shape
              </label>
              <div className='col-sm-6'>
                <select
                  id='squareShape'
                  className='form-select'
                  name='squareShape'
                  value={options.squareShape}
                  onChange={handleOptions}
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
              <label htmlFor='squareColor' className='col-sm-6 col-form-label fw-bold mb-3'>
                Corners Squares Color
              </label>
              <div className='col-sm-6'>
                <input
                  id='squareColor'
                  className='form-control form-control-color'
                  type='color'
                  name='squareColor'
                  value={options.squareColor}
                  onChange={handleOptions}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='corners-dots'>
            <div className='row pt-3'>
              <label htmlFor='cornersDotShape' className='col-sm-6 col-form-label fw-bold mb-3'>
                Corners Dot Shape
              </label>
              <div className='col-sm-6'>
                <select
                  id='cornersDotShape'
                  className='form-select'
                  name='cornersDotShape'
                  value={options.cornersDotShape}
                  onChange={handleOptions}
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
              <label htmlFor='cornersDotColor' className='col-sm-6 col-form-label fw-bold mb-3'>
                Corners Dot Color
              </label>
              <div className='col-sm-6'>
                <input
                  id='cornersDotColor'
                  className='form-control form-control-color'
                  name='cornersDotColor'
                  type='color'
                  value={options.cornersDotColor}
                  onChange={handleOptions}
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='brand'>
            <div className='row pt-3'>
              <label htmlFor='image' className='col-sm-3 col-form-label fw-bold mb-3'>
                Logo
              </label>
              <div className='col-sm-9'>
                <div className='input-group'>
                  <input
                    id='image'
                    className='form-control'
                    type='file'
                    onChange={handleOptions}
                    name='image'
                    ref={uploadRef}
                    accept='.gif,.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg'
                  />

                  <button
                    className={`input-group-text${
                      uploadRef.current && uploadRef.current.value === '' ? ' disabled' : ''
                    }`}
                    onClick={handleResetImage}
                    type='button'
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
                  <Dropdown title='Internal logo' id='collapsible-dropdown'>
                    <Dropdown.Toggle className='col-sm-12 text-start' variant="secondary" id='dropdown-basic'>
                      Internal logo
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {embeddedLogos.map((logo) => (
                        <Dropdown.Item onClick={handleInternalLogo(logo.path)}>
                          <img
                            src={logo.path}
                            width='30'
                            className='d-inline-block align-top me-2'
                            alt='React Bootstrap logo'
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
              <label htmlFor='imageMargin' className='col-sm-6 col-form-label fw-bold mb-3'>
                Logo Margin
              </label>
              <div className='col-sm-6'>
                <input
                  id='imageMargin'
                  className='form-control'
                  type='number'
                  name='imageMargin'
                  max={100}
                  value={options.imageMargin}
                  onChange={handleOptions}
                />
              </div>
            </div>

            <div className='main-shape'>
              <div className='row'>
                <label htmlFor='errorLevel' className='col-sm-6 col-form-label fw-bold mb-3'>
                  Error Correction Level
                </label>
                <div className='col-sm-6'>
                  <select
                    id='errorCorrectionLevel'
                    className='form-select'
                    name='errorCorrectionLevel'
                    title='Error Correction Level'
                    value={options.errorCorrectionLevel}
                    onChange={handleOptions}
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
