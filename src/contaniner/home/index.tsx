import React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { Button } from 'antd'
import styles from './index.module.css'
import * as Actions from '@/actions'
import { RootStore } from '@/constants'

interface OwnState {
    num: number
}

const mapStateToProps = (state: RootStore): OwnState => {
    console.log('state', state)
    return {
        num: state.app.num
    }
}

// const mapDispathToProps = (dispath) => {
//     return {
//         increase: num => dispath(increase(num)),
//         decrease: num => dispath(decrease(num))
//     }
// }
const mapDispathToProps = (dispath: Dispatch): Actions.AppActionsMethodTypes => {
    return {
        ...bindActionCreators(Actions, dispath)
    }
}

const connector = connect(mapStateToProps, mapDispathToProps)

type IProps = ConnectedProps<typeof connector>

function Home(props: IProps): JSX.Element {
    return (
        <div className={styles.wrap}>
            Home 000
            <Button>antd</Button>
            <div>{props.num}</div>
            <div onClick={() => props.increase(props.num + 1)}>+</div>
            <div onClick={() => props.increase(props.num - 1)}>-</div>
        </div>
    )
}

export default connector(Home)
