const User = ({ value }) => {
    return <div className="two-rows"><div className='main-title'>{value.name}</div><div className='sub-title'>{value.email}</div></div>
}
export default User