export interface Category {
    id: string;
    name: string;
    icon: string;
    price: string; // Price per kg
    order?: string; // Optional order for sorting categories
}

export const CATEGORIES: Category[] = [
    { id: '1', name: 'Quần áo', icon: 'washing-machine', price: '10000', order: '1' },
    { id: '2', name: 'Giày dép', icon: 'shoe-formal', price: '50000', order: '2' },
    { id: '3', name: 'Mền', icon: 'water', price: '20000', order: '3' },
    { id: '4', name: 'Gấu bông', icon: 'weather-sunny', price: '30000', order: '4' },
    { id: '5', name: 'Ủi đồ', icon: 'iron', price: '10000', order: '5' },
    { id: '6', name: 'Khác', icon: 'dots-horizontal', price: '1000', order: '6' },

];