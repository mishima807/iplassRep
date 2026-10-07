/*
 * Copyright 2025 DENTSU SOKEN INC. All Rights Reserved.
 */
import { performance } from 'perf_hooks'
import { execSync } from 'child_process'

import colors from 'colors'
import pkg from 'fs-extra'

// ビルド設定
import { buildConfig } from './build-config.js'

// Node.jsモジュール
const { copyFileSync, ensureDirSync, readFileSync, removeSync, writeFileSync } =
  pkg

// Vue.jsのライブラリビルド
const execVueLibBuild = () => {
  const startTime = performance.now()

  const buildCommand = 'vite build'

  const stdout = execSync(buildCommand, {
    timeout: 30 * 60 * 1000, //タイムアウト時間：30分
  })
  console.info(stdout.toString())

  // ビルドされたファイルを指定パスに移動する
  const jsMinFile = `${buildConfig.buildPath}/${buildConfig.buildFileName}.umd.js`
  const jsMapFile = `${buildConfig.buildPath}/${buildConfig.buildFileName}.umd.cjs.map`
  const cssFile = `${buildConfig.buildPath}/${buildConfig.buildFileName}.css`

  removeSync(`${buildConfig.buildPath}`)
  ensureDirSync(`${buildConfig.buildPath}`)
  copyFileSync(`./dist/${buildConfig.buildFileName}.umd.cjs`, jsMinFile)
  copyFileSync(`./dist/${buildConfig.buildFileName}.umd.cjs.map`, jsMapFile)
  copyFileSync(`./dist/${buildConfig.buildFileName}.css`, cssFile)

  // Material Design Iconはバンドルせずに別処理
  copyFileSync(
    `./node_modules/@mdi/font/css/materialdesignicons.min.css`,
    `${buildConfig.buildPath}/materialdesignicons.min.css`
  )
  // '../fonts'を'./fonts'に置換
  const mdiCssFile = readFileSync(
    `${buildConfig.buildPath}/materialdesignicons.min.css`,
    'utf-8'
  )
  const replaced = mdiCssFile.replace(/\.\.\/fonts/g, './fonts')
  writeFileSync(
    `${buildConfig.buildPath}/materialdesignicons.min.css`,
    replaced
  )

  ensureDirSync(`${buildConfig.buildPath}/fonts`)
  copyFileSync(
    `./node_modules/@mdi/font/fonts/materialdesignicons-webfont.eot`,
    `${buildConfig.buildPath}/fonts/materialdesignicons-webfont.eot`
  )
  copyFileSync(
    `./node_modules/@mdi/font/fonts/materialdesignicons-webfont.ttf`,
    `${buildConfig.buildPath}/fonts/materialdesignicons-webfont.ttf`
  )
  copyFileSync(
    `./node_modules/@mdi/font/fonts/materialdesignicons-webfont.woff`,
    `${buildConfig.buildPath}/fonts/materialdesignicons-webfont.woff`
  )
  copyFileSync(
    `./node_modules/@mdi/font/fonts/materialdesignicons-webfont.woff2`,
    `${buildConfig.buildPath}/fonts/materialdesignicons-webfont.woff2`
  )

  console.info(
    colors.green('√') + ' Build vue library completed in %d ms.',
    (performance.now() - startTime).toFixed(3)
  )
}

try {
  execVueLibBuild()
} catch (error) {
  console.error(error)
}
