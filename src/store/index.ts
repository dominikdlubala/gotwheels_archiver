import { configureStore } from '@reduxjs/toolkit'; 
import { setupListeners } from '@reduxjs/toolkit/query'; 
import { collectionsApi } from './api/collectionsApi'; 

export const store = configureStore({
    reducer: {
        [collectionsApi.reducerPath]: collectionsApi.reducer
    }, 
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(collectionsApi.middleware); 
    }
}); 

setupListeners(store.dispatch); 

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch; 

export { collectionsApi } from './api/collectionsApi'; 