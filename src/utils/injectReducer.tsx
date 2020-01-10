import React, { useContext, useEffect } from 'react'
import { ReactReduxContext } from 'react-redux'
import { Reducer } from 'redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import asyncInjectReducer from './asyncInjectReducer'

export const withInjectReducer = (key: string, reducer: Reducer<any>) => <BaseProps extends {}>(
    WrappedComponent: React.ComponentType<BaseProps>
) => {
    class InjectReducer extends React.Component {
        static WrappedComponent = WrappedComponent

        static context = ReactReduxContext

        static displayName = `widthReducer(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`

        constructor(props: object, context: any) {
            super(props, context)
            asyncInjectReducer(context.store, key, reducer)
        }

        render(): JSX.Element {
            return <WrappedComponent {...(this.props as BaseProps)} />
        }
    }

    return hoistNonReactStatics(InjectReducer, WrappedComponent)
}

export const useInjectReducer = (key: string, reducer: Reducer<any>): void => {
    const context = useContext(ReactReduxContext)
    useEffect(() => {
        asyncInjectReducer(context.store, key, reducer)
    }, [])
}
