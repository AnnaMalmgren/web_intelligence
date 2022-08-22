'use strict'

const fs = require('fs').promises
const path = require('path')
const Page = require('../types/Page')
const getWordToId = require('../wordToId')
const pageRank = require('../algorithms/pagerank')
require('dotenv').config()

const indexPages = async () => {
  try {
    const start = Date.now()

    const games = await getFiles(process.env.WORDS_GAMES)
    const programming = await getFiles(process.env.WORDS_PROGRAMMING)
    const pages = await getAllPages(games, programming)

    const end = Date.now()
    console.log(`Creating pages with words and links in: ${(end - start) / 1000} seconds`)

    const pageRankStart = Date.now()
    await pageRank(pages)
    const pageRankEnd = Date.now()
    console.log(`Page rank calculation took ${(pageRankEnd - pageRankStart) / 1000} seconds`)

    return pages
  } catch (e) {
    console.log(e.message)
  }
}

const getFiles = async dir => fs.readdir(path.resolve(process.cwd(), dir))

const getAllPages = async (gaming, programming) => {
  const gamingPages = gaming.map(async file =>
    toPage(process.env.WORDS_GAMES, process.env.LINKS_GAMES, file)
  )
  const programmingPages = programming.map(async file =>
    toPage(process.env.WORDS_PROGRAMMING, process.env.LINKS_PROGRAMMING, file)
  )

  return (await Promise.all(gamingPages)).concat(await Promise.all(programmingPages))
}

const toPage = async (wordDir, linkDir, file) => {
  let words = await getWords(wordDir, file)
  let links = await getLinks(linkDir, file)
  return new Page(`https://wikipedia.org/wiki/${file}`, words, links)
}

const getWords = async (dir, file) => {
  let words = await fs.readFile(`${path.resolve(process.cwd(), dir)}/${file}`, 'utf8')
  return words.split(/\s+/g).map(getWordToId)
}

const getLinks = async (dir, file) => {
  let data = await fs.readFile(`${path.resolve(process.cwd(), dir)}/${file}`, 'utf8')
  const links = new Set()
  data = data.split('\n').filter(link => link !== '')
  data = data.map(link => {
    link.replace(/[\r\n]+/gm, '')
    links.add(`https://wikipedia.org${link}`)
  })

  return links
}

module.exports = {
  getIndexedPages: async () => indexPages(),
}
