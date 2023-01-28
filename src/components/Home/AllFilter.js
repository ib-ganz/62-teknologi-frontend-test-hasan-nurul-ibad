import {Box, Checkbox, ClickAwayListener, Drawer} from "@material-ui/core";
import {useEffect, useState} from "react";
import moment from "moment";
import VerticalBox from "../VerticalBox";
import HorizontalBox from "../HorizontalBox";
import Spacer from "../Spacer";
import ModalCategory from "../ModalCategory";
import * as Category from "../../apis/Category";
import Hr from "../Hr";
import {useTime} from "../../utils/UseTime";

const AllFilter = ({open, close, setFilter, refreshFilter, mainFilter}) => {

    const time = useTime()

    const [openAllCategory, setOpenAllCategory] = useState(false)
    const [filters, setFilters] = useState([])
    const [categories, setCategories] = useState([])
    const [price, setPrice] = useState([false, false, false, false])
    const [openNow, setOpenNow] = useState(false)
    const [offersDelivery, setOffersDelivery] = useState(false)
    const [offersTakeout, setOffersTakeout] = useState(false)
    const [reservations, setReservations] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await Category.get()
            if (res.success) {
                setCategories(res.data)
            }
        })()
    }, [])

    useEffect(() => {
        reloadFilter()
    }, [JSON.stringify(price), JSON.stringify(categories), openNow, offersDelivery, offersTakeout, reservations])

    useEffect(() => {
        reloadMainFilter()
    }, [refreshFilter])

    const reloadMainFilter = () => {
        setPrice([
            !!mainFilter.find(f => f.key === 'price' && f.value === 1 && f.selected),
            !!mainFilter.find(f => f.key === 'price' && f.value === 2 && f.selected),
            !!mainFilter.find(f => f.key === 'price' && f.value === 3 && f.selected),
            !!mainFilter.find(f => f.key === 'price' && f.value === 4 && f.selected),
        ])
        setCategories([
            ...categories.map(v => ({...v, selected: !!mainFilter.find(f => f.key === 'categories' && f.value === v.title)}))
        ])
        setOpenNow(!!mainFilter.find(v => v.key === 'open_now' && v.value === true))
        setOffersDelivery(!!mainFilter.find(v => v.key === 'transactions' && v.value === 'Delivery'))
        setOffersTakeout(!!mainFilter.find(v => v.key === 'transactions' && v.value === 'Takeout'))
        setReservations(!!mainFilter.find(v => v.key === 'transactions' && v.value === 'Reservation'))
    }

    const reloadFilter = () => {
        let f = []
        f = f.concat(price.map((v, k) => ({key: 'price', value: k + 1, selected: !!v, show: '$'.repeat(k + 1)})).filter(v => v.selected))
        f = f.concat(categories.filter(v => !!v.selected).map(v => ({key: 'categories', value: v.title, show: v.title})))
        if (openNow)
            f.push({key: 'open_now', value: true, show: 'Open Now'})
        if (offersDelivery)
            f.push({key: 'transactions', value: 'Delivery', show: 'Offers Delivery'})
        if (offersTakeout)
            f.push({key: 'transactions', value: 'Takeout', show: 'Offers Takeout'})
        if (reservations)
            f.push({key: 'transactions', value: 'Reservation', show: 'Reservation'})

        setFilters(f)
    }

    const clearFilter = () => {
        setPrice([false, false, false, false])
        setCategories(categories.map(v => ({...v, selected: false})))
        setOpenNow(false)
        setOffersDelivery(false)
        setOffersTakeout(false)
        setReservations(false)
    }

    const CheckBoxFilter = ({checked, onChange, label}) => (
        <HorizontalBox style={{alignItems: 'center'}}>
            <Checkbox
                style={{padding: 0}}
                onChange={(e) => onChange(e.target.checked)}
                checked={checked}
            />
            {label}
        </HorizontalBox>
    )

    return (
        <>
            <Drawer
                anchor={'left'}
                open={open}
                onClose={() => {
                    reloadMainFilter()
                    close()
                }}
            >
                <VerticalBox style={{padding: 24, width: 300, height: '100%'}}>
                    <h4 style={{marginBottom: 0}}>
                        {filters.length === 1 ? '1 Filter' : filters.length > 1 ? `${filters.length} Filters` : 'Filters'}
                    </h4>
                    {filters.length ? <small>{filters.map(v => v.show).join(' • ')}</small> : ''}
                    {filters.length ? <small className={'mb-2'} style={{cursor: 'pointer', color: '#1173F0'}} onClick={() => clearFilter()}>Clear all</small> : ''}
                    <HorizontalBox>
                        {
                            price.map((v, k) => (
                                <button
                                    key={k}
                                    className={`btn btn-sm ${v ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                    onClick={() => {
                                        let p = [...price]
                                        p[k] = !p[k]
                                        setPrice(p)
                                    }}
                                >
                                    {'$'.repeat(k + 1)}
                                </button>
                            ))
                        }
                    </HorizontalBox>
                    <Hr style={{marginTop: 16, marginBottom: 16}}/>
                    <h4>Suggested</h4>
                    <CheckBoxFilter
                        checked={openNow}
                        onChange={setOpenNow}
                        label={`Open now ${moment(time).format('hh:mm:ss A')}`}
                    />
                    <CheckBoxFilter
                        checked={offersDelivery}
                        onChange={setOffersDelivery}
                        label={'Offers Delivery'}
                    />
                    <CheckBoxFilter
                        checked={offersTakeout}
                        onChange={setOffersTakeout}
                        label={'Offers Takeout'}
                    />
                    <CheckBoxFilter
                        checked={reservations}
                        onChange={setReservations}
                        label={'Reservations'}
                    />
                    <Hr style={{marginTop: 16, marginBottom: 16}}/>
                    <h4>Category</h4>
                    <div style={{float: 'left'}}>
                        {
                            categories.slice(0, 4).map((v, k) => (
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
                    <Box
                        fontWeight={'bold'}
                        color={'#1173F0'}
                        fontSize={14}
                        style={{cursor: 'pointer'}}
                        onClick={() => setOpenAllCategory(true)}
                    >
                        See all
                    </Box>
                    <Spacer/>
                    <HorizontalBox style={{flexDirection: 'row-reverse'}}>
                        <button
                            className={'btn btn-primary'}
                            onClick={() => {
                                setFilter(filters, true)
                                close()
                            }}
                        >
                            Apply
                        </button>
                        <div style={{width: 10}}/>
                        <button
                            className={'btn btn-secondary'}
                            onClick={() => {
                                reloadMainFilter()
                                close()
                            }}
                        >
                            Cancel
                        </button>
                    </HorizontalBox>
                </VerticalBox>
            </Drawer>
            <ModalCategory
                open={openAllCategory}
                close={() => setOpenAllCategory(false)}
                categories={categories}
                setCategories={setCategories}
            />
        </>
    )
}

export default AllFilter