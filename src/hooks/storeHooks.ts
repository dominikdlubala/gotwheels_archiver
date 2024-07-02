import { useDispatch, useSelector } from 'react-redux'; 
import { RootState, AppDispatch } from '../store'; 

export const useAppDipatch = useDispatch.withTypes<AppDispatch>(); 
export const useAppSelector = useSelector.withTypes<RootState>(); 