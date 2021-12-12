const { createReadStream } = require('fs')
const { getFileByFilename } = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/path-type')
const { create, getMomentById, getMomentList, update, remove, checkLabelExists, addLabel } = require("../service/moment.service")

class MomentController {
  async create(ctx) {
    const userId = ctx.user.id
    const { content } = ctx.request.body
    // 将数据插入到数据库
    await create(userId, content)
    ctx.body = `插入 ${content} 动态成功`
  }
  async detail(ctx) {
    const { momentId } = ctx.params
    const res = await getMomentById(momentId)
    ctx.body = res
  }
  async list(ctx) {
    const res = await getMomentList(ctx.query)
    ctx.body = res
  }
  async update(ctx) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    await update(momentId, content)
    ctx.body = `${content}修改成功`
  }
  async remove(ctx) {
    const { momentId } = ctx.params
    await remove(momentId)
    ctx.body = `删除成功`
  }
  async addLabels(ctx) {
    const { labels } = ctx
    const { momentId } = ctx.params
    for (const { id } of labels) {
      const isExist = await checkLabelExists(momentId, id)
      isExist || await addLabel(momentId, id)
    }
    ctx.body = '标签添加成功'
  }
  async fileInfo(ctx) {
    let { filename } = ctx.params
    const fileInfo = await getFileByFilename(filename)
    const {type} = ctx.query
    if(['small', 'middle', 'large'].some(item => item === type)) {
      filename = filename + '-' + type
    }
    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()
