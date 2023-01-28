import React, {useEffect, useState} from 'react'
import {GoogleMap, InfoWindow, Marker, useJsApiLoader} from '@react-google-maps/api'
import VerticalBox from "./VerticalBox";
import HorizontalBox from "./HorizontalBox";
import {Rating} from "@mui/material";

const containerStyle = {
    width: '100%',
    marginTop: 8,
    height: 'calc(100vh - (180px + 8px))',
    flex: 1
}

const center = {
    lat: -7.7827826804632965,
    lng: 110.36731979256231
}

function Map({business}) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAWJ34tkhXBp3gRL1jgAszhvxDFxfvgNrM"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(() => {
        if (map && business) {
            const markers = business.map(v => ({lat: +v.coordinates.latitude, lng: +v.coordinates.longitude}))
            const bounds = new window.google.maps.LatLngBounds(markers[0])
            markers.forEach((v, k) => {
                if (k > 0) {
                    bounds.extend(v)
                }
            })
            map.fitBounds(bounds)
        }
    }, [business, map])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {business.map((v, k) => (
                <MyMarker business={v} key={`marker-${k}`}/>
            ))}
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)

const MyMarker = ({business}) => {

    const [showInfoWindow, setShowInfoWindow] = useState(false)

    return (
        <Marker
            position={{ lat: +business.coordinates.latitude, lng: +business.coordinates.longitude }}
            onMouseOver={() => setShowInfoWindow(true)}
            onMouseOut={() => setShowInfoWindow(false)}
        >
            {showInfoWindow && (
                <InfoWindow>
                    <VerticalBox style={{width: 150}}>
                        <img
                            src={business.image_url}
                            alt={''}
                            style={{borderRadius: 8, maxWidth: 150}}
                        />
                        <h5 style={{marginBottom: 0, marginTop: 8}}>{business.name}</h5>
                        {
                            !business.rating ? <b className={'ml-2'}>No reviews</b> : <HorizontalBox style={{alignItems: 'center'}}>
                                <Rating
                                    name="simple-controlled"
                                    readOnly={true}
                                    value={business.rating}
                                    size={'small'}
                                />
                                <b className={'ml-2'}>{business.review_count}</b>
                            </HorizontalBox>
                        }
                        <small className={'mt-2'} style={{height: 40}}>
                            { business.categories.map(v => v.title).join(', ').replace(/, ([^,]*)$/, ' and $1') }
                        </small>
                    </VerticalBox>
                </InfoWindow>
            )}
        </Marker>
    )
}