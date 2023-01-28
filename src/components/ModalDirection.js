import {Box, Modal} from "@material-ui/core";
import VerticalBox from "./VerticalBox";
import HorizontalBox from "./HorizontalBox";
import Spacer, {Expanded} from "./Spacer";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useState} from "react";

const ModalDirection = ({open, close, data, coordinate}) => {

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

    const [url, setUrl] = useState('')

    useEffect(() => {
        let u = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAWJ34tkhXBp3gRL1jgAszhvxDFxfvgNrM&origin=${coordinate?.latitude},${coordinate?.longitude}&destination=${data?.coordinates.latitude},${data?.coordinates.longitude}`
        const d = distance(coordinate?.latitude, coordinate?.longitude, data?.coordinates.latitude, data?.coordinates.longitude, 'K')
        if (d > 500) {
            u += '&mode=flying'
        }
        setUrl(u)
    }, [coordinate, data])

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
                        <h4>Direction to {data?.name}</h4>
                        <Spacer/>
                        <CloseIcon
                            style={{cursor: 'pointer'}}
                            onClick={() => close()}
                        />
                    </HorizontalBox>
                    <Expanded>
                        <div className="google-map-code">
                            <iframe
                                src={url}
                                width="536" height="450" allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"/>
                        </div>
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

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        let radlat1 = Math.PI * lat1/180;
        let radlat2 = Math.PI * lat2/180;
        let theta = lon1-lon2;
        let radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        return dist;
    }
}

export default ModalDirection