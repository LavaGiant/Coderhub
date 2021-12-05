const fs = require('fs')
const { resolve } = require('path')

const PRIVATE_KEY = fs.readFileSync(resolve(__dirname, 'private.key'))
const PUBLIC_KEY = fs.readFileSync(resolve(__dirname, 'public.key'))

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}
