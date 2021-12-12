const { saveAvatarInfo, saveFileInfo } = require("../service/file.service")
const { APP_HOST, APP_PORT } = require('../database/config')
const { updateAvatarUrlById } = require("../service/user.service")

class FileController {
  async saveAvatarInfo(ctx) {
    const { mimetype, filename, size } = ctx.req.file
    const userId = ctx.user.id
    await saveAvatarInfo(filename, mimetype, size, userId)
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`
    await updateAvatarUrlById(avatarUrl, userId)
    ctx.body = `上传头像成功`
  }
  async saveFileInfo(ctx) {
    const files = ctx.req.files
    const userId = ctx.user.id
    const { momentId } = ctx.query
    for (const file of files) {
      const { filename, mimetype, size } = file
      await saveFileInfo(filename, mimetype, size, userId, momentId)
    }
    ctx.body = `上传动态配图成功`
  }
}

module.exports = new FileController()
