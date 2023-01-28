import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {useState} from "react"
import HorizontalBox from "../HorizontalBox";

// sebenarnya ada banyak library carousel yang tinggal pakai, seperti bootstrap dan material ui,
// tapi di sini saya bikin sendiri menggunakan scroll (biar sama dengan yang di website Yelp)

const ImageSlider = ({photos}) => {

    const [slideLeft, setSlideLeft] = useState(0)

    const moveRight = () => {
        const el = document.getElementById(`hscroll`)
        const n = el.scrollLeft + 250 > document.getElementById(`c`).clientWidth ? document.getElementById(`c`).clientWidth : el.scrollLeft + 250
        setSlideLeft(n)
        el.scrollTo({
            top: 0,
            left: n,
            behavior: 'smooth'
        })
    }

    const moveLeft = () => {
        const el = document.getElementById(`hscroll`)
        const n = el.scrollLeft - 250 < 0 ? 0 : el.scrollLeft - 250
        setSlideLeft(n)
        el.scrollTo({
            top: 0,
            left: n,
            behavior: 'smooth'
        })
    }

    return (
        <div className={''} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
            <div style={{overflowX: 'auto', position: 'relative', height: 400}} id={`hscroll`}>
                <HorizontalBox>
                    {
                        photos.map((v, k) => (
                            <img key={`img-${k}`} src={v} alt={''} style={{height: 400, width: 500, objectFit: 'cover'}}/>
                        ))
                    }
                </HorizontalBox>
                <div id={'c'} style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9))', position: 'absolute', left: 0, bottom: 0, height: 200, width: photos?.length ? photos.length * 500 : window.screen.width}}/>
            </div>
            <div style={btnWrapperStyle('l', slideLeft === 0)} onClick={moveLeft}>
                <ArrowBackIosIcon/>
            </div>
            <div style={btnWrapperStyle('r', slideLeft === (document.getElementById(`c`)?.clientWidth ?? 0))} onClick={moveRight}>
                <ArrowForwardIosIcon/>
            </div>
        </div>
    )
}

const btnWrapperStyle = (lr, disabled = false) => ({
    width: 40,
    height: 40,
    background: 'white',
    opacity: disabled ? .4 : .7,
    borderRadius: 100,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: lr === 'l' ? 30 : undefined,
    right: lr === 'r' ? 30 : undefined,
    cursor: disabled ? undefined : 'pointer',
    paddingTop: 7,
    paddingLeft: lr === 'l' ? 12 : 8,
})

export default ImageSlider