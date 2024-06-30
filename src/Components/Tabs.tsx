/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { ReactElement, useReducer } from 'react'

declare type TabsProps = {
  className?: string
  tabs: {
    label: string
    Component: (T: { index: number }) => ReactElement
  }[]
  orientation?: 'horizontal' | 'vertical'
  type?: 'tabs' | 'pills'
}

declare type State = {
  selected: number
}

type Action = { type: 'selected'; payload: number }

/**
 * Reduces the state based on the given action.
 *
 * @param {State} state - The current state.
 * @param {Action} action - The action to be performed.
 * @return {State} The updated state.
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'selected':
      return {
        selected: action.payload
      }
    default:
      return state
  }
}

/**
 * Renders a tab component with the given tabs, orientation, and type.
 * @param {TabsProps} props The tabs component properties.
 * @return {ReactElement} The rendered tab component.
 */
const Tabs = ({ className = 'tabs-component', tabs = [], orientation = 'horizontal', type = 'tabs' }: TabsProps): ReactElement => {
  const [{ selected }, dispatch] = useReducer(reducer, {
    selected: 0
  })

  const Panel = tabs && tabs.find((_, index) => index === selected)

  return (
    <div className={`${orientation === 'vertical' ? 'd-flex align-items-start ' : ''} ${className}`}>
      <div
        className={`nav${orientation === 'vertical' ? ' flex-column col-3 nav-pills me-4' : ` nav-${type} mb-4`}`}
        aria-orientation={orientation}
        role='tablist'
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            id={`tab-${index}`}
            className={selected === index ? 'nav-link active' : 'nav-link'}
            type='button'
            role='tab'
            tabIndex={selected === index ? 0 : -1}
            aria-selected={selected === index}
            aria-controls={`pane-${index}`}
            onClick={() => dispatch({ type: 'selected', payload: index })}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`tab-content${orientation === 'vertical' ? ' col-9' : ''}`}>
        <div
          id={`pane-${selected}`}
          className='tab-pane fade show active'
          role='tabpanel'
          aria-labelledby={`tab-${selected}`}
        >
          {Panel?.Component && <Panel.Component index={selected} />}
        </div>
      </div>
    </div>
  )
}
export default Tabs
