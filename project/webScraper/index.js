'use strict'

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const sanitize = require('sanitize-html')
const { BASE_URL, MAX, SELECTOR, DATASET_LINKS, DATASET_WORDS } = require('./config/constants')
let time = 0

/**
 * scrapes given MAX number pages starting from
 * given start path and base url and writes the HTML to
 * HTML folder, words and links to server/dataset
 */
const run = async () => {
  const start = process.argv[process.argv.length - 1]

  await createDirs()
  await scrape(new Set(), new Set([start]))
}

/**
 * Creates a folder:
 * scraper/HTML/<given start name>
 * server/dataset/<given start name>/Words
 * server/dataset/<given start name>/Links
 * @param {String} start name of wiki page to start from
 */
const createDirs = async () => {
  await createDir(`./HTML`)
  await createDir(DATASET_LINKS)
  await createDir(DATASET_WORDS)
}

/**
 * Creates given dirs if they don't exists.
 * @param {String} dirPath
 */
const createDir = async dirPath => {
  try {
    const pathname = path.resolve(process.cwd(), dirPath)
    const exists = await dirExists(pathname)
    if (!exists) {
      await fs.promises.mkdir(pathname, { recursive: true })
      console.log(`Directory ${dirPath} created successfully!`)
    } else {
      console.log(`Directory ${dirPath} already exists!`)
    }
  } catch (e) {
    console.log(e)
  }
}

/**
 * Checks if a given directory exists
 * @param {String} dir dir to check if exists
 * @returns {Promise<Boolean>}
 */
const dirExists = async dir => {
  try {
    await fs.promises.stat(dir)
    return true
  } catch (e) {
    if (e.code === 'ENOENT') return false
    console.log(e)
  }
}

/**
 * Scrapes 200 wiki pages.
 * @param {Set<String>} visited scraped pages.
 * @param {Set<String>} links linsk from scraped pages to visit.
 */
const scrape = async (visited, links) => {
  if (visited.size < MAX) {
    const start = Date.now()
    const path = links.values().next().value

    if (!visited.has(path)) {
      visited.add(path)
      links.delete(path)

      const name = getPageName(path)
      const cheerio = await fetchHTML(`${BASE_URL}${path}`)

      await writeFile(`./HTML/${name}.html`, cheerio.html())

      const pageLinks = getLinks(cheerio)
      const pageWords = getPageWords(cheerio)

      pageLinks.forEach(links.add, links)

      await writeFile(`${DATASET_WORDS}${name}`, pageWords)
      await writeFile(`${DATASET_LINKS}${name}`, [...pageLinks].join('\n'))
    }

    const end = Date.now()
    time += end - start

    scrape(visited, links)
  } else {
    console.log(`Done scraping ${visited.size} pages in ${time}`)
  }
}

/**
 * Gets name of wiki page from the given path.
 * @param {String} path
 */
const getPageName = path => path.split('/').slice(-1)

/**
 *
 * @param {String} url wikipage to fetch.
 */
const fetchHTML = async url => {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}

const writeFile = async (path, data) => fs.promises.writeFile(path, data)

/**
 * Gets and returns the outgoing links from a wiki page.
 * @param {CheerioAPI} cheerio contains the fetched wiki page
 */
const getLinks = cheerio =>
  new Set(
    cheerio(SELECTOR)
      .find('a')
      .map((i, link) => {
        const href = cheerio(link).attr('href')
        if (isValidLink(href)) {
          return href
        }
      })
      .get()
  )

/**
 * Check if href is a valid wiki link.
 * @param {String} href
 */
const isValidLink = href =>
  href !== undefined &&
  href.startsWith('/wiki/') &&
  !href.startsWith('/wiki/Wikipedia/') &&
  !href.includes(':')

/**
 * Removes attributes, tags, special characters and multiple whitespaces from html
 * @param {CheerioAPI} cheerio contains the fetched wiki page
 */
const getPageWords = cheerio => {
  const body = sanitize(cheerio(SELECTOR).text(), { allowedAttributes: {} })
  const noSpecialChars = removedSpecialChars(body)
  return removeMultipleWhiteSpace(noSpecialChars)
}

/**
 * Replace apostrophe with empty string and other non alphabetic characters with whitespace
 * @param {String} text
 */
const removedSpecialChars = text => text.replace(/[']/g, '').replace(/[^a-zA-Z0-9 ]/g, ' ')

/**
 * Replace multiple whitespaces with single whitespace
 * @param {String} text the text to replace multiple whitespaces from.
 */
const removeMultipleWhiteSpace = text => text.replace(/\s+/g, ' ').trim()

run()
