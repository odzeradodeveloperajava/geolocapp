import React, { useState, useEffect} from 'react'
import styled from './UploadModal.module.scss'
import UploadButton from './UploadButton/UploadButton'
import { connect } from 'react-redux';
import { toggleUploadModal, doNotUploadToggle } from '../../../actions';

const UploadModal = ({uploadScreen, denyUploadToServer,toggleUploadModal, doNotUploadTogglex}) => {
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
            <div className={styled.uploadModal__uploadCheckboxWrapper}>
              <input onChange={()=>doNotUploadTogglex()} type="checkbox" id="doUpload" name="doUpload" checked={denyUploadToServer}/>
              <label htmlFor="doUpload"> do not upload file/s</label>
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
  },[uploadScreen, denyUploadToServer, toggleUploadModal, doNotUploadTogglex])
  return render
}

const mapStateToProps = state => {
  return {
    uploadScreen: state.uploadScreen,
    denyUploadToServer: state.denyUploadToServer
  }
}
const mapDispatchToProps = dispatch =>({
  toggleUploadModal: (trueOrFalse) => dispatch(toggleUploadModal(trueOrFalse)),
  doNotUploadTogglex: () => dispatch(doNotUploadToggle())
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);