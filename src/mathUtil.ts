import {
  create,
    matrixDependencies,
    multiplyDependencies,
    transposeDependencies
} from 'mathjs'

const config = {
  // optionally, you can specify configuration
}

// Create just the functions we need
const {
  matrix,
  transpose,
  multiply,
} = create({
  matrixDependencies,
  multiplyDependencies,
  transposeDependencies
}, config)

export {
  matrix,
  transpose,
  multiply,
}