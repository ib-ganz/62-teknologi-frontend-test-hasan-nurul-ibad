import VerticalBox from "../VerticalBox";
import React, {useEffect, useState} from "react";
import HorizontalBox from "../HorizontalBox";
import {Pagination, Rating} from "@mui/material";
import {Dropdown} from "react-bootstrap";
import Spacer from "../Spacer";
import * as Business from "../../apis/Business";
import moment from "moment";

const RecommendedReviews = ({business}) => {

    const [reviews, setReviews] = useState([])
    const [sortBy, setSortBy] = useState('yelp_sort')
    const [page, setPage] = useState(1)

    const rowPerPage = 3 // saya set 3 karena return nya selalu 3

    useEffect(() => {
        (async () => {
            if (business) {
                setReviews([])
                const rev = await Business.getReviews(business.alias, sortBy, (page - 1) * rowPerPage)
                if (rev.status === 200) {
                    setReviews(rev.data.reviews)
                }
            }
        })()
    }, [business, sortBy, page])

    return (
        <VerticalBox>
            <h1>Recommended Reviews</h1>
            <HorizontalBox className={'mb-3'}>
                <VerticalBox>
                    <b>Overall rating</b>
                    <Rating
                        name="simple-controlled"
                        readOnly={true}
                        value={business.rating}
                    />
                    <span className={'text-muted'}>{business.review_count} Reviews</span>
                </VerticalBox>
                <Spacer/>
                <SortDropdown
                    onChange={e => {
                        setSortBy(e === 'Yelp Sort' ? 'yelp_sort' : 'newest')
                    }}
                />
            </HorizontalBox>
            {
                reviews.map((v, k) => (
                    <VerticalBox key={`reviews-${k}`} className={'mb-3'}>
                        <HorizontalBox style={{alignItems: 'center'}}>
                            <img alt={''} src={v.user.image_url} style={{width: 40, height: 40, objectFit: 'cover', borderRadius: 40, marginRight: 8}}/>
                            <a href={v.user.profile_url} target={'_blank'}>{v.user.name}</a>
                        </HorizontalBox>
                        <HorizontalBox className={'mt-2'}>
                            <Rating
                                name="simple-controlled"
                                size={'small'}
                                readOnly={true}
                                value={v.rating}
                            />
                            <span className={'text-muted ml-2'}>{moment(v.time_created).format('DD-MM-YY HH:MM')}</span>
                        </HorizontalBox>
                        <p>{v.text}</p>
                    </VerticalBox>
                ))
            }
            <HorizontalBox>
                <Spacer/>
                <Pagination
                    count={Math.ceil(business.review_count / rowPerPage)}
                    page={page}
                    onChange={(e, pageNumber) => setPage(pageNumber)}
                    showFirstButton={false}
                    showLastButton={false}
                />
                <Spacer/>
            </HorizontalBox>
        </VerticalBox>
    )
}

const SortDropdown = ({onChange}) => {

    const [sort, setSort] = useState('Yelp sort')

    return (
        <Dropdown
            autoClose={true}
            onSelect={(e) => {
                setSort(e)
                onChange(e)
            }}
        >
            <Dropdown.Toggle
                variant={'secondary'}
                id="dropdown-basic"
            >
                {sort}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey={'Yelp Sort'}>
                    Yelp Sort
                </Dropdown.Item>
                <Dropdown.Item eventKey={'Newest First'}>
                    Newest First
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default RecommendedReviews