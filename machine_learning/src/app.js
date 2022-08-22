'use strict'

const Main = require('./controllers/Main')
const files = ['iris.csv', 'banknote_authentication.csv']
const { FOLDS } = require('./constants')

files.forEach(async file => {
  try {
    const app = new Main(file, FOLDS[1])
    app.run()
  } catch (e) {
    console.log(e)
  }
})
