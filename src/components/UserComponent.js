import React from 'react'
import blank from "../assets/blankProfile.webp"
import styles from "../stylesheets/UserComponent.module.css"
function UserComponent(props) {
    const data = props.data
    return (
        <div className={styles.container}>
            <img className={styles.profileImage} src={data.profilePicture !== "" ? data.profilePicture : blank} alt="" />
            <div className={styles.content}>
                <div className={styles.nameLine}>
                    <h3>{data.username}</h3>
                </div>
            </div>
            <button>Add Contact</button>
        </div>
    )
}

export default UserComponent
