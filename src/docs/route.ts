import { Express } from 'express'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

import swaggerOutputs from './swagger.json'

const docs = (app: Express) => {
  const css = fs.readFileSync(
    path.join(__dirname, '../../node_modules/swagger-ui-dist/swagger-ui.css'),
    'utf8',
  )

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutputs, {
      customCss: css,
    }),
  )
}

export default docs
