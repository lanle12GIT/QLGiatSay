export interface Category {
    id: string;
    name: string;
    icon: string;
    price: string; // Price per kg
    order?: string; // Optional order for sorting categories
}
