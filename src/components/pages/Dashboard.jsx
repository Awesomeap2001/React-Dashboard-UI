import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../api/API";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [orders, setOrders] = useState(0)
    const [inventory, setInventory] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [revenue, setRevenue] = useState(0)

    useEffect(() => {
        getOrders().then(res => {
            setOrders(res.total)
            setRevenue(res.discountedTotal)
        })
        getInventory().then(res => {
            setInventory(res.total)
        })
        getCustomers().then(res => {
            setCustomers(res.total)
        })

    }, [])

    return (
        <>
            <Space direction="vertical" size={20}>
                <Typography.Title style={{ fontSize: 40, marginBottom: "-10px" }}>Dashboard</Typography.Title>
                <div className="cardsSection">
                    <DashboardCard
                        icon={<ShoppingCartOutlined style={{ color: "green", fontWeight: "bold", background: "rgb(50 205 50/ 0.1)", borderRadius: '50%', fontSize: 30, padding: 8 }} />}
                        title={"Orders"}
                        value={orders}
                    />
                    <DashboardCard
                        icon={<ShoppingOutlined style={{ color: "orange", fontWeight: "bold", background: "rgb(255 165 0/ 0.1)", borderRadius: '50%', fontSize: 30, padding: 8 }} />}
                        title={"Inventory"}
                        value={inventory}
                    />
                    <DashboardCard
                        icon={<UserOutlined style={{ color: "#38c1fc", fontWeight: "bold", background: "rgb(56 193 252/ 0.1)", borderRadius: '50%', fontSize: 30, padding: 8 }} />}
                        title={"Customer"}
                        value={customers}
                    />
                    <DashboardCard
                        icon={<DollarCircleOutlined style={{ color: "red", fontWeight: "bold", background: "rgb(255 0 0/ 0.1)", borderRadius: '50%', fontSize: 30, padding: 8 }} />}
                        title={"Revenue"}
                        value={revenue}
                    />
                </div>

                <div className="charts">
                    {/* Chart */}
                    <DashboardChart />

                    {/* Table */}
                    <RecentOrders />

                </div>

            </Space>
        </>
    );
};

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic
                    title={title}
                    value={value}
                />
            </Space>
        </Card>
    );
}


function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getOrders().then(res => {
            setDataSource(res.products.splice(0, 3))
            setLoading(false)
        })
    }, [])

    return (
        <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)" }}>
            <h4 style={{ fontSize: 25, marginBottom: 10 }}>Recent Orders</h4>
            <Table
                columns={[
                    {
                        title: "title",
                        dataIndex: "title"
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantity"
                    },
                    {
                        title: "Price",
                        dataIndex: "discountedPrice"
                    }
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            ></Table>
        </Card>
    )
}

const DashboardChart = () => {

    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        getRevenue().then(res => {
            const labels = res.carts.map(cart => {
                return `User-${cart.userId}`
            })

            const data = res.carts.map(cart => {
                return cart.discountedTotal
            })

            console.log(data)

            const dataSource = {
                labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: data,
                        backgroundColor: 'rgb(56 193 252/ 0.8)',
                    }
                ],
            };

            setRevenueData(dataSource)
        })
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Order Revenue',
            },
        },
    };

    return <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)" }}>
        <Bar options={options} data={revenueData} />
    </Card>;
}

export default Dashboard;
