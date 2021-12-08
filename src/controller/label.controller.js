const { create, getLabelList } = require("../service/label.service")

class LabelController {
  async create(ctx) {
    const { name } = ctx.request.body
    const result = await create(name)
    ctx.body = `${name}标签创建成功`
  }
  async list(ctx) {
    const result = await getLabelList(ctx.request.query)
    ctx.body = result
  }
}

module.exports = new LabelController()
