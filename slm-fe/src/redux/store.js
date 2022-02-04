import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './reducers/rootReducer';
 
const persistConfig = {
    key: "slmState",
    storage,
    stateReconciler: autoMergeLevel2,
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
const store = configureStore({reducer: persistedReducer});
 
const persistor = persistStore(store);

export { store, persistor };
