import React, { Fragment, useEffect, useState } from 'react';
// import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
// import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    //get data from API using Axios
    // axios.get<Activity[]>('http://localhost:5000/api/activities')
    //   .then(response => {
    //     setActivities(response.data)
    //   });
    agent.Activities.list()
      .then(response => {
        //Format Date
        let activities: Activity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(activities);
        setLoading(false);
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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id != activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity as Activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    // // cannot edit the created activity with these code
    // /*activity.id ?
    //   setActivities([...activities.filter(x => x.id != activity.id), activity]) :
    //   setActivities([...activities, { ...activity, id: uuid() }])
    // */
    // if (activity.id)
    //   setActivities([...activities.filter(x => x.id != activity.id), activity])
    // else {
    //   //Use temp variable to keep the same GUID in selectedActivity and activityList
    //   let tempActivity = { ...activity, id: uuid() }
    //   setSelectedActivity(tempActivity);
    //   setActivities([...activities, tempActivity as Activity]);
    // }

    // setEditMode(false);
  }

  const hadleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id != id)])
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app' />
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
          submitting={submitting}
        />
      </Container>

    </Fragment>
  );
}

export default App;
