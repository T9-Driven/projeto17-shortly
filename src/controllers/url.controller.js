import { nanoid } from "nanoid"
import { db } from '../database/db.js'

export async function shortenUrl(req, res) {
  const { url } = req.body
  const { id: userId } = res.locals.user

  const shortenUrl = nanoid(8)

  try {

    const { rows: results } = await db.query(
      `INSERT INTO shortens (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id`
      , [url, shortenUrl, userId])

    const [result] = results

    res.status(201).send({
      id: result.id,
      shortUrl: shortenUrl
    })

  } catch (error) {
    console.log(error)
    res.status(500).send('Have a problem.')
  }


}