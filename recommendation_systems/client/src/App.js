import React, { useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonText, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react'
import UserContextProvider from './contexts/UserContext'
import GetRec from './components/GetRec'
import Notification from './components/Notification'
import RecTables from './components/RecTables'
import './App.css'

function App() {
  const [rec, setRec] = useState({ type: '', rec: [] })
  const [isLoading, setIsLoading] = useState(false)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recommendation system</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol className='ion-text-center ion-margin'>
              <IonText color='medium'>
                Choose what you want to find, for which user, and if user-based, simularity measure
              </IonText>
            </IonCol>
          </IonRow>
          <UserContextProvider>
            <IonRow>
              <IonCol>
                <GetRec setRecs={setRec} setIsLoading={setIsLoading} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <RecTables rec={rec.rec} simType={rec.type} isLoading={isLoading} />
              </IonCol>
            </IonRow>
          </UserContextProvider>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default App
