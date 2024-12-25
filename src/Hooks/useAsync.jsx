import { useEffect, useState } from "react";

export function useAsync(func, dependencies = []) {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState();
    const [error, setError] = useState();

    const runAsync = () => {
        setLoading(true);
        setError(null);
        setValue(null);
        func()
            .then((response) => { 
                setValue(response);
                setLoading(false); 
            })
            .catch((err) => { 
                setError(err); 
                setLoading(false); 
            });
    };

    useEffect(() => {
        runAsync();
    }, dependencies);

    return { loading, value, error, runAsync };
}