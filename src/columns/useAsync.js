import React from 'react'

function reducer (state, action) {
  switch (action.type) {
    case 'start': {
      return {
        data: null,
        error: null,
        status: 'loading'
      }
    }
    case 'complete': {
      return {
        data: action.data,
        error: null,
        status: 'idle'
      }
    }
    case 'error': {
      return {
        data: null,
        error: action.error,
        status: 'error'
      }
    }
    default:
      throw new Error(`Unknown action ${action.type}`)
  }
}

function useAsync (fn) {
  const [state, dispatch] = React.useReducer(reducer, {
    status: 'idle',
    data: null,
    error: null
  })

  React.useEffect(
    () => {
      let cancelled = false

      dispatch({ type: 'start' })
      fn().then(
        data => {
          if (cancelled) return
          dispatch({ type: 'complete', data })
        },
        error => {
          if (cancelled) return
          dispatch({ type: 'error', error })
        }
      )

      return () => {
        cancelled = true
      }
    },
    [fn]
  )

  return state
}

export default useAsync
