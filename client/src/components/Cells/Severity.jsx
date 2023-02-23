const Severity = ({ value, fonrmatHandler }) => {
    return <span className={`severity severity-${value}`}> {fonrmatHandler(value)}</span >
}
export default Severity