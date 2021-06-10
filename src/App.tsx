import React, { useState, useEffect } from 'react';
import './App.css';
import TrafficControlService from './services/TrafficControlService';
import PubSub from 'pubsub-js';
import LightComponent from './components/LightComponent';

function App() {
  let trafficControlService = new TrafficControlService();
  const [northSouthLightStatus, setNorthSouthLightStatus] = useState(trafficControlService.getNorthSouthLightStatus());
  const [eastWestLightStatus, setEastWestLightStatus] = useState(trafficControlService.getEastWestLightStatus());
  const [isPeakHour, setIsPeakHour] = React.useState(trafficControlService.getIsPeakHour());

  const mySubscriber = (msg: string, data: any) => {
    switch (msg) {
      case "updateLights":
        trafficControlService.updateLights();
        console.log("Next check in " + data + " milliseconds.");
        break;
      case "UPDATE_NorthSouthLights":
        setNorthSouthLightStatus(data);
        break;
      case "UPDATE_EastWestLights":
        setEastWestLightStatus(data);
        break;
      default:
          break;
    }
  };

  useEffect(() => {
    PubSub.subscribe("updateLights", mySubscriber);
    PubSub.subscribe("UPDATE_NorthSouthLights", mySubscriber);
    PubSub.subscribe("UPDATE_EastWestLights", mySubscriber);

    trafficControlService.updateLights();
  }, []);

  const togglePeakHour = () => {
    setIsPeakHour(!isPeakHour);
    trafficControlService.setIsPeakHour(!isPeakHour);
  }

  return (
    <div className="App">
      <header className="App-header">
        <table className="Intersection-table">
          <tr>
            <td>NW</td>
            <td><LightComponent color={northSouthLightStatus} label="N" /></td>
            <td>NE</td>
          </tr>
          <tr>
            <td><LightComponent color={eastWestLightStatus} label="W" /></td>
            <td></td>
            <td><LightComponent color={eastWestLightStatus} label="E" /></td>
          </tr>
          <tr>
            <td>SW</td>
            <td><LightComponent color={northSouthLightStatus} label="S" /></td>
            <td>SE</td>
          </tr>
        </table>
        <div>
          <input type="checkbox" defaultChecked={isPeakHour} onChange={() => togglePeakHour()} name="isPeakHourCheckBox" />
          <label htmlFor="isPeakHourCheckBox">Is peak hour?</label>
        </div>
      </header>
    </div>
  );
}

export default App;
