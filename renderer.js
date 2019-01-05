// // This file is required by the index.html file and will
// // be executed in the renderer process for that window.
// // All of the Node.js APIs are available in this process.

const WB_VERSION = '0.1.0'
const WB_BUILD = 0
const store = window.localStorage

const addScript = function (script) {
  var head  = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = 'dist/' + script + '.js'

  // link.rel  = 'stylesheet';
  // link.type = 'text/css';
  // link.href = 'dist/' + stylesheet + '.css';
  // link.media = 'all';
  head.appendChild(script);
}

const addStylesheet = function (stylesheet) {
  var head  = document.getElementsByTagName('head')[0];
  var link  = document.createElement('link');
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = 'dist/' + stylesheet + '.css';
  link.media = 'all';
  head.appendChild(link);
}

function resetVersion() {
  store.clear()
}

// check if the app is initialised in local storage
function init() {
  let ver = store.getItem('WB_VERSION')
  let b = store.getItem('WB_BUILD')

  if (!ver) {
    store.setItem('WB_VERSION', WB_VERSION)
    store.setItem('WB_BUILD', WB_BUILD)
    ver = store.getItem('WB_VERSION')
    b = store.getItem('WB_BUILD')
  }

  let title = window.document.title
  title += ` v${ver}`
   window.document.title = title

  console.log(`Version: ${ver} [${b}]`)

  addStylesheet('bulma')
  addStylesheet('app')
}

function close() {
  app.quit()
}

function log(message) {
  console.log(message)
}

// Initialise the storage
init()
