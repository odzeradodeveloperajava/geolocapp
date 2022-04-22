import React, { useState, useEffect} from 'react'
import styled from './UploadModal.module.scss'
import UploadButton from './UploadButton/UploadButton'
import { connect } from 'react-redux';
import { toggleUploadModal } from '../../../actions';

const UploadModal = ({uploadScreen, toggleUploadModal}) => {
  const [render, setRender] = useState(null)

  useEffect(() =>{
    if(uploadScreen === 'true'){
      setRender(
      <>
        <div className={styled.uploadModal__wrapper}>x</div>
        <div className={styled.uploadModal__centeringWrapper}>
          <div className={styled.uploadModal__textBox}>
          <div className={styled.uploadModal__closeButton} onClick={()=>toggleUploadModal('false')}>Close X</div>
            <div className={styled.uploadModal__text}>Choose photos from which you want to read exif data. If you want to keep photo private please check "do not upload" checkbox. Otherwise photo will be uploaded to our database.
              </div>
          <UploadButton />
          </div>
        </div>
    </>
    )
    }
    else {
      setRender(null)
    }
  },[uploadScreen])
  return render
}

const mapStateToProps = state => {
  return {
    uploadScreen : state.uploadScreen
  }
}
const mapDispatchToProps = dispatch =>({
  toggleUploadModal: (trueOrFalse) => dispatch(toggleUploadModal(trueOrFalse))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);