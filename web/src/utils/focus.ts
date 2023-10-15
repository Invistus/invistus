import { useRef, useEffect } from 'react';

export function useFocus<T extends HTMLElement>(): [React.RefObject<T>, () => void] {
    const htmlElRef = useRef<T>(null);
    const setFocus = () => {
        setTimeout(() => {
            htmlElRef?.current?.scrollIntoView();
        }, 100);
    };

    useEffect(() => {
        setFocus();
    }, []); // Empty dependency array ensures this runs once after component mounts

    return [htmlElRef, setFocus];
}
