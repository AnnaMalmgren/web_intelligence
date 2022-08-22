import React, { useContext, useState } from 'react'
import { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonSegment, IonSegmentButton } from '@ionic/react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../contexts/UserContext'
import { metric, type } from '../enums'
import '../App.css'

const Form = (props) => {
  const users = useContext(UserContext)
  const [simType, setSimType] = useState('')

  const { register, handleSubmit, errors } = useForm({ defaultValues: { 'result': 3 } })

  const onSubmit = (data) => props.onSubmit({ ...data, type: simType })

  return (
    <React.Fragment>
      <IonSegment color='secondary' value={simType} onIonChange={e => setSimType(e.detail.value)}>
        <IonSegmentButton value={type.SIMILAR_USERS}>
          <IonLabel>Find Top matching users</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={type.REC_MOVIES}>
          <IonLabel>Find recommended movies</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={type.ITEM_BASED}>
          <IonLabel>Find recommended movies item based</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <form onSubmit={handleSubmit(onSubmit)} className='ion-margin-horizontal ion-padding-horizontal'>
        <IonItem className='ion-margin-horizontal ion-padding-horizontal'>
          <IonLabel>Users</IonLabel>
          <IonSelect name='user' interface='popover' ref={register({ required: true })}>
            {users.map((user, index) => (
              <IonSelectOption value={user.user_id} key={index}>
                {user.name}
              </IonSelectOption>
            ))}
          </IonSelect>
          {errors.user && <div className='error'>You must pick a user</div>}
        </IonItem>
        {simType !== type.ITEM_BASED ? (
          <IonItem className='ion-margin-horizontal ion-padding-horizontal'>
            <IonLabel>Similarity</IonLabel>
            <IonSelect name='metric' interface='popover' ref={register({ required: true })} >
              <IonSelectOption value={metric.EUCLIDEAN}>Euclidean</IonSelectOption>
              <IonSelectOption value={metric.PEARSON}>Pearson</IonSelectOption>
            </IonSelect>
            {errors.metric && (<div className='error'>You must pick a similarity metric</div>)}
          </IonItem>
        ) : ''}
        <IonItem className='ion-margin-horizontal ion-padding-horizontal'>
          <IonLabel>Results</IonLabel>
          <IonInput type='number' placeholder='3' name='result'
            ref={register({
              required: true,
              min: 1,
              max: 10
            })}
          />
          {errors.result && errors.result.type === "min" && (
            <div className="error">Results must be at least 1</div>)}
          {errors.result && errors.result.type === "max" && (
            <div className="error">Results can be at most 10</div>
          )}
        </IonItem>
        <IonButton
          color='success'
          type='submit'
          className='ion-margin-horizontal ion-padding-horizontal'
          disabled={simType.length === 0}
        >
          Get Result
      </IonButton>
      </form >
    </React.Fragment>
  )
}

export default Form
