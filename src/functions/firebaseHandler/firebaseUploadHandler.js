import { storage } from '../../components/firebase/index';

const firebaseUploadHandler = (selectedFile) => {
    const uploadTask = storage.ref(`images/${selectedFile.name}`).put(selectedFile);
            uploadTask.on(
                'state_changed',
                snapshot => {},
                error => {
                  console.log(error);
                },
                () => {
                  storage
                    .ref('images')
                    .child(selectedFile.name)
                    .getDownloadURL()
                    .then(url => {
                    });
                }
            );
}

export default firebaseUploadHandler;
