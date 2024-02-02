import React, {FC, ReactNode} from 'react'
import {CollapsibleItem, Collapsible} from "react-materialize"
import './DefaultModal.scss'

interface DefaultModalProps {
    header: string,
    child: ReactNode,
    onHide: (show: boolean) => void,
    show: boolean,
}

export const DefaultModal:
    FC<DefaultModalProps> = ({header, child, onHide, show}) => {

    return (
        <div className={`modal-panel shadow `}>
            {/*close btn*/}
            {show ? <div>

                    <button
                        className="modal-panel__close"
                        onClick={() => onHide(false)}
                    >
                        &#10006;
                    </button>

                    <Collapsible
                        className="modal-panel__collapsible"
                        accordion
                    >
                        <CollapsibleItem
                            expanded
                            header={header}
                            node="div"
                            className="modal-panel__collapsible-item"
                        >
                            {child}
                        </CollapsibleItem>
                    </Collapsible>
                </div>
                :
                null
            }
        </div>
    )
}
