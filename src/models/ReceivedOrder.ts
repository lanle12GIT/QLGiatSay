export interface ReceivedOrder {
    id?: string;
    name: string;
    phone: string;
    note?: string;
    totalPrice?: string; // Optional field for total price
    categoryWeights?: {
        categoryId?: string;
        categoryName?: string;
        price?: string; 
        weight?: string;
    }[];
    createdAt?: string; // Optional field for creation date
}