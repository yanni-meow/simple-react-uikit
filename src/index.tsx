import React, { useEffect, useState } from 'react' // { useEffect, useState }
import './styles/styles.scss'
import colors from './styles/colors.scss'

import { Tabs } from './components/tabs/tabs'
//
import { Nav } from './components/nav/nav'
import { Table } from './components/table/table'

import { Modal } from './components/modal/modal'
import { Button } from './components/button/button'
import { InputText } from './components/input/input_text'
import { InputNum } from './components/input/input_num'
import { InputPass } from './components/input/input_pas'

import { Select } from './components/select/select'
import { Checkbox } from './components/check_group/checkbox'
import { Radio } from './components/check_group/radio'

import YaMap from './components/map/ya_map'
import Stopwatch from './components/time/stopwatch'
import Timer from './components/time/timer'
import moment from 'moment'

export const UIKIT = () => {
  // you can made custom handleOnChange for all of your components
  const customHandleOnChange = () => {
    console.log('meow')
  }
  // const customOnValidationError = () => {}
  // const customOnValidationSuccess = () => {}
  // const customErrorText = ''

  /* TABLE */
  // columns has 4 keys: name (string), key (string or number), sortable & searcheble (boolean)
  const tableColumns = [
    { name: 'id', key: 'id', sortable: true, searchable: false },
    { name: 'date', key: 'date', sortable: false, searchable: true },
    { name: 'is valid', key: 'isValid', sortable: true, searchable: false },
    { name: 'text', key: 'text', sortable: true, searchable: true }
  ]
  // here is test data of my pet proj
  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
  const lorem =
    'lorem ipsum dolor sit amet consectetur adipisicing elit asperiores officiis in ullam expedita rem quibusdam est odit possimus fugiat necessitatibus neque nostrum accusamus nam eaque assumenda excepturi odio delectus odit'
  const textArray = lorem.split(' ')

  const tableData = []
  for (let i = 0; i < 31; i++) {
    const randomIndex = Math.floor(Math.random() * 30)
    tableData.push({
      id: i + 1,
      date: `${Math.round(getRandomArbitrary(10, 30))}.0${Math.round(
        getRandomArbitrary(1, 9)
      )}.20${Math.round(getRandomArbitrary(10, 50))}`,
      isValid: Boolean(Math.round(Math.random())).toString(),
      text: textArray[randomIndex]
    })
  }
  // pagination has 2 parametres - init page after load and limit of items per page
  const tablePagination = {
    initPage: 1,
    limitPerPage: 10
  }

  /* NAV */
  // navInfo is array of objects. Every obj has title (string), link (string) and submenu (array, thats has the same parametrs)
  const navInfo = [
    {
      title: 'главная',
      link: './',
      submenu: []
    },
    {
      title: 'продукты',
      link: '',
      submenu: [
        {
          title: 'цветы',
          link: './',
          submenu: []
        },
        {
          title: 'деревья',
          link: './',
          submenu: []
        },
        {
          title: 'кусты',
          link: './',
          submenu: []
        },
        {
          title: 'поля',
          link: './',
          submenu: []
        },
        {
          title: 'ляля',
          link: './',
          submenu: []
        }
      ]
    },
    {
      title: 'о нас',
      link: './',
      submenu: []
    },
    {
      title: 'о вас',
      link: './',
      submenu: []
    },
    {
      title: 'контакты',
      link: '',
      submenu: [
        {
          title: 'контакты-контактики',
          link: './',
          submenu: []
        }
      ]
    }
  ]

  // you may do your custom style of menu to make it vertikal if you want. navStyle is an obj that has keys:
  // nav - to styles navigation box,
  // navLink - to styles links,
  // navItem - to styles item block (with no links too),
  // navSublist - to styles submenu list to be under or on the side of your main nav list
  // and navSubmenuItem - to styles elements in submenu list
  const navStyle = {
    nav: {
      width: '100vw',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)'
      // flexDirection: 'column',
      // alignItems: 'stretch',
      // alignSelf: 'baseline'
    },
    navLink: {
      // color: 'red'
    },
    navItem: {
      // background:
    },
    navSublist: {
      // top: '20%',
      // left: '100%'
    },
    navSublistItem: {}
  }

  /* MODAL WINDOW */
  // if you want be able to close your modal window current on it, not in a child component, you should props useState of it inside the component
  const [isModalOpen, setIsModalOpen] = useState(false)

  /* RADIO */
  // radioToRendeer is an array of objects. object should have keys
  // name (the same for all radio-checks in block) &
  // value (it will be labbel of your radio button)
  // and it's to not nessecery values: disables & checked (boolean)
  const radioToRender = [
    {
      name: 'radio',
      value: 'Viberi menya'
    },
    {
      name: 'radio',
      value: 'Neeet viberi meny!',
      disabled: true
    },
    {
      name: 'radio',
      value: 'Net menya'
    },
    {
      name: 'radio',
      value: 'oooooo',
      checked: true
    }
  ]

  /* SELECT */
  // you should put your array of objects insyde the useState
  const [selectData, setSelectData] = useState([])
  const APIurl = 'https://restcountries.eu/rest/v2/all'
  const getSelectCountries = () => {
    fetch(APIurl)
      .then((result) => result.json())
      .then((result) => {
        setSelectData(result)
      })
  }
  useEffect(() => getSelectCountries(), [])

  /* YaMap */
  const mapSettings = {
    startCenter: [37.64, 55.76],
    startZoom: 7,
    controls: [],
    mapTitle: 'здесь мог быть ваш заголовок',
    listTitle: 'Наши-ваши адреса',
    dataType: 'Feature',
    dataProperties: {
      // balloonContentHeader: `<font size=3><b>${locationName}</b></font>`,
      // balloonContentBody: `<p>Адрес подключения: ${ip}:${port}</p><p>Описание: ${odescription}</p><p>Адрес: ${osituation}</p>`,
      // balloonContentFooter: `Синхронизация: <font size=1>${lastupdatedmessage}</font>`,
      // clusterCaption: locationName,
      // hintContent: `<p>${locationName}</p><p>Адрес подключения: ${ip}:${port}</p>`
    },
    pointImage: 'https://image.flaticon.com/icons/png/512/3481/3481108.png',
    pointImageSize: [30, 30],
    closeImage: 'https://image.flaticon.com/icons/png/512/786/786195.png',
    closeImageSize: [16, 16]
  }
  const mapData = [
    {
      locationName: 'odin',
      markCoordinates: [37.05, 55.05],
      markAddress: 'Moscow, anywhere',
      markInfo: 'open 24/7',
      id: 1,
      fullInfo: (
        <React.Fragment>
          <div>
            vjgvjhbbj <br />
            ghcvjhjbhjbjbnjnbkj ghjgjh gjfgjv
            <p>fffff 10.20</p>
          </div>
        </React.Fragment>
      )
    },
    {
      locationName: 'dva',
      markCoordinates: [36.05, 55.55],
      markAddress: 'HZ gde-to tut',
      markInfo: 'open daily 10.00-20.00',
      id: 2
    },
    {
      locationName: 'tri',
      markCoordinates: [37.05, 56.05],
      markAddress: 'in our earth',
      markInfo: 'meow meow meow meow this our slogan',
      id: 3
    },
    {
      locationName: '4et',
      markCoordinates: [37.64, 55.76],
      markAddress: 'ulitsa Pushkina, dom Kolotushkina',
      id: 4
    }
  ]

  /* STOPWATCH */
  // it's has one necessary props - stopwatchStart - is a moment obj
  // actualy you can choose the stopwatchJoin, by default it's :
  // and your customStyle an be used too

  /* TAB */
  // in activeTab useState you put id of the preopen tab after load
  const [activeTab, setActiveTab] = useState(0)
  // tabs data is an array of objects. every object has 2 keys:
  // title (string) that will be a label of this tab &
  // content (anything) that will be show if this tab is active
  const tabsToRender = [
    {
      title: 'navigation',
      content: <Nav navInfo={navInfo} customStyle={navStyle} />
    },
    {
      title: 'timer',
      content: (
        <Timer timerDuration={[1, 3, 14]} customStyle={{ margin: '0 auto' }} />
      )
    },
    {
      title: 'stopwatch',
      content: (
        <Stopwatch
          stopwatchStart={moment()}
          stopwatchJoin='.'
          customStyle={{ margin: '0 auto' }}
        />
      )
    },
    {
      title: 'table',
      content: (
        <Table
          columns={tableColumns}
          data={tableData}
          tableName='meowmeow'
          pagination={tablePagination}
          handleOnChange={customHandleOnChange}
          grid='.6fr repeat(3, 1fr)'
        />
      )
    },
    {
      title: 'modal/inputs',
      content: (
        <React.Fragment>
          <Button
            type='submit'
            name='go modal'
            handleOnChange={() => {
              setIsModalOpen(true)
            }}
          />
          {isModalOpen && (
            <Modal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              customBtnText='close it right now!'
              customStyle={{ background: colors.semitone }}
            >
              <InputText
                type='text'
                popupPlaceholder='Представтесь'
                placeholder='ivan'
                icon='имя'
                handleOnChange={customHandleOnChange}
                styleProps='default'
              />
              <InputPass
                confirm
                popupPlaceholder='Придумай пароль'
                popupPlaceholderConfirm='Повтори пароль'
                placeholder='••••••'
                placeholderConfirm='••••••'
                handleOnChange={customHandleOnChange}
                styleProps='default'
              />
              <InputNum
                type='phone'
                placeholder='+7 (999) 999-99-99'
                datamask='+7 (000) 000-00-00'
                pattern='\([0-9]{3}\) [0-9]{3}[\-][0-9]{2}[\-][0-9]{2}'
                handleOnChange={customHandleOnChange}
                styleProps='default'
              />
            </Modal>
          )}
        </React.Fragment>
      )
    },
    {
      title: 'select',
      content: (
        <React.Fragment>
          {selectData.length > 0 && (
            <Select
              data={selectData}
              emptyAlert='no no noo'
              keys='numericCode'
              options='name'
              handleOnChange={customHandleOnChange}
              styleProps='default'
            />
          )}
        </React.Fragment>
      )
    },
    {
      title: 'checkboxs',
      content: (
        <div style={{ display: 'flex' }}>
          <Checkbox value name='qqq' handleOnChange={customHandleOnChange} />
          <Checkbox name='ooo' handleOnChange={customHandleOnChange} disabled />
          <Checkbox name='bbb' handleOnChange={customHandleOnChange} />
          <Radio
            radioToRender={radioToRender}
            handleOnChange={customHandleOnChange}
          />
        </div>
      )
    },
    {
      title: 'maps',
      content: <YaMap mapSettings={mapSettings} data={mapData} />
    }
  ]

  return (
    <React.Fragment>
      <Tabs
        tabs={tabsToRender}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        // handleOnChange={customHandleOnChange}
      />

      {/* BORDER BOTTOM */}
      {/* {selectData.length > 0 && (
        <Select
          data={selectData}
          // emptyAlert='frfrfr'
          keys='numericCode'
          options='name'
          handleOnChange={customHandleOnChange}
          styleProps='down'
        />
      )}
      <InputText
        type='text'
        popupPlaceholder='Введите что-нибудь'
        placeholder='ааааа'
        handleOnChange={customHandleOnChange}
        styleProps='down'
      />
      <InputNum
        type='number'
        popupPlaceholder='дeфолтные цифры'
        placeholder='123456'
        handleOnChange={customHandleOnChange}
        styleProps='down'
      />
      <InputPass
        confirm={false}
        popupPlaceholder='Пароль чтоб зайти'
        placeholder='••••••'
        handleOnChange={customHandleOnChange}
        styleProps='down'
      /> */}

      {/* HOLDER TOP */}
      {/* <InputText
        type='text'
        popupPlaceholder='Представтесь'
        placeholder='ivan'
        icon='имя'
        handleOnChange={customHandleOnChange}
        styleProps='top'
      />
      <InputPass
        confirm
        popupPlaceholder='Придумай пароль'
        popupPlaceholderConfirm='Повтори пароль'
        placeholder='••••••'
        placeholderConfirm='••••••'
        handleOnChange={customHandleOnChange}
        styleProps='top'
      />
      <InputNum
        type='phone'
        placeholder='+7 (999) 999-99-99'
        datamask='+7 (000) 000-00-00'
        pattern='\([0-9]{3}\) [0-9]{3}[\-][0-9]{2}[\-][0-9]{2}'
        handleOnChange={customHandleOnChange}
        styleProps='top'
      /> */}

      {/* DEFAULT STYLE */}
      {/* 
      <InputText
        type='email'
        popupPlaceholder='Введите почту'
        placeholder='meow@meow.com'
        icon='почта'
        // handleOnChange={customHandleOnChange}
        styleProps='default'
      /> 
      {selectData.length > 0 && (
        <Select
          data={selectData}
          // emptyAlert='frfrfr'
          keys='numericCode'
          options='name'
          handleOnChange={customHandleOnChange}
          styleProps='default'
        />
      )}  */}
    </React.Fragment>
  )
}
