import  { Fragment, useEffect, useState, type JSX } from 'react'
//import '../styles/modal.css'

interface IProps{
    open:Boolean
    idModal: string
    size?: string //lg sm md
    title:string
    titleColor?:string
    iconTitle: string
    background?:string
    subTitle?: string
    ancho?:string

    children:JSX.Element | JSX.Element[]
}

export default function Modal( props:IProps) {

    const [ open , setOpen ] = useState<Boolean>(false)

    useEffect(()=>{

        const frm = ()=>{
            setOpen(props.open)
        }

        frm()

    }, [ props.open])

    
    return (
        <Fragment>
            <div    className="modal "
                    style={ open? { display: 'block', background:'rgb(3, 3, 3,0.3)'  } : { display: 'none' } }
                    id={props.idModal }
                    tabIndex={-1} 
                    aria-labelledby="exampleModalLabel" 
                    aria-hidden="true"
                    
                    
            >
                <div className={"modal-dialog " + (props.size ? 'modal-' + props.size : '') } style={ !!props.ancho ? { width: props.ancho } : {}}>
                    <div className="modal-content">
                        <div className={ !props.background? ("modal-header text-white bg-" + (!!props.titleColor? props.titleColor : "primary"))  : `modal-header text-white ${props.background}` }>
                            <div className="modal-title" >
                                <div className="d-flex justify-content-between">
                                    <div className="h5">
                                        <i className={ props.iconTitle } ></i> { props.title }
                                    </div>
                                    {/*<button type="button" className="btn btn-close"  aria-label="Close"></button>*/}
                                </div>
                                {
                                    !!props.subTitle ?
                                        <div className="row">
                                            <div className="col-12">
                                                { props.subTitle }
                                            </div>
                                        </div>  
                                    : 
                                        <></>
                                }
                                
                                
                            </div>
                        </div>
                        { props.children }
                    </div>
                </div>
            </div>
        </Fragment>
  )
}
