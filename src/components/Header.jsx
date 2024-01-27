import { Badge, Drawer, Image, List, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { BellFilled, MailOutlined } from '@ant-design/icons'
import { getComments, getOrders } from '../api/API'

const Header = () => {
    const [comments, setComments] = useState([])
    const [orders, setOrders] = useState([])
    const [commentOpen, setCommentOpen] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false)

    useEffect(() => {
        getComments().then((res) => {
            setComments(res.comments)
        })

        getOrders().then((res) => [
            setOrders(res.products)
        ])

    }, [])

    return (
        <div className='header'>
            <Image
                width={40}
                src='https://cdn-icons-png.flaticon.com/512/25/25231.png'
            ></Image>

            <Typography.Title style={{ marginBottom: 0 }}>React Dashboard</Typography.Title>

            <Space>
                <Badge count={comments.length} dot>
                    <MailOutlined style={{ fontSize: 24 }} onClick={() => { setCommentOpen(true) }} />
                </Badge>
                <Badge count={orders.length} >
                    <BellFilled style={{ fontSize: 24 }} onClick={() => { setNotificationOpen(true) }} />
                </Badge>
            </Space>

            {/* Comments */}
            <Drawer title="Comments" open={commentOpen} onClose={() => setCommentOpen(false)} maskClosable>
                <List dataSource={comments} renderItem={(item) => {
                    return <List.Item>{item.body}</List.Item>
                }}></List>
            </Drawer>

            {/* Notification */}
            <Drawer title="Notifications" open={notificationOpen} onClose={() => setNotificationOpen(false)} maskClosable>
                <List dataSource={orders} renderItem={(item) => {
                    return <List.Item> <b>{item.title}</b> has been ordered!</List.Item>
                }}></List>
            </Drawer>
        </div>
    )
}

export default Header