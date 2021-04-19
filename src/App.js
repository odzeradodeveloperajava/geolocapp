import React from 'react';
import Map from './components/map/map';
import './App.css';
import Header from './components/header/header';
import UploadHandler from './components/upoloadHandler/uploadHandler';
import CardsWrapper from './components/cardsWrapper/cardsWrapper';
import fileHandler from './components/upoloadHandler/fileHandler.js';
import calculateGpsDatalon from './components/upoloadHandler/scripts/calculateGpsDatalon.js';
import calculateGpsDatalat from './components/upoloadHandler/scripts/calculateGpsDatalat.js';
/*global EXIF*/

class App extends React.Component{
    state = {
        items: [],
    }

    addItem = e => {
        const setNewItemHandler = (newItem) => {
            this.setState(prevState => ({
                items: [...prevState.items, newItem]
            }));
        }

        fileHandler(); //making only marker on map
        //let newItem ;
        let filesArray = document.getElementById('input').files.length;
        //Loop for every file uploaded //
        for (let i = 0; i < filesArray; i++) {
            const selectedFile = document.getElementById('input').files[i];
            EXIF.getData(selectedFile, async function () {
                if (this.exifdata.GPSLatitude !== undefined && this.exifdata.GPSLongitude !== undefined) {
                    async function mainHandler(){
                                        async function getCity() {
                                            try {
                                                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${calculateGpsDatalat(selectedFile)}&longitude=${calculateGpsDatalon(selectedFile)}&localityLanguage=pl`, {
                                                    method: 'GET',
                                                });
                                                const data = await response.json();
                                                return data;
                                            } catch (error) {
                                                console.error(error);
                                            }
                                        }
                                    
                                        async function logCity() {
                                            const data = await getCity();
                                            console.log(data);
                                            return data.locality;
                                        }

                                        console.log('funkcja log city ', logCity())
                    async function returnNewItem(){

                                return {
                                     cardId: (selectedFile).name,
                                     imageUrl: window.URL.createObjectURL(selectedFile), // Create url for thumbnail of image //
                                     size: (selectedFile).size,
                                     lat: calculateGpsDatalat(selectedFile),
                                     lon: calculateGpsDatalon(selectedFile),
                                     town: await logCity(),
                                 }
                                }
                        console.log(await returnNewItem());

                        return await returnNewItem();
                }
                    setNewItemHandler(await mainHandler());
                    //setNewItemHandler(newItem);
                    console.log();
                } else {
                    console.log('make modal with error');
                };
            })
        }

    };

    render(){
        return (
            <div className="pageWrapper">
                <Header />
                <Map />
                <UploadHandler submitFn={this.addItem} />
                <CardsWrapper
                    items={this.state.items}
                />
            </div>
        )};
}
export default App;
