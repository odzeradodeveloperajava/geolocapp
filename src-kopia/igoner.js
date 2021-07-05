console.clear()

$(':file').on('change', (e) => {

  // Main thread, not blocked by the async each function below	
  console.clear()
	console.log('images dropped')
  $('img').remove()

  // Async thread for each file
  $.each(e.target.files, async function(i) {
  	console.log(`image #${i} processing begins`)

    const file = this

    // 1. First function: no callback, just a variable assign!
    
    let metas = await PicturesService.getMetas({
      file
    })

    console.log(metas)

    // 2. This function will wait for the above to be executed
    
    let resized = await PicturesService.resize({
      file,
      opts: {
        orientation: metas.orientation,
        maxWidth: 1000,
        maxHeight: 1000
      }
    })

    console.log(resized)

    // 3. You can do anything synchrone-like between awaits
    // Here we add the dimensions of the new picture to its meta infos
    
    metas = Object.assign({
      width: resized.width,
      height: resized.height
    }, metas)

    console.log(metas)

    // 4. Same here
    
    let converted = await PicturesService.convert({
      canvas: resized,
      opts: {
        compression: 0.8,
        format: 'image/jpeg'
      }
    })

    // 5. Same here
    
    const preview = await PicturesService.toBase64(converted)
    
    console.log(`image #${i} processing ends`)

    // 6. Update DOM when all async function have finished
    
    $('body').append( $(`<img src="${preview}">`) );
  })

  console.log('Main thread is not blocked!')
})




// --------------
// PicturesService
// Take attention to `async` keywords and use of `Promises`
// --------------




let PicturesService = {};

// Arguments: File file
// Returns: object of metas informations
PicturesService.getMetas = async function({file}) {

  return new Promise((resolve, reject) => {
    loadImage.parseMetaData(file, (data) => {
      const exif = data.exif ? data.exif.getAll() : [];
      let orientation, location, dateTime;

      if( data.exif ) {
        // exif.Orientation is a string, loadImage expects a number
        orientation = data.exif[274];
      }
            
      if( exif.GPSLatitude && exif.GPSLongitude ) {
        location = {
          latitude: exif.GPSLatitude,
          latitudeRef: exif.GPSLatitudeRef,
          longitude: exif.GPSLongitude,
          longitudeRef: exif.GPSLongitudeRef
        };
      }

      if( exif.DateTimeDigitized ) {
        // Convert date to correct JS format
        const date = exif.DateTimeDigitized.split(' ')[0].replace(/:/g,'-');
        const time = exif.DateTimeDigitized.split(' ')[1];
        dateTime = new Date( [date,time].join(' ') );
      }

      resolve({
        location,
        dateTime,
        orientation
      });
    });
  });
}

// Arguments: File file, object of options
// Returns: canvas
PicturesService.resize = async function({file, opts}) {

  const options = Object.assign({
    maxWidth: 1000,
    maxHeight: 1000,
    orientation: 1,
    canvas: true
  }, opts);

  return new Promise((resolve, reject) => {
    loadImage(file, (canvas) => {
      resolve(canvas);
    }, options);
  });
}

// Arguments: Canvas element, object of options
// Returns: Blob
PicturesService.convert = async function({canvas, opts}) {

  const options = Object.assign({
    compression: 0.8,
    format: 'image/jpeg'
  }, opts);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, options.format, options.compression);
  });
}

// Arguments: File/Blog file
// Returns: String base64 encoded image
PicturesService.toBase64 = async function(file) {

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(readerEvt) {
      resolve(readerEvt.target.result);
    };

    reader.readAsDataURL(file);
  });
}