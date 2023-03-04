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

export async function getLoggedUser(req, res) {
  const { user } = res.locals

  try {
    const visitResult = await db.query(`
      SELECT SUM(shortens."visitCount")
      FROM shortens
      WHERE "userId" = $1
    `, [user.id])

    const [visitCount] = visitResult.rows

    const urlResults = await db.query(`
      SELECT *
      FROM shortens
      WHERE "userId" = $1
    `, [user.id])

    const shortenedUrls = urlResults.rows.map((row) => {
      return {
        id: row.id,
        shortUrl: row.shortUrl,
        url: row.url,
        visitCount: row.visitCount
      }
    })

    res.send({
      id: user.id,
      name: user.name,
      visitCount: visitCount.sum || 0,
      shortenedUrls
    })

  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }

}

export async function getRanking(req, res) {

  try {

    const { rows } = await db.query(`
    SELECT u.id, u.name, 
    COUNT(s.id) as "linksCount",
    COALESCE(SUM(s."visitCount"), 0) as "visitCount"
    FROM users u
    LEFT JOIN shortens s ON s."userId" = u.id
    GROUP BY u.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `)

    res.send(rows)

  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }

}