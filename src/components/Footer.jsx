import { Typography } from 'antd'
import React from 'react'

const Footer = () => {
    return (
        <div className='footer'>
            <Typography.Link href='tel:+1234567890'>+1234567890</Typography.Link>
            <Typography.Link href='#'>Privacy Policy</Typography.Link>
            <Typography.Link href='#'>Terms of Use</Typography.Link>
        </div>
    )
}

export default Footer