import Config from '@renderer/layouts/Config'
import Home from '@renderer/layouts/Home'
import { Category } from '@renderer/pages/Category'
import CategoryAction from '@renderer/pages/Category/CategoryAction'
import CategoryLoader from '@renderer/pages/Category/CategoryLoader'
import { Content } from '@renderer/pages/Content'
import ContentAction from '@renderer/pages/Content/ContentAction'
import ContentLoader from '@renderer/pages/Content/ContentLoader'
import { ContentList } from '@renderer/pages/ContentList'
import ContentListAction from '@renderer/pages/ContentList/ContentListAction'
import ContentListLoader from '@renderer/pages/ContentList/ContentListLoader'
import { QuickView } from '@renderer/pages/QuickView'
import QuickViewAction from '@renderer/pages/QuickView/QuickViewAction'
import QuickViewLoader from '@renderer/pages/QuickView/QuickViewLoader'
import { Setting } from '@renderer/pages/Setting'
import SettingAction from '@renderer/pages/Setting/SettingAction'
import SettingLoader from '@renderer/pages/Setting/SettingLoader'
import { Welcome } from '@renderer/pages/Welcome'
import { createHashRouter } from 'react-router-dom'
import { Tools } from '@renderer/pages/Tools'
import ToolsLoader from '@renderer/pages/Tools/ToolsLoader'
import ToolsAction from '@renderer/pages/Tools/ToolsAction'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'config',
    element: <Config />,
    children: [
      {
        index: true,
        element: <Category />,
        loader: CategoryLoader,
        action: CategoryAction
      },
      {
        path: 'setting',
        element: <Setting />,
        loader: SettingLoader,
        action: SettingAction
      },
      {
        path: 'quickView',
        element: <QuickView />,
        loader: QuickViewLoader,
        action: QuickViewAction
      },
      {
        path: 'category',
        element: <Category />,
        loader: CategoryLoader,
        action: CategoryAction,
        children: [
          {
            path: 'contentList/:cid?',
            element: <ContentList />,
            loader: ContentListLoader,
            action: ContentListAction,
            children: [
              {
                index: true,
                element: <Welcome />
              },
              {
                path: 'content/:id',
                element: <Content />,
                loader: ContentLoader,
                action: ContentAction
              }
            ]
          }
        ]
      },
      {
        path: 'tools',
        element: <Tools />,
        loader: ToolsLoader,
        action: ToolsAction
      }
    ]
  }
])
export default router
