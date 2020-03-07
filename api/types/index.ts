import * as path from 'path'
import {fileLoader, mergeTypes} from 'merge-graphql-schemas'

const arrayOfTypes = fileLoader(path.join(__dirname, './'))
const typesMerged = mergeTypes(arrayOfTypes)

export default typesMerged