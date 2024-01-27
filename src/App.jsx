import { Space } from 'antd'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import PageContent from './components/PageContent'
import SideMenu from './components/SideMenu'

function App() {

  return (
    <>
      <div className="App">
        <Header />
        <div className='sideMenuandPageContent'>
          <SideMenu />
          <PageContent />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
