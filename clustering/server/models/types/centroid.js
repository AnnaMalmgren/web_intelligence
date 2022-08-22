'use strict'
const _ = require('lodash')

class Centroid {
  assignments
  prevAssignments
  wordCounts

  constructor() {
    this.assignments = []
    this.prevAssignments = []
    this.wordCounts = []
  }

  setAssignment = assignment => this.assignments.push(assignment)

  updatePrevAssignments = () => {
    this.prevAssignments = this.assignments
    this.clearAssignments()
  }

  clearAssignments = () => (this.assignments = [])

  setWordCount = (index, value) => (this.wordCounts[index] = value)

  isAssignmentsUnchanged = () => _.isEqual(this.assignments, this.prevAssignments)
}

module.exports = Centroid
