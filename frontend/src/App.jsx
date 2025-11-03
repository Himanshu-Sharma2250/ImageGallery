import {Toaster} from "react-hot-toast"

import './App.css'

import Navbar from './components/Navbar'
import Tabs from './components/Tabs'

function App() {
    return (
        <div className='flex flex-col gap-5'>
            <Toaster />
            <Navbar />
            <Tabs />
        </div>
    )
}

export default App
