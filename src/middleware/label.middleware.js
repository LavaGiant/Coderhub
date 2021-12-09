const { getLabelByName, create } = require("../service/label.service")

const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body
  const newLabels = []
  for (const name of labels) {
    const labelResult = await getLabelByName(name)
    const label = { name }
    if (!labelResult) {
      // 创建标签
      const res = await create(name)
      label.id = res.insertId
    } else {
      label.id = labelResult.id
    }
    newLabels.push(label)
  }
  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelExists
}
