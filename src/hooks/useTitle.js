import { useEffect } from "react";

import React from 'react'

const useTitle = (title) => {

    useEffect(() => {
        const prevTitle = document.title
        document.title = title

        return () => document.title = prevTitle
    }, [title])
}

export default useTitle