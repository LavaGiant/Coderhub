const { saveAvatarInfo } = require("../service/file.service")

class FileController {
  async saveAvatarInfo(ctx) {
    const { mimetype, filename, size } = ctx.req.file
    const userId = ctx.user.id
    await saveAvatarInfo(filename, mimetype, size, userId)  
    ctx.body = `上传头像成功`
  }
}

module.exports = new FileController()
