const render = require('react-dom').render
const h = require('react-hyperscript')
const Root = require('./components/root')

window.addEventListener('load', start)


function start () {
  const container = document.getElementById('main')
  render(h(Root), container)
}
