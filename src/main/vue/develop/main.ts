/*
 * Copyright 2025 DENTSU SOKEN INC. All Rights Reserved.
 */

/**
 * このファイルは開発専用です (npm run serve)。ビルド結果には含まれません。
 * This file is only used for development (npm run serve).
 */

import '@iplass/iplass-mdc/styles'
// MDC Components
import {
  // @ts-expect-error - ts(2305): The type for `createVueApp` is intentionally not provided.
  createVueApp,
  // @ts-expect-error - ts(2305): The type for `createMdc` is intentionally not provided.
  createMdc,
  createDevelopOption,
  type DevelopExecuteOption,
} from '@iplass/iplass-mdc'

import '@mdi/font/css/materialdesignicons.min.css'

// 作成したコンポーネントを利用する場合は、以下のコメントアウトを解除してください。
// import * as customComponents from '../components'

// DevelopLayout
import DevelopLayout from '../develop/DevelopLayout.vue'
import { tenantContextPath, locale } from './devConf.js'

// MDCアプリケーションのオプション
const options: DevelopExecuteOption = {
  ...createDevelopOption(),
  tenantContextPath,
  locale,
}

// Vueアプリケーションの作成
const app = createVueApp(DevelopLayout)

// MDCモジュールのセットアップ
app.use(createMdc, options)

// 作成したコンポーネントを利用する場合は、以下のコメントアウトを解除してください。
// // 独自定義コンポーネントのグローバル登録
// for (const key in customComponents) {
//   // eslint-disable-next-line import/namespace
//   const component = customComponents[key]
//   if (component.__name == null) {
//     console.error(
//       'Component with undefined name detected. Please check. %o',
//       component
//     )
//   } else {
//     console.log('name:' + component.__name)
//   }
//   app.component(component.__name, component)
// }

// マウント
app.mount('#app')
