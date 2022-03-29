const cors = require('cors')
const express = require('express')
const mysql = require('mysql')
const nolookalikes = require('nanoid-generate/nolookalikes')

const app = express()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

app.use(express.json())
app.use(cors())

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(
    `App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`
  )
})

/**
 * Check if id already exist in database
 * @param {string} id 8 caracteres max
 * @returns
 */
function uniqueId(id) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM url WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(results.length > 0)
      }
    })
  })
}

app.post('/aliasExist', async (req, res) => {
  const { alias } = req.body
  res.send(await uniqueId(alias))
})

app.post('/saveUrl', async (req, res) => {
  let { longUrl, alias } = req.body
  let unique = false
  let id
  if (alias) {
    id = alias
  } else {
    // we generate an Id and check if it doesn't exist in database, else we generate a new one
    while (!unique) {
      id = nolookalikes(8)
      unique = !(await uniqueId(id))
    }
  }
  pool.query(
    `INSERT INTO url SET id = ?, longUrl = ?`,
    [id, longUrl],
    (err, results) => {
      if (err) {
        return res.send(err)
      } else {
        return res.send(id)
      }
    }
  )
})
/**
 * get original url from short
 */
app.post('/getUrl', (req, res) => {
  const { shortUrl } = req.body
  pool.query(`SELECT * FROM url WHERE id = ?;`, [shortUrl], (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json(results)
    }
  })
})
