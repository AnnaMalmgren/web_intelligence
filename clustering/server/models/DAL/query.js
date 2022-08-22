'use strict'
const storage = require('./storage')

const blogs = async () => {
  const data = await storage.getData()

  return data.blogs
}

const wordCount = async () => {
  const data = await storage.getData()
  return data.wordCount
}

module.exports = {
  getBlogs: async () => blogs(),
  getWordCount: async () => wordCount(),
}
