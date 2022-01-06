
const imageResizer = async (props) => {
    const img = new Image();
    const url = window.URL.createObjectURL(props)
    img.src = url;

    const resizeHandler = async () =>{
      const width = img.width;
      const height = img.height;
      //Keeping canvas in same aspect ratio as original image
      const canvasHeight = height/(width/640);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width=640
      canvas.height=canvasHeight;
      ctx.drawImage(img, 0, 0, 640, canvasHeight);
      const blob = await new Promise(resolve => canvas.toBlob(resolve));
      return  blob
    };

    return new Promise((resolve, reject) =>{
      img.addEventListener('load', () => resolve(resizeHandler()));
      img.addEventListener('error', reject);
    })


}

export default imageResizer
