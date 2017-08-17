import { StaticRouter, Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

import Chrome from './layouts/chrome'
import ComponentDetail from './components/detail'
import CoreDetail from './core/detail'
import Home from './home'
import Install from './install'
import InstallCss from './install/css'
import './index.module.css'

const routes = (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/install" component={Install} />
    <Route exact path="/install/css" component={InstallCss} />
    <Route path="/core/:coreId/" component={CoreDetail} />
    <Route path="/components/:componentId/" component={ComponentDetail} />
  </div>
)

const Html = props =>
  <html>
    <head>
      <title>
        {props.title || 'Pluralsight Design System'}
      </title>
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <div id="app">
        {props.children}
      </div>
      <script src="/index.js" />
    </body>
  </html>

export default locals => {
  return ReactDOMServer.renderToStaticMarkup(
    <StaticRouter location={locals.path} context={{}}>
      <Html>
        {routes}
      </Html>
    </StaticRouter>
  )
}

if (typeof document != 'undefined') {
  ReactDOM.render(
    <BrowserRouter>
      {routes}
    </BrowserRouter>,
    document.getElementById('app')
  )
}
