'use strict'

const fs = require('fs').promises
const path = require('path')
const Page = require('../types/Page')
const getWordToId = require('../wordToId')
const pageRank = require('../algorithms/pagerank')
const { DATASET_WORDS, DATASET_LINKS, BASE_URL } = require('../../config/constants')

/**
 * Indexes and calculates pageranks for all pages i given dataset.
 * @returns {Promise<[Page]>}
 */
const indexPages = async () => {
  try {
    const start = Date.now()

    const wordFiles = await getFiles(DATASET_WORDS)
    const linkFiles = await getFiles(DATASET_LINKS)
    const pages = await getAllPages(wordFiles, linkFiles)

    const end = Date.now()

    console.log(
      `Creating ${pages.length} pages with words and links in: ${(end - start) / 1000} seconds`
    )

    const pageRankStart = Date.now()
    await pageRank(pages)
    const pageRankEnd = Date.now()
    console.log(`Page rank calculation took ${(pageRankEnd - pageRankStart) / 1000} seconds`)

    return pages
  } catch (e) {
    console.log(e.message)
  }
}

/**
 * @param {String} dir directory to read filenames from.
 * @returns {Promise<[String]>} names of the files in the given dir
 */
const getFiles = async dir => fs.readdir(path.resolve(process.cwd(), dir))

/**
 * Create pages from given word- and link-files
 * @param {[String]} wordFiles name of files containing the words
 * @param {[String]} linkFiles name of files containing the links
 * @returns {Promise<[Page]>}
 */
const getAllPages = async (wordFiles, linkFiles) => {
  const pages = wordFiles.map(async (wordFile, i) => toPage(wordFile, linkFiles[i]))

  return await Promise.all(pages)
}

/**
 * Create a page from given word- and link-file
 * @param {String} wordFile name of file containing the words
 * @param {String} linkFile name of file containing the links
 * @returns {Promise<Page>}
 */
const toPage = async (wordFile, linkFile) => {
  let words = await getWords(wordFile)
  let links = await getLinks(linkFile)
  return new Page(`${BASE_URL}/wiki/${wordFile}`, words, links)
}

/**
 * Gets all words and maps them to id from given file
 * @param {String} file name of file containing the words.
 * @returns {Promise<[Number]>}
 */
const getWords = async file => {
  let words = await fs.readFile(`${path.resolve(process.cwd(), DATASET_WORDS)}/${file}`, 'utf8')
  return words
    .split(/\s+/g)
    .map(w => w.toLowerCase())
    .map(getWordToId)
}

/**
 * Reads all links from given file
 * @param {String} file name of file containing the wanted links.
 * @returns {Promise<Set<String>>}
 */
const getLinks = async file => {
  let data = await fs.readFile(`${path.resolve(process.cwd(), DATASET_LINKS)}/${file}`, 'utf8')
  const links = new Set()
  data = data.split('\n').filter(link => link !== '')
  data = data.map(link => {
    link.replace(/[\r\n]+/gm, '')
    links.add(`${BASE_URL}${link}`)
  })

  return links
}

module.exports = {
  getIndexedPages: async () => indexPages(),
}
