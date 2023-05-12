import { useEffect, useState } from 'react'
import { Divider, Table } from 'antd';
import { getAllOrders } from './api/requests';
// import Moment from 'react-moment';


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};



function App() {
  const [orders, setOrders]=useState([]);
  const[loading, setLoading]=useState(true);




  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter:(a,b)=>a.id-b.id
    },
    {
      title: 'Customer Id',
      dataIndex: 'customerId',
      filters: [
        {
          text: orders.customerId,
          value: orders.customerId
        },
        
      ],
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      sorter: (a, b) => a.orderDate - b.orderDate,
   
    },
    {
      title: 'Freight',
      dataIndex: 'freight',
      defaultSortOrder: 'descend',
      sorter:(a,b)=>a.freight-b.freight
    },
    {
      title: 'Address',
      dataIndex: ['shipAddress','city'],
  render: (_,data)=>(
    <p>{data.shipAddress.country},{data.shipAddress.city}</p>
  )
    },
    {
      title: 'requiredDate',
      dataIndex: 'requiredDate',
    },
    {
      title: 'Shipped Date',
      dataIndex: 'shippedDate',
    },
  ];


useEffect(()=>{
getAllOrders().then(data=>{
  setOrders(data);
  setLoading(false);
  });
},[setOrders, setLoading]);
console.log('data: ',orders);

  return (
    <>
    <Divider orientation='center'>Task Ant Design</Divider>

  <Table style={{width:"80%", margin:"0 auto"}} columns={columns} dataSource={orders} onChange={onChange} />
    </>
  )
}

export default App
