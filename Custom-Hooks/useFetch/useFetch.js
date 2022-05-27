import { useEffect, useRef, useState } from "react";

export const useFetch = (url) => {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    setState({
      loading: true,
      error: null,
      data: null
    });

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setTimeout(() => {
          // solo para probar useRef, prevenir que se llame el estado del componente desmontado
          if (isMounted.current) {
            setState({
              loading: false,
              error: null,
              data
            });
          } else {
            console.log("setState no se llamó");
          }
        }, 1000);
      });
  }, [url]);

  return state;
};
