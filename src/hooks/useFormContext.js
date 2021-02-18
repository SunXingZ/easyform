import { useContext } from 'react';
import FormContext from '../lib/FormContext';

const useFormContext = () => {
    const formContext = useContext(FormContext);
    return formContext;
};

export default useFormContext;