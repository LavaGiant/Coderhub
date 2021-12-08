class FileController{
  async saveAvatarInfo(ctx) {
    ctx.body = '上传头像'
  }
}

module.exports = new FileController()
