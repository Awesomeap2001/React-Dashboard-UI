import { Avatar, Rate, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getInventory, getOrders } from '../../api/API';

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getOrders().then(res => {
            setDataSource(res.products)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <Space size={20} direction='vertical' style={{ display: "grid" }}>
                <Typography.Title style={{ fontSize: 40, marginBottom: "-10px" }}>Orders</Typography.Title>
                <Table className='shadow'
                    loading={loading}
                    columns={[

                        {
                            title: "Title",
                            dataIndex: "title",
                        },
                        {
                            title: "Price",
                            dataIndex: "price",
                            render: (value) => <span>${value}</span>
                        },
                        {
                            title: "DiscountedPrice",
                            dataIndex: "discountedPrice",
                            render: (value) => <span>${value}</span>

                        },
                        {
                            title: "Quantity",
                            dataIndex: "quantity",
                        },
                        {
                            title: "Total",
                            dataIndex: "total",
                            render: (value) => <span>${value}</span>

                        },


                    ]}
                    dataSource={dataSource}
                    pagination={false}
                ></Table>
            </Space>
        </div>
    )
}

export default Orders