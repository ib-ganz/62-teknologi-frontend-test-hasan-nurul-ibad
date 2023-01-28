import {Box, Button, Modal, Typography} from "@material-ui/core";
import HorizontalBox from "./HorizontalBox";
import Spacer from "./Spacer";
import CloseIcon from '@mui/icons-material/Close';
import VerticalBox from "./VerticalBox";

const ModalCategory = ({open, close, categories, setCategories}) => {

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
                        <h4>More Categories</h4>
                        <Spacer/>
                        <CloseIcon
                            style={{cursor: 'pointer'}}
                            onClick={() => close()}
                        />
                    </HorizontalBox>
                    <div style={{
                        float: 'left'
                    }}>
                        {
                            categories.map((v, k) => (
                                <button
                                    key={`category-${k}`}
                                    className={`btn btn-sm ${v.selected ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                    style={{marginBottom: 8}}
                                    onClick={() => {
                                        let c = [...categories]
                                        c[k] = {...c[k], selected: !c[k].selected}
                                        setCategories(c)
                                    }}
                                >
                                    {v.title}
                                </button>
                            ))
                        }
                    </div>
                    <HorizontalBox className={'mt-2'}>
                        <Spacer/>
                        <button className={'btn btn-success'} onClick={() => close()}>Add</button>
                    </HorizontalBox>
                </VerticalBox>
            </Box>
        </Modal>
    )
}

export default ModalCategory