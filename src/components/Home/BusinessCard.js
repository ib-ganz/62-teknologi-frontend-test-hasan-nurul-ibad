import {Col} from "reactstrap"
import VerticalBox from "../VerticalBox"
import {Rating} from "@mui/material"
import moment from "moment"
import HorizontalBox from "../HorizontalBox"
import Spacer from "../Spacer"
import { useHistory } from "react-router-dom"
import React from "react";
import {dbTimeToHumanTime} from "../../pages/BusinessDetail";

const BusinessCard = ({data, openDirection}) => {

    const history = useHistory()

    const getOpen = () => {
        const today = data.hours.find(v => +v.day === moment().isoWeekday())
        if (!today) {
            return (
                <span className={'text-danger'}><b>Closed</b></span>
            )
        }

        if (+today.is_overnight) {
            console.log(today)
            return (
                <span className={'text-success'}><b>Open all day</b></span>
            )
        }

        const now = `${moment().format('H').padStart(2, "0")}${moment().format('mm').padStart(2, "0")}`
        if (today.start <= now && today.end >= now) {
            return (
                <span><b className={'text-success'}>Open</b> until {dbTimeToHumanTime(today.end)}</span>
            )
        }

        const m = moment()
        m.set({hour: +today.start.substring(0, 2), minute: +today.start.substring(2)})
        return <span><b className={'text-danger'}>Closed</b> until {m.format('h:mm a')}</span>
    }

    return (
        <Col lg={4} md={6} sm={6} xs={6}>
            <VerticalBox style={{width: '100%', marginBottom: 30}}>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '100%'
                    }}
                >
                    <img
                        src={data.image_url}
                        alt={''}
                        style={imgStyles}
                        onClick={() => history.push(`/business/${data.id}`)}
                    />
                </div>
                <h3 className={'mt-2 mb-0'} style={{height: 50, cursor: 'pointer'}} onClick={() => history.push(`/business/${data.id}`)}>
                    {data.name}
                </h3>
                {
                    !data.rating ? <b className={'ml-2'}>No reviews</b> : <HorizontalBox style={{alignItems: 'center'}}>
                            <Rating
                            name="simple-controlled"
                            readOnly={true}
                            value={data.rating}
                        />
                        <b className={'ml-2'}>{data.review_count}</b>
                    </HorizontalBox>
                }
                <small className={'mb-2'} style={{height: 40}}>
                    { data.categories.map(v => v.title).join(', ').replace(/, ([^,]*)$/, ' and $1') }
                </small>
                <button className={'btn btn-block btn-outline-success'} onClick={() => openDirection(data)}>
                    Get Directions
                </button>
                <HorizontalBox style={{marginTop: 8}}>
                    <Spacer/>
                    {getOpen()}
                    <Spacer/>
                </HorizontalBox>
            </VerticalBox>
        </Col>
    )
}

const imgStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 8,
    cursor: 'pointer'
}

export default BusinessCard