const { create, getLabelList } = require("../service/label.service")

class LabelController {
  async create(ctx) {
    const { name } = ctx.request.body
    await create(name)
    ctx.body = `${name}标签创建成功`
  }
  async list(ctx) {
    const res = await getLabelList(ctx.request.query)
    ctx.body = res
  }
}

module.exports = new LabelController()
