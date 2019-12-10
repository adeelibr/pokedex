export default promise => {
  let status = 'loading'
  let data = null
  let error = null

  promise.then(
    result => {
      status = 'complete'
      data = result
    },
    err => {
      status = 'errored'
      error = err
    }
  )

  return {
    read () {
      if (status === 'complete') return data
      if (status === 'errored') throw error
      throw promise
    }
  }
}
