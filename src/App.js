
import React,{useState} from 'react';
import Navbar from './component/Navbar';
import LoadingBar from 'react-top-loading-bar'

import News from './component/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App=()=>{
  let pageSize=16;
  const [mode, setmode] = useState('light')
  const [text, settext] = useState('Enable Dark mode')
  const [progress, setProgress] = useState(0);

  const tooglemode=()=>{
    if(mode==='dark'){
      setmode('light')
      settext('Enable Dark mode')
      document.body.style.backgroundColor='white';
    }
    else{
      setmode('dark')
      settext('Enable Light mode')
      document.body.style.backgroundColor='black'
    }
  }

    return(
    <>
      <Router>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
      <Navbar mode={mode} tooglemode={tooglemode} text={text}/>
      <Routes>
          <Route exact path="/" element={<News setProgress={setProgress}country="in" pageSize={pageSize} category="general" key="general" mode={mode}/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} country="in" pageSize={pageSize} category="entertainment" key="entertainment" mode={mode}/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} country="in" pageSize={pageSize} category="sports" mode={mode}/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} country="in" pageSize={pageSize} category="technology" key="technology" mode={mode}/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} country="in" pageSize={pageSize} category="health" key="health" mode={mode}/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress} country="in" pageSize={pageSize} category="business" key="business" mode={mode}/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} country="in" pageSize={pageSize} category="science" key="science" mode={mode}/>}/>
        </Routes>
      </Router>
    </>
  );
}
export default App;
