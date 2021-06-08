import React from 'react'
import style from './style.scss'
// import colors from '../../styles/colors.scss'

interface TabsItem {
  title: string
  content: any
}

interface TabsProps {
  tabs: Array<TabsItem>
  activeTab: number
  setActiveTab: any
  handleOnChange?: any
}

export const TabContent = (tabs: TabsItem) => {
  const { content } = tabs
  return <div className={style.tabs__content}>{content}</div>
}

export const Tabs: React.FC<TabsProps> = (props) => {
  const { tabs, handleOnChange, activeTab, setActiveTab } = props
  const openTab = (e: any) => setActiveTab(Number(e.target.dataset.index))

  return (
    <div className={style.tabs__box}>
      <div className={style.tabs__nav}>
        {tabs.map((elem, i) => (
          <button
            className={`${
              i === activeTab ? style.tabs__item__active : style.tabs__item
            }`}
            onClick={(e) => {
              openTab(e)
              handleOnChange && handleOnChange(e)
            }}
            data-index={i}
            key={i}
          >
            {elem.title}
          </button>
        ))}
      </div>
      {tabs[activeTab] && <TabContent {...tabs[activeTab]} />}
    </div>
  )
}
