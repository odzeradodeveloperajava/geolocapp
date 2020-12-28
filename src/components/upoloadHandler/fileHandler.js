/*global EXIF*/
/*global google*/
/*global map*/
import calculateGpsData from './scripts/calculateGpsData';

//main function
function fileHandler(){
    //detecting how many files were uploaded
    let imgCounter = document.getElementById('input').files.length;
    //loop for every file uploaded
    for (let i = 0; i < imgCounter; i++) {
        //declaring current file to work with
        const selectedFile = document.getElementById('input').files[i];
        //calling libray Exif to read file's metadata
        EXIF.getData(selectedFile, function() {
            //checking does image contain gps data
            if (selectedFile.exifdata.GPSLatitude !== undefined && selectedFile.exifdata.GPSLongitude !== undefined)
                    {
                    //calculate gps data
                    calculateGpsData(selectedFile)
                    // createCard();
                    }

            else    {
                    console.log(selectedFile.name + " not cointain gps data.");
                    };
             }
        )
    }
    //console.log(cardArr);
 }



export default fileHandler;