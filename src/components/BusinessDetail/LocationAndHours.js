import {Col, Row} from "react-bootstrap";
import React from "react";
import moment from "moment";
import VerticalBox from "../VerticalBox";
import HorizontalBox from "../HorizontalBox";
import {dbTimeToHumanTime} from "../../pages/BusinessDetail";

const LocationAndHours = ({business, setShowModalDirection}) => {

    const dbDayToHumanDay = day => {
        const days = ['Mon', "Tue", 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        return days[+day - 1]
    }

    const isOpen = (hour) => {
        if (+hour.day !== moment().isoWeekday())
            return false

        const now = `${moment().format('H').padStart(2, "0")}${moment().format('mm').padStart(2, "0")}`
        return hour.start <= now && hour.end >= now;
    }

    return (
        <VerticalBox>
            <h1>Location & Hours</h1>
            <Row>
                <Col md={12} lg={6} className={'mb-4'}>
                    <VerticalBox>
                        <HorizontalBox>
                            <iframe
                                height="200"
                                style={{border: 0, flex: 1}}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAWJ34tkhXBp3gRL1jgAszhvxDFxfvgNrM&q=${business?.coordinates.latitude},${business?.coordinates.longitude}`}>
                            </iframe>
                        </HorizontalBox>
                        <HorizontalBox style={{marginTop: 12}}>
                            <VerticalBox style={{flex: 1}}>
                                <span>Located in:</span>
                                {
                                    !business ? '' : <>
                                        <b className={'text-success'}>
                                            {business.location.display_address[0] ?? ''}
                                        </b>
                                        <b>
                                            {business.location.display_address[1] ?? ''}
                                        </b>
                                        <span>{business.location.address_2}</span>
                                        <span>{business.location.address_3}</span>
                                    </>
                                }
                            </VerticalBox>
                            <VerticalBox style={{flex: 1}}>
                                <button className={'btn btn-outline-success btn-sm'} onClick={() => setShowModalDirection(true)}>Get Direction</button>
                            </VerticalBox>
                        </HorizontalBox>
                    </VerticalBox>
                </Col>
                <Col md={12} lg={6}>
                    <VerticalBox>
                        {
                            business?.hours.map((v, k) => (
                                <HorizontalBox style={{marginBottom: 6}} key={`hour-${k}`}>
                                    <span style={{width: 50}}>{dbDayToHumanDay(v.day)}</span>
                                    {dbTimeToHumanTime(v.start)} - {dbTimeToHumanTime(v.end)}
                                    {isOpen(v) ? <b className={'text-success ml-2'}>Open now</b> : ''}
                                </HorizontalBox>
                            ))
                        }
                    </VerticalBox>
                </Col>
            </Row>
        </VerticalBox>
    )
}

export default LocationAndHours