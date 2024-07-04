import { configureStore } from '@reduxjs/toolkit'; 
import { setupListeners } from '@reduxjs/toolkit/query'; 
import { collectionsApi } from './api/collectionsApi'; 
import { carsApi } from './api/carsApi'; 

export const store = configureStore({
    reducer: {
        [collectionsApi.reducerPath]: collectionsApi.reducer, 
        [carsApi.reducerPath]: carsApi.reducer
    }, 
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(collectionsApi.middleware)
            .concat(carsApi.middleware) 
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
    useFetchCarsQuery
} from './api/carsApi'; 