import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css';
import TaskCard from './components/TaskCard'

import {tasksImages, iconEllipsis, imageJeremy} from './images/dummy'

function App() {

  const [data, setData] = useState([])
  const [frequency, setFrequency] = useState('Weekly')

  useEffect(() => {
    async function axiosRequest() {
      const result = await axios('http://localhost:3001/times');
      setData(result.data);
    }

    axiosRequest();
  }, []);

  function setActivity(e) {
    [...document.querySelectorAll('div.time-tracking section.profile div.time a')].map(a => {
      a.classList.remove('active')
      return null
    })
    e.target.classList.add('active')
    setFrequency(e.target.text)
  }
  
  return (
    <div className="time-tracking">
      <section className="profile">
        <div className="person">
          <div className="container-person-image">
            <img src={imageJeremy} alt="Perfil Jeremy" />
          </div>
          <div className="text-profile">
            <p>Report for</p>
            <h1>Jeremy Robson</h1>
          </div>
        </div>
        <div className="time">
          <a href="#" onClick={(e) => setActivity(e)}>Daily</a>
          <a href="#" className="active" onClick={(e) => setActivity(e)}>Weekly</a>
          <a href="#" onClick={(e) => setActivity(e)}>Monthly</a>
        </div>
      </section>

      {data.map((task, index) => {
        switch (frequency) {
          case "Daily":
            return (
              <TaskCard
                key={index}
                task={task.title}
                taskImage={tasksImages[index]}
                menu={iconEllipsis}
                previous={`Last Day - ${task.timeframes.daily.previous}hrs`}>
                {`${task.timeframes.daily.current}hrs`}
              </TaskCard>
            )
          case "Weekly":
            return (
              <TaskCard
                key={index}
                task={task.title}
                taskImage={tasksImages[index]}
                menu={iconEllipsis}
                previous={`Last Week - ${task.timeframes.weekly.previous}hrs`}>
                {`${task.timeframes.weekly.current}hrs`}
              </TaskCard>
            )
          case "Monthly":
            return (
              <TaskCard
                key={index}
                task={task.title}
                taskImage={tasksImages[index]}
                menu={iconEllipsis}
                previous={`Last month - ${task.timeframes.monthly.previous}hrs`}>
                {`${task.timeframes.monthly.current}hrs`}
              </TaskCard>
            )
        }
      })}
    </div>
  )
}

export default App;
