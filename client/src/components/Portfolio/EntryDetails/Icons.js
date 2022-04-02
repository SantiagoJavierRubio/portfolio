const icons = {
    html: <i class="devicon-html5-plain" />,
    css: <i class="devicon-css3-plain" />,
    js: <i class="devicon-javascript-plain" />,
    ts: <i class="devicon-typescript-plain" />,
    react: <i class="devicon-react-original" />,
    redux: <i class="devicon-redux-plain" />,
    node: <i class="devicon-nodejs-plain" />,
    express: <i class="devicon-express-original" />,
    mongo: <i class="devicon-mongodb-plain" />,
    material: <i class="devicon-materialui-plain" />,
    mysql: <i class="devicon-mysql-plain" />,
}

export const getIcon = (resource) => {
    const r = resource.toLowerCase()
    switch(r) {
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
        case 'material':
            return icons.material
        default:
            return <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
                    </svg>

    }
}