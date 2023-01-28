import {Box, Modal} from "@material-ui/core";
import VerticalBox from "./VerticalBox";
import HorizontalBox from "./HorizontalBox";
import Spacer, {Expanded} from "./Spacer";
import CloseIcon from "@mui/icons-material/Close";
import Map from "./Map";
import React from "react";
import {useResponsive} from "../utils/UseResponsive";

const ModalMap = ({open, close, business}) => {

    const res = useResponsive()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: res.isMobile ? 'calc(100% - 30px)' : 600,
        background: 'white',
        boxShadow: 24,
        p: 2,
        borderRadius: 8
    }

    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <VerticalBox>
                    <HorizontalBox className={'mb-2'}>
                        <h4>Locations</h4>
                        <Spacer/>
                        <CloseIcon
                            style={{cursor: 'pointer'}}
                            onClick={() => close()}
                        />
                    </HorizontalBox>
                    <Expanded>
                        <Map business={business}/>
                    </Expanded>
                    <HorizontalBox className={'mt-2'}>
                        <Spacer/>
                        <button className={'btn btn-success'} onClick={() => close()}>Close</button>
                    </HorizontalBox>
                </VerticalBox>
            </Box>
        </Modal>
    )
}

export default ModalMap