import { configureStore } from '@reduxjs/toolkit'; 
import { setupListeners } from '@reduxjs/toolkit/query'; 
import { collectionsApi } from './api/collectionsApi'; 
import { carsApi } from './api/carsApi'; 
import { usersApi } from './api/usersApi'; 

import inputSlice  from './slices/inputSlice'; 
import formSlice from './slices/formSlice';

export const store = configureStore({
    reducer: {
        [collectionsApi.reducerPath]: collectionsApi.reducer, 
        [carsApi.reducerPath]: carsApi.reducer, 
        [usersApi.reducerPath]: usersApi.reducer, 
        input: inputSlice.reducer, 
        form: formSlice.reducer
    }, 
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(collectionsApi.middleware)
            .concat(carsApi.middleware) 
            .concat(usersApi.middleware)
    }
}); 

setupListeners(store.dispatch); 

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch; 

export { collectionsApi } from './api/collectionsApi'; 
export { 
    useFetchCollectionsQuery, 
    useAddCollectionMutation 
} from './api/collectionsApi'; 
export {
    useFetchCarsQuery, 
    useAddCarMutation
} from './api/carsApi'; 

export {
    useFetchUsersQuery, 
    useAddUserMutation
} from './api/usersApi'; 

export { changeValue } from './slices/inputSlice'; 
export { inputChange } from './slices/formSlice'; 