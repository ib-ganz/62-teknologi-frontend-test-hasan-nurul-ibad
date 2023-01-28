import React, {useEffect, useState} from "react"
import * as Business from "../apis/Business"
import {Card, CardBody, Container, Row} from "reactstrap"
import ModalDirection from "../components/ModalDirection"
import Page from "../components/Page"
import BusinessCard from "../components/Home/BusinessCard"
import AllFilter from "../components/Home/AllFilter"
import Filter from "../components/Home/Filter"
import SearchInput from "../components/Home/SearchInput"
import VerticalBox from "../components/VerticalBox"
import {Pagination} from "@mui/material";
import {Col} from "react-bootstrap";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Map from "../components/Map";
import {Fab} from "@material-ui/core";
import {useResponsive} from "../utils/UseResponsive";
import ModalMap from "../components/ModalMap";
import HorizontalBox from "../components/HorizontalBox";
import Spacer from "../components/Spacer";

// untuk demo saja
export const dummyLocations = [
    {
        label: 'New York',
        value: 'NY'
    },
    {
        label: 'Wyoming',
        value: 'WY'
    },
    {
        label: 'California',
        value: 'CA'
    },
]

const Home = () => {

    const responsive = useResponsive()

    const [business, setBusiness] = useState([])
    const [totalData, setTotalData] = useState(0)
    const [openFilter, setOpenFilter] = useState(false)
    const [filters, setFilters] = useState([])
    const [refreshFilter, setRefreshFilter] = useState(0)
    const [term, setTerm] = useState('')
    const [location, setLocation] = useState('NY')
    const [reloadData, setReloadData] = useState(false)
    const [openMapModal, setOpenMapModal] = useState(false)

    const [openDirection, setOpenDirection] = useState(false)
    const [openDirectionData, setOpenDirectionData] = useState(null)
    const [coordinate, setCoordinate] = useState(null)

    const [page, setPage] = useState(1)
    const rowPerPage = 10

    useEffect(() => {
        getBusiness()

        navigator.geolocation.getCurrentPosition(function(position) {
            setCoordinate(position.coords)
        })
    }, [])

    useEffect(() => {
        if (reloadData) {
            setReloadData(false)
            getBusiness()
        }
    }, [reloadData])

    useEffect(() => {
        getBusiness()
    }, [page])

    const getBusiness = async () => {
        // tidak bisa search menggunakan lokasi saat ini dikarenakan tidak ada data business di indonesia di api yelp

        let params = {
            sort_by: 'best_match',
            limit: rowPerPage,
            offset: (page - 1) * rowPerPage,
            location
        }

        if (term)
            params.term = term

        const prices = filters.filter(v => v.key === 'price')
        if (prices.length)
            params.price = prices.map(v => v.value).join(',')

        const transactions = filters.filter(v => v.key === 'transactions')
        if (transactions.length)
            params.transactions = transactions.map(v => v.value).join(',')

        const categories = filters.filter(v => v.key === 'categories')
        if (categories.length)
            params.categories = categories.map(v => v.value).join(',')

        filters
            .filter(v => v.key !== 'price')
            .filter(v => v.key !== 'categories')
            .filter(v => v.key !== 'transactions')
            .forEach(v => {
                params[v.key] = v.value
            })

        setBusiness([])
        const res = await Business.get(params)
        if (res.success) {
            setBusiness(res.data.businesses)
            setTotalData(res.data.total)
        }
    }

    const setFilterAndReload = (f, reload = true) => {
        setFilters(f)
        setReloadData(reload)
    }

    return (
        <Page hideNavbar={true} hideFooter={true}>
            <Container fluid>
                <div style={{height: '100vh', width: '100%'}}>
                    <VerticalBox className={'mt-2'} style={{height: '100%'}}>
                        <Card className="card-stats mb-2 mb-xl-0">
                            <CardBody>
                                <VerticalBox>
                                    <SearchInput
                                        location={location}
                                        setLocation={setLocation}
                                        term={term}
                                        setTerm={setTerm}
                                        search={() => getBusiness()}
                                    />
                                    <h1 className={'mt-2'}>Best Restaurants near me in {dummyLocations.find(v => v.value === location).label}, {location}</h1>
                                    <Filter
                                        filters={filters}
                                        setFilters={setFilterAndReload}
                                        openFilter={() => setOpenFilter(true)}
                                        refreshFilter={refreshFilter}
                                        setRefreshFilter={setRefreshFilter}
                                    />
                                </VerticalBox>
                            </CardBody>
                        </Card>
                        <Row style={{flex: 1, overflowY: 'hidden'}}>
                            <Col sm={12} md={8} style={{overflowY: 'auto', height: '100%', paddingRight: 0}}>
                                <VerticalBox>
                                    <h3 className={'mt-2'}>Featured Restaurants</h3>
                                    <Row style={{width: '100%'}}>
                                        {
                                            business.map((v, k) => (
                                                <BusinessCard
                                                    key={`business-${k}`}
                                                    data={v}
                                                    openDirection={(data) => {
                                                        setOpenDirectionData(data)
                                                        setOpenDirection(true)
                                                    }}
                                                />
                                            ))
                                        }
                                    </Row>
                                    <HorizontalBox className={'mb-5'}>
                                        <Spacer/>
                                        <Pagination
                                            count={!totalData ? 0 : Math.ceil(totalData / rowPerPage)}
                                            page={page}
                                            onChange={(e, pageNumber) => setPage(pageNumber)}
                                            showFirstButton={false}
                                            showLastButton={false}
                                        />
                                        <Spacer/>
                                    </HorizontalBox>
                                </VerticalBox>
                            </Col>
                            <Col sm={12} md={4}>
                                <Map business={business}/>
                            </Col>
                        </Row>
                    </VerticalBox>
                </div>
                {
                    responsive.isMobile && <Fab
                        color="primary"
                        aria-label="location"
                        style={{position: 'fixed', bottom: 16, right: 16}}
                        onClick={() => setOpenMapModal(true)}
                    >
                        <LocationOnIcon />
                    </Fab>
                }
            </Container>
            <AllFilter
                open={openFilter}
                close={() => setOpenFilter(false)}
                setFilter={(f, search = false) => {
                    setFilters(f)
                    setReloadData(search)
                }}
                mainFilter={filters}
                refreshFilter={refreshFilter}
            />
            <ModalDirection
                open={openDirection}
                close={() => setOpenDirection(false)}
                data={openDirectionData}
                coordinate={coordinate}
            />
            <ModalMap
                open={openMapModal}
                close={() => setOpenMapModal(false)}
                business={business}
            />
        </Page>
    )
}

export default Home