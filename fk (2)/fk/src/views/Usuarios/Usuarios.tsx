
import { Outlet } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

export default function Usuarios() {
    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-11">
                    <div className="card mt-3">
                        <div className="card-header bg-primary text-white fw-bold">
                            <div className="title-card">
                                <i className='fa fa-user'></i> Usuarios
                            </div>
                        </div>
                        <div className="card-body">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            
            
        </Fragment>
  )
}
