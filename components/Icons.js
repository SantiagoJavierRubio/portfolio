/* eslint-disable tailwindcss/no-custom-classname */
const icons = {
  html: <i className="devicon-html5-plain" />,
  css: <i className="devicon-css3-plain" />,
  js: <i className="devicon-javascript-plain" />,
  ts: <i className="devicon-typescript-plain" />,
  react: <i className="devicon-react-original" />,
  redux: <i className="devicon-redux-plain" />,
  node: <i className="devicon-nodejs-plain" />,
  express: <i className="devicon-express-original" />,
  mongo: <i className="devicon-mongodb-plain" />,
  material: <i className="devicon-materialui-plain" />,
  mysql: <i className="devicon-mysql-plain" />,
  firebase: <i className="devicon-firebase-plain" />,
  handlebars: <i className="devicon-handlebars-plain" />,
  socketio: <i className="devicon-socketio-original" />,
  github: <i className="devicon-github-original" />,
  tailwind: <i className="devicon-tailwindcss-original-wordmark" />,
  next: <i className="devicon-nextjs-original" />
}

// TODO: Better handle non listed

export const getIcon = resource => {
  const r = resource.toLowerCase()
  switch (r) {
    case 'html':
      return icons.html
    case 'css':
      return icons.css
    case 'javascript':
      return icons.js
    case 'typescript':
      return icons.ts
    case 'react':
      return icons.react
    case 'next':
    case 'next-auth':
      return icons.next
    case 'redux':
    case 'redux-saga':
    case 'redux-persist':
      return icons.redux
    case 'nodejs':
      return icons.node
    case 'express':
    case 'express-session':
      return icons.express
    case 'mysql':
    case 'mariadb':
      return icons.mysql
    case 'mongodb':
    case 'mongoose':
      return icons.mongo
    case 'materialui':
      return icons.material
    case 'github':
      return icons.github
    case 'firebase':
      return icons.firebase
    case 'tailwind':
      return icons.tailwind
    default:
      return <i />
  }
}
