export default function Spacer() {
    return (
        <div style={{flex: 1}}/>
    )
}

export function Expanded(props) {
    return (
        <div style={{flex: 1}}>
            {props.children}
        </div>
    )
}