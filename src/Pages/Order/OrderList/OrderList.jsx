import './orderList.scss'
import Navbar from '../../../components/Navbar/Navbar'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Order from '../../../components/OrderTable/OrderTable'

function OrderList() {
  return (
    <div className="order">
        <Sidebar/>
        <div className="orderContainer">
            <Navbar/>
            <Order/>
        </div>
    </div>
  )
}

export default OrderList