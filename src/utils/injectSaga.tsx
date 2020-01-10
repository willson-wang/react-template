import React, { useContext, useEffect } from 'react'
import { ReactReduxContext } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { injectSaga, ejectSaga } from './asyncInjectSaga'

export const withInjectSaga = (key: string, saga: any) => <BaseProps extends {}>(
    WrapComponent: React.ComponentType<BaseProps>
) => {
    class InjectSaga extends React.Component {
        static WrapComponent = WrapComponent

        static contextType = ReactReduxContext

        static displayName = `withInjectSaga(${WrapComponent.displayName ||
            WrapComponent.name ||
            'Component'})`

        constructor(props: object, context: any) {
            super(props, context)

            injectSaga(context.store, key, { saga }, this.props)
        }

        componentWillUnmount(): void {
            ejectSaga(this.context.store, key)
        }

        render(): JSX.Element {
            return <WrapComponent {...(this.props as BaseProps)} />
        }
    }
    return hoistNonReactStatics(InjectSaga, WrapComponent)
}

export const useInjectSaga = (key: string, saga: any): void => {
    const context = useContext(ReactReduxContext)
    useEffect(() => {
        injectSaga(context.store, key, { saga })
        return () => ejectSaga(context.store, key)
    }, [])
}
