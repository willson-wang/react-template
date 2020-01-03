import React, { lazy, Suspense } from "react"

const loadable = (importFunc, {fallback = null}) => {
    return props => {
        const LazyComponent = lazy(importFunc)
        return (
            <Suspense fallback={fallback}>
                <LazyComponent {...props} />
            </Suspense>
        )
    }
}

export default loadable