import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SideMenu = () => {
    const location = useLocation()
    const [selectedkeys, setSelectedkeys] = useState('/')


    useEffect(() => {
        const pathname = location.pathname
        setSelectedkeys(pathname)
    }, [location.pathname])

    const navigate = useNavigate()
    return (
        <div className='sideMenu'>
            <Menu style={{ height: '100%' }}
                mode='vertical'
                onClick={(item) => {
                    navigate(item.key)
                }}
                selectedKeys={[selectedkeys]}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreOutlined />,
                        key: "/"
                    },
                    {
                        label: "Inventory",
                        icon: <ShopOutlined />,
                        key: "/inventory"
                    },
                    {
                        label: "Orders",
                        icon: <ShoppingCartOutlined />,
                        key: "/orders"
                    },
                    {
                        label: "Customers",
                        icon: <UserOutlined />,
                        key: "/customers"
                    },
                ]} />
        </div>
    )
}

export default SideMenu