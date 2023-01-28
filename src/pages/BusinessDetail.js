import Page from "../components/Page"
import { useParams } from "react-router-dom"
import React, {useEffect, useRef, useState} from "react"
import * as Business from "../apis/Business"
import VerticalBox from "../components/VerticalBox"
import {Rating} from "@mui/material"
import HorizontalBox from "../components/HorizontalBox"
import moment from "moment"
import {Container} from "reactstrap"
import {Col, Row} from "react-bootstrap"
import ModalDirection from "../components/ModalDirection"
import ImageSlider from "../components/BusinessDetail/ImageSlider"
import LocationAndHours from "../components/BusinessDetail/LocationAndHours"
import RecommendedReviews from "../components/BusinessDetail/RecommendedReviews"
import Hr from "../components/Hr"
import RightInfo from "../components/BusinessDetail/RightInfo";

const BusinessDetail = () => {

    const {id} = useParams()

    const [business, setBusiness] = useState(null)
    const [showModalDirection, setShowModalDirection] = useState(false)
    const [coordinate, setCoordinate] = useState(null)

    useEffect(() => {
        (async () => {
            const res = await Business.detail(id)
            if (res.success) {
                setBusiness(res.data)
            }
        })()
    }, [id])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCoordinate(position.coords)
        })
    }, [])

    const getOpen = () => {
        const today = business.hours.find(v => +v.day === moment().isoWeekday())
        if (!today) {
            return (
                <span className={'text-danger'}><b>Closed</b></span>
            )
        }

        if (+today.is_overnight) {
            return (
                <span className={'text-success'}><b>Open all day</b></span>
            )
        }

        const now = `${moment().format('H').padStart(2, "0")}${moment().format('mm').padStart(2, "0")}`
        if (today.start <= now && today.end >= now) {
            if (+today.is_overnight) {
                return <span className={'text-success'}><b>Open all day</b></span>
            }
            return <b style={{color: 'white'}}><span className={'text-success'}>Open</span> {dbTimeToHumanTime(today.start)} - {dbTimeToHumanTime(today.end)}</b>
        }

        const m = moment()
        m.set({hour: +today.start.substring(0, 2), minute: +today.start.substring(2)})
        return <span><b className={'text-danger'}>Closed</b> until {m.format('h:mm a')}</span>
    }

    return (
        <Page>
            <div style={{position: 'relative', height: 400}}>
                <ImageSlider photos={business?.photos ?? []}/>
                {
                    !business ? '' : <HorizontalBox style={{position: 'absolute', left: 24, bottom: 50}}>
                        <img src={business.image_url} width={100} height={100} style={{objectFit: 'cover', borderRadius: 120, marginRight: 12}}/>
                        <VerticalBox style={{flex: 1}}>
                            <h1 style={{color: 'white', marginBottom: 0}}>{business.name}</h1>
                            {
                                !business.rating ? '' : <Rating
                                    name="simple-controlled"
                                    readOnly={true}
                                    value={business.rating}
                                />
                            }
                            <HorizontalBox style={{marginTop: 6}}>
                                {
                                    +business.is_claimed ?
                                        <HorizontalBox>
                                            <b className={'text-success'}>Claimed</b>
                                        </HorizontalBox> :
                                        <HorizontalBox>
                                            <b className={'text-danger'}>Not claimed</b>
                                        </HorizontalBox>
                                }
                                <b style={{marginLeft: 6, color: 'white'}}>
                                    • {business.price} • {business.categories.map(v => v.title).join(', ').replace(/, ([^,]*)$/, ' and $1')}
                                </b>
                            </HorizontalBox>
                            {getOpen()}
                        </VerticalBox>
                    </HorizontalBox>
                }
            </div>
            <Container fluid className={'mt-4'}>
                <Row>
                    <Col sm={12} md={6} lg={8}>
                        {
                            business && <>
                                <LocationAndHours business={business} setShowModalDirection={setShowModalDirection}/>
                                <Hr style={{marginTop: 24, marginBottom: 24}}/>
                                <RecommendedReviews business={business}/>
                            </>
                        }
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                        {
                            business && <RightInfo business={business} setShowModalDirection={setShowModalDirection}/>
                        }
                    </Col>
                </Row>
            </Container>
            <ModalDirection
                open={showModalDirection}
                close={() => setShowModalDirection(false)}
                data={business}
                coordinate={coordinate}
            />
        </Page>
    )
}

export const dbTimeToHumanTime = time => moment().set({hour: time.substring(0, 2), minute: time.substring(2)}).format('hh:mm a').toUpperCase()

export default BusinessDetail