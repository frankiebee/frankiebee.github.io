const createElement = require('virtual-dom/create-element')
const h = require('virtual-dom/virtual-hyperscript')

module.exports = render


function render(){
  return createElement(root())
}

function root(){
  return slideshowWrapper([
    markdownSlide(`
      # MetaMask
      ### bridging browsers to blockchains
    `),

    markdownSlide(`ease of adoption is our core goal`),

    //
    // METAMASK TODAY
    //

    markdownSlide(`
      # MetaMask Today
    `),

    slide(img('./images/flow00a.png')),
    slide(img('./images/flow00b.png')),
    slide(img('./images/flow00c.png')),
    slide(img('./images/flow00d.png')),
    slide(img('./images/flow01.png')),
    slide(img('./images/flow02.png')),
    slide(img('./images/flow03.png')),
    slide(img('./images/flow04.png')),
    slide(img('./images/flow05.png')),
    slide(img('./images/flow05a.png')),
    slide(img('./images/flow06.png')),
    slide(img('./images/flow07.png')),
    slide(img('./images/flow08.png')),
    slide(img('./images/flow09.png')),
    slide(img('./images/flow11.png')),

    markdownSlide(`
      ### status: Public Beta
    `),

    slide([
      img('./images/chrome-store.png'), h('br'),
      '44 releases since march (weekly!)', h('br'),
      '~7k users', h('br'),
      '~35 million RPC requests / day', h('br'),
      '( thanks infura! )', h('br'),
    ]),

    // browser dapp compat table
    slide([`metamask extension compat`, h('br'),h('br'),h('br'),
      table([
        // 'browser', 'status',
      ],[
        [`chrome:`, `live!`],
        [`opera:`, `ready!`],
        [`edge:`, `ready!`],
        [`firefox:`, `ready!`],
        [`safari:`, `nope :(`],
        [`mobile:`, `nope :(`],
      ])
    ]),

    //
    // HOW IT WORKS
    //

    markdownSlide(`
      # How it works
    `),

    slide(`just throw an ethereum client in an extension?`),
    markdownSlide(`
      blocked on networking:

      no tcp/udp`),
    slide(`mandatory sync time: non-starter`),
    slide(`rpc against trusted node`),
    slide(`id mgmt? rpc interception`),

    slide(img('./images/nomnoml.png')),

    markdownSlide(`
      ### web3-provider-engine
      make your own web3 provider

      a stack of rpc-handling middleware
    `),

    markdownSlide(`
      ### middleware stack
      * cache layer
      * id mgmt
      * trusted rpc node
    `),

    markdownSlide(`
      different trust model

      100% RPC - bring your own node!

      lock-in devalues product
    `),

// Dan Presents
// CHALLENGES
//

markdownSlide(`# LESSONS
## From Developers
               `),

markdownSlide(`### What's it like building a 3rd party Ethereum browser?
- We see cool Dapps being made!
- We handle developer problems!
`),
 //
    // FUTURE
    //
    markdownSlide(`# Future`),

    slide(`Multiple Account types (uPort, remote key stores)`),

    slide(`
      Browser Light Client
      via p2p network on webRTC
    `),

    slide(`Mascara MetaMask Polyfill`),
    slide(img('./images/add-script-tag.gif')),
    // slide(img('./images/mascara.gif')),

    // browser dapp compat table
    slide([`browser dapp compat`, h('br'),h('br'),h('br'),
      table([
        '', 'user has metamask', 'no metamask',
      ],[
        ['dapp has mascara', ':D', ':D'],
        ['no mascara', ':D', ':('],
      ])
    ]),

    slide(`private keys are safe, useable across dapps`),

    slide(`thanks`),

  ])
}

function markdown(text) {
  return h('script', {
    'data-markdown': '',
    'attributes': {
      'type': 'text/template'
    }
  }, text)
}

function markdownSlide(text){
  return (

    h('section', {
      'attributes': {
        'data-markdown': '',
      }
    }, [
      h('script', {
        'attributes': {
          'type': 'text/template'
        }
      }, text)
    ])

  )
}

function slide(content){
  return (

    h('section', content)

  )
}

function slideshowWrapper(content){
  return (

    h('.reveal', [ h('.slides', content) ])

  )
}

function img(src) {
  return h('img', {
    src: src,
    style: {
      // maxWidth: '660px',
      maxHeight: '75vh',
      background: 'whitesmoke',
    },
  })
}

function table(headers, rows){
  return h('table', [
    h('thead', headers.map(label => h('td', label))),
    h('tbody', rows.map(row => h('tr', row.map( datum => h('td', datum) )))),
  ])
}
