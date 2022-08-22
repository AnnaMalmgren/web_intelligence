import React from 'react'
import { IonToast } from '@ionic/react'

const Notification = (props) => {
  return (
    <IonToast
      isOpen={props.showToast}
      onDidDismiss={() => props.setShowToast(false)}
      message='No recommendations found'
      position='middle'
      color='light'
      duration={2000}
    />
  )
}

export default Notification
