import { ReceivedOrder } from "../models/ReceivedOrder";


export const MOCK_RECEIVED_ORDERS: ReceivedOrder[] = [
  { id: '1', name: 'Nguyễn Văn A', phone: '0912345678', note: 'Gấp gọn', totalPrice: '100K', categoryWeights: [ {categoryName: 'Quần áo', weight: '2' }] },
  { id: '2', name: 'Trần Thị B', phone: '0987654321', note: ' Nhận lúc 17h', totalPrice: '200K', categoryWeights: [ {categoryName: 'Quần áo', weight: '1' }] },
  { id: '3', name: 'Lê Văn C', phone: '0909123456', note: 'Nhận lúc 10h', totalPrice: '150K', categoryWeights: [ { categoryName: 'Quần áo', weight: '1.5' }] },
  { id: '4', name: 'Phạm Thị D', phone: '0898765432', note: 'Không gấp', totalPrice: '300K', categoryWeights: [ { categoryName: 'Quần áo', weight: '3' }] },
  { id: '5', name: 'Nguyễn Văn E', phone: '0912345679', note: 'Gấp gọn', totalPrice: '250K', categoryWeights: [ { categoryName: 'Quần áo', weight: '2.5' }] },
  { id: '6', name: 'Trần Thị F', phone: '0987654322', note: 'Nhận lúc 15h', totalPrice: '180K', categoryWeights: [ { categoryName: 'Giày dép', weight: '1' }] },
  { id: '7', name: 'Lê Văn G', phone: '0909123457', note: 'Không gấp', totalPrice: '220K', categoryWeights: [ { categoryName: 'Giày dép', weight: '1' }] },
  { id: '8', name: 'Phạm Thị H', phone: '0898765433', note: 'Nhận lúc 12h', totalPrice: '170K', categoryWeights: [{categoryName: 'Giày dép', weight: '1.2'}] },
  { id: '9', name: 'Nguyễn Văn I', phone: '0912345680', note: 'Gấp gọn', totalPrice: '280K', categoryWeights: [{categoryName: 'Quần áo', weight: '2' }] },
  { id: '10', name: 'Trần Thị J', phone: '0987654323', note: 'Nhận lúc 14h', totalPrice: '230K', categoryWeights: [{ categoryName: 'Quần áo', weight: '2' }] },
  { id: '11', name: 'Lê Văn K', phone: '0909123458', note: 'Không gấp', totalPrice: '190K', categoryWeights: [{ categoryName: 'Quần áo', weight: '2' }] },
  { id: '12', name: 'Phạm Thị L', phone: '0898765434', note: 'Nhận lúc 11h', totalPrice: '210K', categoryWeights: [{ categoryName: 'Quần áo', weight: '2' }] },
  { id: '13', name: 'Nguyễn Văn M', phone: '0912345681', note: 'Gấp gọn', totalPrice: '260K', categoryWeights: [{ categoryName: 'Quần áo', weight: '2' }] },
  { id: '14', name: 'Trần Thị N', phone: '0987654324', note: 'Nhận lúc 16h', totalPrice: '240K', categoryWeights: [{ categoryName: 'Quần áo', weight: '2' }] },
];

export const addNewReceivedOrder = (order: ReceivedOrder) => {
    // Generate a new ID for the order
    const newId = MOCK_RECEIVED_ORDERS.reduce((max, o) => Math.max(max, parseInt(o.id || '0')), 0) + 1;
    const addNewReceivedOrder: ReceivedOrder = {
        ...order,
    };
    addNewReceivedOrder.id = newId.toString();
    addNewReceivedOrder.createdAt = new Date().toISOString();
    console.log('Adding new received order:', addNewReceivedOrder);
    MOCK_RECEIVED_ORDERS.push(addNewReceivedOrder);
};