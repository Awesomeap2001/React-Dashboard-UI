import { Avatar, Rate, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getCustomers } from '../../api/API';

const Customers = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCustomers().then(res => {
            setDataSource(res.users)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <Space size={20} direction='vertical' style={{ display: "grid" }}>
                <Typography.Title style={{ fontSize: 40, marginBottom: "-10px" }}>Customers</Typography.Title>
                <Table
                    loading={loading}
                    columns={[
                        {
                            title: "Profile",
                            dataIndex: "image",
                            render: (link) => { return <Avatar src={link} /> }
                        },
                        {
                            title: "First Name",
                            dataIndex: "firstName",
                        },
                        {
                            title: "Last Name",
                            dataIndex: "lastName",
                        },
                        {
                            title: "Email",
                            dataIndex: "email",
                        },
                        {
                            title: "Phone",
                            dataIndex: "phone",
                        },
                        {
                            title: "Address",
                            dataIndex: "address",
                            render: (address => {
                                return <span>{address.address}, {address.city}</span>
                            })
                        },

                    ]}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 5,
                        position: ['bottomCenter']
                    }}
                    style={{ width: "100%" }}
                ></Table>
            </Space>
        </div>
    )
}

export default Customers