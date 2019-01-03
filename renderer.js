// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const WB_VERSION = '0.1.0'
const BUILD = 0
const store = window.localStorage

// check if the app is initialised in local storage
function init() {
  let ver = store.getItem('WB_VERSION')

  if (!ver) {
    store.setItem('WB_VERSION', WB_VERSION)
    ver = store.getItem('WB_VERSION')
  }

  let title = window.document.title
  title += ` v${ver}`
  window.document.title = title

  console.log(`Version: ${ver}`)
}

function log(message) {
  console.log(message)
}

// Initialise the storage
init()
