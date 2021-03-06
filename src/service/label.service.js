const connection = require('../database')
class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const [result] = await connection.execute(statement, [name])
    return result
  }
  async getLabelList({ pageNum, pageSize }) {
    const statement = `SELECT * FROM label LIMIT ?, ?;`
    const [result] = await connection.execute(statement, [(pageSize * (pageNum - 1)).toString(), pageSize])
    return result
  }
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [result] = await connection.execute(statement, [name])
    return result[0]
  }
}
module.exports = new LabelService()
