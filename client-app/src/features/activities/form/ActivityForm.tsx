import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity:Activity) => void;
    submitting: boolean;
}
// activity:selectedActivity => in function the Prop activity will use the name selectedActivity
export const ActivityForm = ({ activity: selectedActivity, closeForm, createOrEdit, submitting }: Props) => {

    // const initialState = selectedActivity ?? {
    const initialState = selectedActivity || {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    }

    const [activity, setActivity] = useState(initialState);

    const handleSubmit = () => {
        // console.log(activity);
        createOrEdit(activity);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }



    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                {/* name property is required to use the handleInputChange function*/}
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}
