import TuneIcon from '@mui/icons-material/Tune';
import PriceDropdown from "./PriceDropdown";

const Filter = ({openFilter, filters, setFilters, refreshFilter, setRefreshFilter}) => {

    return (
        <div className={'flex'}>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => openFilter()}
            >
                <span><TuneIcon style={{width: 12, height: 12}}/> All</span>
                {filters.length ? <span className="badge badge-primary">{filters.length}</span> : ''}
            </button>
            <PriceDropdown
                filters={filters}
                setFilters={setFilters}
                refreshFilter={refreshFilter}
                setRefreshFilter={setRefreshFilter}
            />
            <button
                type="button"
                className={`btn ${filters.find(v => v.value === true && v.key === 'open_now') ? 'btn-secondary' : 'btn-outline-secondary'}`}
                onClick={() => {
                    let i = filters.findIndex(v => v.value === true && v.key === 'open_now')
                    if (i === -1) {
                        setFilters([...filters, {key: 'open_now', value: true, show: 'Open Now'}])
                    }
                    else {
                        setFilters([...filters.filter(v => v.key !== 'open_now')])
                    }
                    setRefreshFilter(refreshFilter + 1)
                }}
            >
                Open Now
            </button>
            <button
                type="button"
                className={`btn ${filters.find(v => v.value === 'Delivery') ? 'btn-secondary' : 'btn-outline-secondary'}`}
                onClick={() => {
                    let i = filters.findIndex(v => v.value === 'Delivery')
                    if (i === -1) {
                        setFilters([...filters, {key: 'transactions', value: 'Delivery', show: 'Offers Delivery'}])
                    }
                    else {
                        setFilters([...filters.filter(v => v.value !== 'Delivery')])
                    }
                    setRefreshFilter(refreshFilter + 1)
                }}
            >
                Offers Delivery
            </button>
            <button
                type="button"
                className={`btn ${filters.find(v => v.value === 'Takeout') ? 'btn-secondary' : 'btn-outline-secondary'}`}
                onClick={() => {
                    let i = filters.findIndex(v => v.value === 'Takeout')
                    if (i === -1) {
                        setFilters([...filters, {key: 'transactions', value: 'Takeout', show: 'Offers Takeout'}])
                    }
                    else {
                        setFilters([...filters.filter(v => v.value !== 'Takeout')])
                    }
                    setRefreshFilter(refreshFilter + 1)
                }}
            >
                Offers Takeout
            </button>
            <button
                type="button"
                className={`btn ${filters.find(v => v.value === 'Reservation') ? 'btn-secondary' : 'btn-outline-secondary'}`}
                onClick={() => {
                    let i = filters.findIndex(v => v.value === 'Reservation')
                    if (i === -1) {
                        setFilters([...filters, {key: 'transactions', value: 'Reservation', show: 'Reservation'}])
                    }
                    else {
                        setFilters([...filters.filter(v => v.value !== 'Reservation')])
                    }
                    setRefreshFilter(refreshFilter + 1)
                }}
            >
                Reservations
            </button>
        </div>
    )
}

export default Filter