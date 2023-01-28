import {Box, Modal} from "@material-ui/core";
import VerticalBox from "./VerticalBox";
import HorizontalBox from "./HorizontalBox";
import Spacer, {Expanded} from "./Spacer";
import CloseIcon from "@mui/icons-material/Close";
import Map from "./Map";
import React from "react";

const ModalMap = ({open, close, business}) => {
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    background: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: 8
}

export default ModalMap