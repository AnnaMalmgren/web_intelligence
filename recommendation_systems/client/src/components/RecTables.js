import '../App.css'
import { IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/react'
import { type } from '../enums'

const RecTables = ({ rec, simType, isLoading }) => {
  if (isLoading) {
    return <IonSpinner />
  }
  else if (rec.length > 0) {
    return (
      <IonGrid fixed>
        <IonRow className='tableHead'>
          <IonCol>
            {simType === type.SIMILAR_USERS ? 'Top Matching Users' : 'Recommended Movies'}
          </IonCol>
        </IonRow>
        <IonRow className='tableSubHead'>
          <IonCol className='borderLeft'>
            {simType === type.SIMILAR_USERS ? 'User' : 'Movie'}
          </IonCol>
          <IonCol className='borderLeft'>
            Id
          </IonCol>
          <IonCol className='borderBothSides'>
            Score
          </IonCol>
        </IonRow>
        { rec.map((res, index) => (
          <IonRow key={index} className='borderBottom'>
            <IonCol className='borderLeft'>
              {res.title || res.name}
            </IonCol>
            <IonCol className='borderLeft'>
              {res.id}
            </IonCol>
            <IonCol className='borderBothSides'>
              {res.score.toFixed(4)}
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    )
  } else {
    return ''
  }
}

export default RecTables
