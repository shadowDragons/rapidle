import { NavLink, Outlet } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { ContextMenuProvider } from 'mantine-contextmenu'
import { IconCode, IconSearch, IconTools, IconSettings } from '@tabler/icons-react'

import '@mantine/core/styles.layer.css'
import 'mantine-contextmenu/styles.layer.css'
import styles from './styles.module.scss'

export default function Config() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <ContextMenuProvider>
        <main className={styles.config_layout}>
          <nav className={styles.sidebar}>
            <div className={styles.logo}>
              <IconCode size={24} />
              <span>Rapidle</span>
            </div>

            <div className={styles.nav_links}>
              <NavLink
                to="/config/category"
                className={({ isActive }) => (isActive ? styles.active : styles.link)}
              >
                <IconCode size={20} />
                <span>片段管理</span>
              </NavLink>

              <NavLink
                to="/config/quickView"
                className={({ isActive }) => (isActive ? styles.active : styles.link)}
              >
                <IconSearch size={20} />
                <span>快速访问</span>
              </NavLink>

              <NavLink
                to="/config/tools"
                className={({ isActive }) => (isActive ? styles.active : styles.link)}
              >
                <IconTools size={20} />
                <span>工具设置</span>
              </NavLink>

              <NavLink
                to="/config/setting"
                className={({ isActive }) => (isActive ? styles.active : styles.link)}
              >
                <IconSettings size={20} />
                <span>系统设置</span>
              </NavLink>
            </div>
          </nav>

          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
      </ContextMenuProvider>
    </MantineProvider>
  )
}
