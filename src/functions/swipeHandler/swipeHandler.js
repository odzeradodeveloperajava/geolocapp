let touchstartX = 0
let touchendX = 0


const handleGesture = () => {

  console.log('dupsko')
  const slider = document.getElementById('imageContainer')
  const handleGestureX =() =>{
    if (touchendX < touchstartX) console.log('swiped left')
    if (touchendX > touchstartX) console.log('swiped right!')
  }

  slider.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
    handleGestureX()
  })

  slider.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    handleGestureX()
  })
  
}




export default handleGesture;