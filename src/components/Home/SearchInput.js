import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SearchIcon from '@mui/icons-material/Search'
import {useState} from "react";
import {Popover} from "@material-ui/core";
import VerticalBox from "../VerticalBox";
import {dummyLocations} from "../../pages/Home";
import HorizontalBox from "../HorizontalBox";
import Spacer from "../Spacer";

const SearchInput = ({location, setLocation, term, setTerm, search}) => {

    const [anchorEl, setAnchorEl] = useState(null)

    return (
        <VerticalBox>
            <HorizontalBox>
            <Paper
                elevation={2}
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <b style={{fontSize: 14}}>{location}</b>
                    <LocationOnIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search anything..."
                    inputProps={{ 'aria-label': 'search anything...' }}
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onKeyDown={e => {
                        if (e.keyCode === 13) {
                            search()
                            e.preventDefault()
                        }
                    }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={search}>
                    <SearchIcon />
                </IconButton>
            </Paper>
                <Spacer/>
            <img
                style={{marginLeft: 16}}
                height={35.99}
                alt=""
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/1200px-Yelp_Logo.svg.png'}
            />
            </HorizontalBox>
            <Popover
                id={!!anchorEl ? 'simple-popover' : undefined}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <VerticalBox style={{paddingTop: 8, paddingBottom: 8}}>
                    {
                        dummyLocations.map((v, k) => (
                            <div
                                key={`loc-${k}`}
                                style={{padding: 8, cursor: 'pointer'}}
                                onClick={() => {
                                    setAnchorEl(null)
                                    setLocation(v.value)
                                }}
                            >
                                {v.label}, {v.value}
                            </div>
                        ))
                    }
                </VerticalBox>
            </Popover>
        </VerticalBox>
    )
}

export default SearchInput