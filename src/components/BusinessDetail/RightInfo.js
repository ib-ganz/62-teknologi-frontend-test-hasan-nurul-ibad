import VerticalBox from "../VerticalBox";
import HorizontalBox from "../HorizontalBox";
import Spacer from "../Spacer";
import LaunchIcon from "@mui/icons-material/Launch";
import Hr from "../Hr";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import DirectionsIcon from "@mui/icons-material/Directions";
import React, {useEffect, useRef, useState} from "react";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const RightInfo = ({business, setShowModalDirection}) => {

    const [offset, setOffset] = useState(0)
    const [initialWidth, setInitialWidth] = useState(0)
    const [stickyStyle, setStickyStyle] = useState({})
    const rightRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset)
        const onResize = () => setInitialWidth(rightRef && rightRef.current ? rightRef.current.offsetWidth : 0)

        window.removeEventListener('scroll', onScroll)
        window.addEventListener('scroll', onScroll, { passive: true })
        window.removeEventListener('resize', onResize)
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    useEffect(() => {
        setInitialWidth(rightRef.current ? rightRef.current.offsetWidth : 0)
    }, [rightRef])

    useEffect(() => {
        setStickyStyle(offset < 400 ? {} : {
            position: 'fixed',
            top: 16 + 77,
            width: initialWidth,
            display: 'block',
        })
    }, [offset, initialWidth])

    return (
        <div ref={rightRef}>
            <VerticalBox style={{...stickyStyle}}>
                {business.transactions.length ? <VerticalBox
                    style={{
                        border: '1px solid #dddddd',
                        borderRadius: 4,
                        padding: 16,
                        marginBottom: 12
                    }}
                >
                    <h4 style={{marginBottom: 0}}>Transaction</h4>
                    <Hr style={{marginTop: 16, marginBottom: 16}}/>
                    {
                        business.transactions.map((v, k) => <VerticalBox key={`t-${k}`}>
                            <HorizontalBox>
                                <h4 style={{marginBottom: 0}}><a href={business.url} target={'_blank'}>{v.name}</a></h4>
                                <Spacer/>
                                <ReceiptLongIcon/>
                            </HorizontalBox>
                            {k === business.transactions.length - 1 ? '' : <Hr style={{marginTop: 16, marginBottom: 16}}/>}
                        </VerticalBox>)
                    }
                </VerticalBox> : ''}
                <VerticalBox
                    style={{
                        border: '1px solid #dddddd',
                        borderRadius: 4,
                        padding: 16,
                    }}
                >
                    <HorizontalBox>
                        <h4 style={{marginBottom: 0}}><a href={business.url} target={'_blank'}>{(new URL(business.url)).origin}</a></h4>
                        <Spacer/>
                        <LaunchIcon/>
                    </HorizontalBox>
                    <Hr style={{marginTop: 16, marginBottom: 16}}/>
                    <HorizontalBox>
                        <h4 style={{marginBottom: 0}}>{business.display_phone}</h4>
                        <Spacer/>
                        <PermPhoneMsgIcon/>
                    </HorizontalBox>
                    <Hr style={{marginTop: 16, marginBottom: 16}}/>
                    <HorizontalBox>
                        <h4 style={{marginBottom: 0}}>
                            <VerticalBox>
                                <a href={'#'} onClick={() => setShowModalDirection(true)}>Get Direction</a>
                                <b>{business.location.display_address[0] ?? ''}</b>
                                <b>{business.location.display_address[1] ?? ''}</b>
                                <span>{business.location.address_2}</span>
                                <span>{business.location.address_3}</span>
                            </VerticalBox>
                        </h4>
                        <Spacer/>
                        <DirectionsIcon/>
                    </HorizontalBox>
                </VerticalBox>
            </VerticalBox>
        </div>
    )
}

export default RightInfo