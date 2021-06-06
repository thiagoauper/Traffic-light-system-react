import React, { useState, useEffect } from 'react';
import './App.css';
import TrafficControlService from './services/TrafficControlService';
import PubSub from 'pubsub-js';

function App() {
  let trafficControlService = new TrafficControlService();
  const [northSouthLightStatus, setNorthSouthLightStatus] = useState(trafficControlService.getNorthSouthLightStatus());
  const [eastWestLightStatus, setEastWestLightStatus] = useState(trafficControlService.getEastWestLightStatus());
  const [isPeakHour, setIsPeakHour] = React.useState(trafficControlService.getIsPeakHour());

  const mySubscriber = (msg: string, data: any) => {

    switch (msg) {
        case 'UPDATE_NorthSouthLights':
          setNorthSouthLightStatus(data);
          break;
        case 'UPDATE_EastWestLights':
          setEastWestLightStatus(data);
          break;
        default:
            break;
    }
};


  useEffect(() => {
    const lightsInterval = trafficControlService.getLightsInterval();
    console.log(lightsInterval);

    const interval = setInterval(() => {trafficControlService.updateLights();}, lightsInterval);

    // trafficControlService.updateLights();
    
    PubSub.subscribe('UPDATE_NorthSouthLights', mySubscriber);
    PubSub.subscribe('UPDATE_EastWestLights', mySubscriber);
    
    return () => clearInterval(interval);
  }, [isPeakHour]);

  // function update() {
  //   trafficControlService.updateLights();
  //   setNorthSouthLightStatus(trafficControlService.getNorthSouthLightStatus());
  //   setEastWestLightStatus(trafficControlService.getEastWestLightStatus());
  // }

  function togglePeakHour() {
    setIsPeakHour(!isPeakHour);
    trafficControlService.setIsPeakHour(isPeakHour);
  }

  return (
    <div className="App">
      <header className="App-header">
        <table className="Intersection-table">
          <tr>
            <td>NW</td>
            <td className={northSouthLightStatus}>N</td>
            <td>NE</td>
          </tr>
          <tr>
            <td className={eastWestLightStatus}>W</td>
            <td></td>
            <td className={eastWestLightStatus}>E</td>
          </tr>
          <tr>
            <td>SW</td>
            <td className={northSouthLightStatus}>S</td>
            <td>SE</td>
          </tr>
        </table>
        <div>
          <input type="checkbox" defaultChecked={isPeakHour} onChange={() => togglePeakHour()} name="isPeakHourCheckBox" />
          <label htmlFor="isPeakHourCheckBox">Is peak hour?</label>
        </div>
        <button onClick={() => trafficControlService.updateLights()}>Change Status!</button>
      </header>
    </div>
  );
}

export default App;
