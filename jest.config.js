export default {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  testPathIgnorePatterns: ['node_modules']
}