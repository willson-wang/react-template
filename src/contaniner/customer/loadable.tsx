import React from 'react'
import loadable from '@utils/withLoadable';
import { Loading } from '@components'


export default loadable(() => import(/* webpackChunkName: "customer" */ './index'), {
    fallback: <Loading />
})