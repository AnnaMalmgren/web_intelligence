'use strict'

const fs = require('fs').promises

const readFile = async filename => {
  try {
    return fs.readFile(filename, 'utf8')
  } catch (err) {
    console.log(err.message)
  }
}

const getRows = data => data.split('\r\n')

const getCol = data => data.split('\t')

//remove word Blog from words.
const getWords = row => getCol(row).slice(1)

const getBlogs = rows => {
  return rows
    .map(row => {
      const col = getCol(row)
      const title = col.shift()
      return {
        title: title,
        wordCounts: col.map(count => Number(count)),
      }
    })
    .filter(blog => !!blog.title || !!blog.wordCount)
}

const getFileData = async filename => {
  let data = await readFile(filename)

  let rows = getRows(data)
  const words = getWords(rows.shift())
  const blogs = getBlogs(rows)

  return { wordCount: words.length, words: words, blogs: blogs }
}

const writeJSON = async (fromFile, toFile) => {
  const data = await getFileData(fromFile)

  await fs.writeFile(toFile, JSON.stringify(data))

  console.log('JSON data created')
}

try {
  writeJSON('./server/data_set/blogdata/blogdata.txt', './server/data_set/blogdata/data.json')
} catch (e) {
  console.log(e.message)
}
