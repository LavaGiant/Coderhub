const { join } = require('path')
const { read, AUTO } = require('jimp')
const Multer = require('koa-multer')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/path-type')

const avatarUpload = Multer({
  dest: AVATAR_PATH
})

const avatarHandler = avatarUpload.single('avatar')

const pictureUpload = Multer({
  dest: PICTURE_PATH
})

const pictureHandler = pictureUpload.array('picture', 9)

const pictureResize = async (ctx, next) => {
  const files = ctx.req.files
  for (const { destination, filename, path } of files) {
    const destPath = join(destination, filename)
    read(path).then(image => {
      image.resize(1280, AUTO).write(`${destPath}-large`)
      image.resize(640, AUTO).write(`${destPath}-middle`)
      image.resize(320, AUTO).write(`${destPath}-small`)
    })
  }
  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}
