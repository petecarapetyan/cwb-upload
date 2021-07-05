import { createModel } from "@captaincodeman/rdx";
import { State } from "../store";
import { storageLoader, firestoreLoader } from "../firebase";
import { createSelector } from "reselect";
import { underscore4space } from '../../pleasemigrate/regex';

export interface UploadState {
  file?: {};
  progress: number;
  message?: string
}
export default createModel({
  state: <UploadState>{
    fileName: "",
    progress: 0,
  },
  reducers: {
    upload(state, file: File) {
      const fileName = file && file.name? file.name : "";
      return { ...state, fileName };
    },
    progress(state, percent: number) {
      return { ...state, progress: percent };
    },
    message(state, message) {
      return { ...state, message };
    }
  },
  effects: (_store) => ({
    async upload(file: File) {
      const name = underscore4space(`${new Date().getTime()}_${file.name}`)
      const ref = (await storageLoader).ref(`mediaUploaded/${name}`);
      if (file && file.name) {
        ref.put(file);
        const theUpload = ref.put(file);
        theUpload.on(
          "state_changed",
          function progress(soFar) {
            let percent = soFar.bytesTransferred / soFar.totalBytes;
            _store.getDispatch().upload.progress(percent * 100);
            _store.getDispatch().upload.message(`You are ${percent * 100}% complete`);   
          },
          function error(err) {
            console.error(err);
          },
          function complete() {
            var time = new Date().toLocaleTimeString("en-US")
            _store.getDispatch().upload.progress(100);  
            _store.getDispatch().upload.message(`You have uploaded the file ${file.name} at ${time}. You should probably find a public copy of this viewable in 5 minutes or less, see link below`);                 
          }
        );
        _store.getDispatch().upload.createRecord(name)
      }
    },
    async createRecord(name: string) {
      const db = await firestoreLoader;
      db.collection("media")
        .add({
          name
        })
        .catch(function (error) {
          console.error(`Error adding ${name}`, error);
        });
    },
    init(){
      _store.getDispatch().upload.message(""); 

    }
  }),
});

const getState = (state: State) => state.upload;
export namespace UploadSelectors {
  export const progress = createSelector([getState], (state) => state.progress);
  export const message = createSelector([getState], (state) => state.message);
}
