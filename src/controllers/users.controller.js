import { db } from '../database/db.js'
import bcrypt from 'bcrypt'

export async function createUser(req, res) {
  const { name, email, password } = req.body

  try {

    const existingUser = await db.query(`
      SELECT * FROM users WHERE email = $1
    `, [email])

    if (existingUser.rowCount > 0) return res.sendStatus(409)

    const passwordHash = bcrypt.hashSync(password, 10)

    await db.query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
    `, [name, email, passwordHash])

    res.sendStatus(201)

  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }

}