import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
// import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    //get data from API using Axios
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      });
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
    setEditMode(false);
  }
  const cancelSelectdActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : cancelSelectdActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleCreateOrEditActivity = (activity: Activity) => {
    // cannot edit the created activity with these code
    /*activity.id ?
      setActivities([...activities.filter(x => x.id != activity.id), activity]) :
      setActivities([...activities, { ...activity, id: uuid() }])
    */
    if (activity.id)
      setActivities([...activities.filter(x => x.id != activity.id), activity])
    else {
      //Use temp variable to keep the same GUID in selectedActivity and activityList
      let tempActivity = { ...activity, id: uuid() }
      setSelectedActivity(tempActivity);
      setActivities([...activities, tempActivity as Activity]);
    }

    setEditMode(false);
  }

  const hadleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(x => x.id != id)])
  }
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={cancelSelectdActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={hadleDeleteActivity}
        />
      </Container>

    </Fragment>
  );
}

export default App;
