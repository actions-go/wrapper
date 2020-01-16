import {binPath, go} from '../src/go'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

const go_main = `package main

import (
  "os"
  "fmt"
)

func main(){
  fmt.Println(os.Args[1:])
}
`

test('go run', async () => {
  fs.writeFileSync(path.join(__dirname, './main.go'), go_main)
  try {
    fs.mkdir(path.dirname(binPath()), 777, () => {})
    console.log(
      cp
        .execSync(
          `go build -o ${binPath()} ${path.join(__dirname, './main.go')}`
        )
        .toString()
    )
  } catch (error) {
    console.log('failed to compile test binary, hoping it already exists')
  }
  // Without getting stdout, the program should run properly
  await go(['hello'])
  const stdout: string[] = []
  await go(
    ['/usr/local/bin/node', '/workspace/lib/main.js', 'hello', 'world'],
    stdout
  )
  expect(stdout).toEqual(['[hello world]\n'])
})
