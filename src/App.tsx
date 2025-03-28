import React, { useState, useEffect } from 'react';
import './App.scss';
import TrafficControlService from './services/TrafficControlService';
import PubSub from 'pubsub-js';
import TrafficLightComponent from './components/TrafficLightComponent';
import ParkingAssignmentListComponent from './components/ParkingAssignmentListComponent';

function App() {
  let trafficControlService = new TrafficControlService();
  const [northSouthLightStatus, setNorthSouthLightStatus] = useState(trafficControlService.getNorthSouthLightStatus());
  const [eastWestLightStatus, setEastWestLightStatus] = useState(trafficControlService.getEastWestLightStatus());
  const [isPeakHour, setIsPeakHour] = React.useState(trafficControlService.getIsPeakHour());

  const mySubscriber = (msg: string, data: any) => {
    switch (msg) {
      case "updateLights":
        trafficControlService.updateLights();
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
        <ParkingAssignmentListComponent />

        <div className="Table">
          <div className="Row">
            <div className="Column">NW</div>
            <div className="Column"><TrafficLightComponent color={northSouthLightStatus} /></div>
            <div className="Column">NE</div>
          </div>
          <div className="Row">
            <div className="Column"><TrafficLightComponent color={eastWestLightStatus} /></div>
            <div className="Column"><TrafficLightComponent color={eastWestLightStatus} /></div>
          </div>
          <div className="Row">
            <div className="Column">SW</div>
            <div className="Column"><TrafficLightComponent color={northSouthLightStatus} /></div>
            <div className="Column">SE</div>
          </div>
        </div>
        <div>
          <input type="checkbox" defaultChecked={isPeakHour} onChange={() => togglePeakHour()} name="isPeakHourCheckBox" />
          <label htmlFor="isPeakHourCheckBox">Is peak hour?</label>
        </div>
      </header>
    </div>
  );
}

export default App;
