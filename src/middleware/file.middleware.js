const Multer = require('koa-multer')
const { AVATAR_PATH } = require('../constants/path-type')

const avatarUpload = Multer({
  dest: AVATAR_PATH
})

const avatarHandler = avatarUpload.single('avatar')

module.exports = {
  avatarHandler
}
