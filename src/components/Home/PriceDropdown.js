import {Dropdown} from "react-bootstrap";
import HorizontalBox from "../HorizontalBox";
import {Checkbox} from "@material-ui/core";
import {useEffect, useState} from "react";

const PriceDropdown = ({filters, setFilters, refreshFilter, setRefreshFilter}) => {

    const mapPrice = () => [
        !!filters.find(f => f.key === 'price' && f.value === 1),
        !!filters.find(f => f.key === 'price' && f.value === 2),
        !!filters.find(f => f.key === 'price' && f.value === 3),
        !!filters.find(f => f.key === 'price' && f.value === 4),
    ]

    const [show, setShow] = useState(false)
    const [prices, setPrices] = useState(mapPrice())

    useEffect(() => {
        setPrices(mapPrice())
    }, [filters])

    return (
        <Dropdown autoClose={false} show={show} className={'mr-2'}>
            <Dropdown.Toggle
                variant={prices.filter(v => !!v).length ? 'secondary' : "outline-secondary"}
                id="dropdown-basic"
                onClick={() => setShow(true)}
            >
                {prices.filter(v => !!v).length ? `${prices.map((v, k) => ({v: v, t: '$'.repeat(k + 1)})).filter(v => !!v.v).map(v => v.t).join(' • ')}` : 'Price'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    prices.map((v, k) => (
                        <Dropdown.Item key={`item-${k}`}>
                            <HorizontalBox style={{alignItems: 'center'}}>
                                <Checkbox
                                    style={{padding: 0}}
                                    onChange={(e) => {
                                        let p = [...prices]
                                        p[k] = !!e.target.checked
                                        setPrices(p)
                                    }}
                                    checked={!!prices[k]}
                                />
                                {'$'.repeat(k + 1)}
                            </HorizontalBox>
                        </Dropdown.Item>
                    ))
                }
                <Dropdown.Item>
                    <HorizontalBox>
                        <button
                            className={'btn btn-sm btn-secondary'}
                            onClick={() => {
                                setShow(false)
                                setPrices(mapPrice())
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className={'btn btn-sm btn-primary'}
                            onClick={() => {
                                let f = [
                                    ...prices
                                        .map((v, k) => ({key: 'price', value: k + 1, selected: !!v, show: '$'.repeat(k + 1)}))
                                        .filter(v => v.selected),
                                    ...filters.filter(v => v.key !== 'price')
                                ]
                                setFilters(f)
                                setRefreshFilter(refreshFilter + 1)
                                setShow(false)
                            }}
                        >
                            Save
                        </button>
                    </HorizontalBox>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default PriceDropdown