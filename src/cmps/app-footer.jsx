
import React, { useState } from 'react'
import { connect } from 'react-redux'

import { removeFromMalfunctiont, checkout } from '../store/malfunction.actions'
import { UserMsg } from './user-msg.jsx'

function _AppFooter({ count, malfunctiont, removeFromMalfunctiont, checkout }) {
    const [isMalfunctiontShown, setIsMalfunctiontShown] = useState(false)


    function getMalfunctiontTotal() {
        return malfunctiont.reduce((acc, malfunction) => acc + malfunction.price, 0)
    }

    return (
        <footer className="app-footer">
            <p>
                coffeerights - count: {count}
            </p>
            {malfunctiont.length > 0 &&
                <h5>
                    <span>{malfunctiont.length}</span> Products in your Malfunctiont
                    <button className="btn-link" onClick={(ev) => {
                        ev.preventDefault();
                        setIsMalfunctiontShown(!isMalfunctiontShown)
                    }}>
                        ({(isMalfunctiontShown) ? 'hide' : 'show'})
                    </button>
                </h5>
            }

            {isMalfunctiontShown && malfunctiont.length > 0 && <section className="malfunctiont" >
                <h5>Your Malfunctiont</h5>
                <ul>
                    {
                        malfunctiont.map((malfunction, idx) => <li key={idx}>
                            <button onClick={() => {
                                removeFromMalfunctiont(malfunction._id)
                            }}>x</button>
                            {/* {malfunction.vendor} */}
                        </li>)
                    }
                </ul>
                <p>Total: ${getMalfunctiontTotal().toLocaleString()} </p>
                <button onClick={checkout}>Checkout</button>
            </section>}
            <UserMsg />
        </footer>
    )
}


function mapStateToProps(state) {
    return {
        count: state.userModule.count,
        malfunctiont: state.malfunctionModule.malfunctiont
    }
}

const mapDispatchToProps = {
    checkout,
    removeFromMalfunctiont
}

export const AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)