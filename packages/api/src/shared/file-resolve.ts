import glob from 'glob-promise'
import { pathToFileURL } from 'node:url'
import path from 'path'
import type { NonEmptyArray } from 'type-graphql'

interface ResolverDictionary {
  [x: string]: unknown
}

export async function getResolvers(resolverGlobPath: string): Promise<NonEmptyArray<() => void>> {
  const normalize = resolverGlobPath.split(path.sep).join('/')
  let tmp: ResolverDictionary = {}
  const files = await glob(normalize)
  for (const file of files) {
    try {
      const module = await import(pathToFileURL(file).href)
      if (module) {
        tmp = { ...tmp, ...module }
      }
    } catch (e) {
      console.log(e)
      throw 'Не удалось получить resolver-файл: ' + file
    }
  }

  if (Object.keys(tmp).length > 0) {
    const result: NonEmptyArray<() => void> = Object.values(tmp) as NonEmptyArray<() => void>
    return result
  } else {
    throw 'Не удалось получить resolver-файлы'
  }
}

interface Mock {
  [x: string]: () => void
}

export async function getMocks(path: string): Promise<Mock> {
  let tmp: Mock = {}
  try {
    const files = await glob(path)
    for (const file of files) {
      try {
        const module = await import(file)
        if (module.default) {
          tmp = { ...tmp, ...module.default }
        }
      } catch (e) {
        throw Error('Не удалось получить mock-файл: ' + file)
      }
    }
  } catch (e) {
    throw Error('Не удалось получить mock-файлы')
  }
  return tmp
}
