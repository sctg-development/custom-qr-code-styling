/**
 * Copyright (c) 2021 - awran5
 * Copyright (c) 2024 - Ronan Le Meillat
 * Provided under the MIT License. See License file for details.
 */
import React, { ReactElement, useReducer } from 'react'

import { Tab } from '../App'

declare type TabsProps = {
  className?: string
  tabs: Tab[]
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
const Tabs = ({
  className = 'tabs-component',
  tabs = [],
  orientation = 'horizontal',
  type = 'tabs'
}: TabsProps): ReactElement => {
  const [{ selected }, dispatch] = useReducer(reducer, {
    selected: 0
  })

  const Panel = tabs && tabs.find((_, index) => index === selected)

  return (
    <div className={`${orientation === 'vertical' ? 'd-flex align-items-start ' : ''} ${className}`}>
      <div
        aria-orientation={orientation}
        className={`nav${orientation === 'vertical' ? ' flex-column col-3 nav-pills me-4' : ` nav-${type} mb-4`}`}
        role='tablist'
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            aria-controls={`pane-${index}`}
            aria-selected={selected === index}
            className={selected === index ? 'nav-link active' : 'nav-link'}
            id={`tab-${index}`}
            role='tab'
            tabIndex={selected === index ? 0 : -1}
            type='button'
            onClick={() => dispatch({ type: 'selected', payload: index })}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`tab-content${orientation === 'vertical' ? ' col-9' : ''}`}>
        <div
          aria-labelledby={`tab-${selected}`}
          className='tab-pane fade show active'
          id={`pane-${selected}`}
          role='tabpanel'
        >
          {Panel?.LazyComponent && <Panel.LazyComponent index={selected} />}
        </div>
      </div>
    </div>
  )
}

export default Tabs
