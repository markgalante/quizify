import { useLocation } from 'react-router-dom'

function useSearchQuery(){
    return new URLSearchParams(useLocation().search);
};

export default useSearchQuery;