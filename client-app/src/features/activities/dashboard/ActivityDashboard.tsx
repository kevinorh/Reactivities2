import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity:Activity) => void;
    deleteActivity: (d: string) => void;
    submitting : boolean
}

export const ActivityDashboard = ({ activities, selectedActivity, selectActivity, cancelActivity, 
    editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting }: Props) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {/* if activities[0] the code to the right of '&&' will execute*/}
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelActivity}
                        openForm={openForm} />}

                {editMode &&                    
                    <ActivityForm activity={selectedActivity} closeForm={closeForm} createOrEdit={createOrEdit} submitting={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}
