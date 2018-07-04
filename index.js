console.log('start')
register()

async function register () {
  try {
    const register = await navigator.serviceWorker.register('./serviceworker.js', {scope: '/'})
  }
  catch (err) {
    console.error('registration failed')
    console.error(err.stack || err)
    return
  }
}
