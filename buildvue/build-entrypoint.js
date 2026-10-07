/*
 * Copyright 2025 DENTSU SOKEN INC. All Rights Reserved.
 */
import { createVueApp, createMdc } from '@iplass/iplass-mdc'
import '@iplass/iplass-mdc/styles'

// 作成したコンポーネントを利用する場合は、以下のコメントアウトを解除してください。
// import * as customComponents from '../src/main/vue/components'

// コンポーネント以外の作成物を利用する場合は、以下のようにexportしてください。
// export * from "../src/main/vue/composables";
// export * from "../src/main/vue/stores";
// export * from "../src/main/vue/types";
// export * from "../src/main/vue/utils";

/**
 * MDCモジュールを使用するカスタムアプリケーションをセットアップします。
 */
export const useMdc = (options) => {
  // アプリケーションインスタンスを作成
  const app = createVueApp()
  // MDCモジュールをインストール
  app.use(createMdc, options)

  // 作成したコンポーネントを利用する場合は、以下のコメントアウトを解除してください。
  // // カスタムコンポーネントをグローバル登録
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

  // アプリケーションインスタンスをマウント
  app.mount('#app')
}
