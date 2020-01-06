import React from 'react'
import loadable from '@utils/withLoadable'
import { Loading } from '@components/index'

export default loadable(async () => import(/* webpackChunkName: "login" */ './index'), {
    fallback: <Loading />
})
