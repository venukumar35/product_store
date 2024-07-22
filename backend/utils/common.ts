export interface PaginationResponseType<T> {
  from: number;
  to: number;
  total: number;
  totalPages: number;
  data: T[];
}
//Pagination response
export function PaginationResponse<T>(
  page: number,
  totalCount: number,
  itemsPerPage: number,
  data: T[],
): PaginationResponseType<T> {
  const offset = (page - 1) * itemsPerPage;
  let from = 0;
  let to = 0;
  if (totalCount > 0) {
    from = offset + 1;
    if (offset + itemsPerPage > totalCount) {
      to = totalCount;
    } else {
      to = offset + itemsPerPage;
    }
  }
  return {
    from: from,
    to: to,
    total: totalCount,
    totalPages: Math.ceil(totalCount / itemsPerPage),
    data,
  };
}

export enum ProductCategory {
  TopWear = 'Top',
  BottomWear = 'Bottom',
  EthnicWear = 'Ethnic',
  SportsWear = 'Sports',
  Fragrances = 'Fragrances',
  Footwear = 'Footwear',
  Accessories = 'Accessories',
  Innerwear = 'Inner',
  Watches = 'Watches',
}
export enum ProductTypeName {
  EthicSet = 'Ethnic Wear Sets',
  EthicBottom = 'Ethnic Bottom Wear',
  SportsTShirts = 'T-Shirts',
  SportsTrackSuit = 'Track Suits',
  Footwear = 'Socks',
  'Inner' = 'Vests',
}
const top: string[] = [
  'T-Shirts',
  'Polo T Shirts',
  'Casual Shirts',
  'Formal Shirts',
  'Suits & Blazers',
  'Jackets',
  'Sweaters & Sweatshirts',
];

const bottom: string[] = [
  'Jeans',
  'Casual Trousers',
  'Formal Trousers',
  'Joggers',
  'Shorts',
  'Three Fourth',
];

const ethnic: string[] = [
  'Kurtas',
  'Ethnic Wear Sets',
  'Nehru Jackets',
  'Ethnic Bottom Wear',
];

const sports: string[] = ['T-Shirts', 'Shorts', 'Track Pants', 'Track Suits'];

const footwear: string[] = [
  'Casual Shoes',
  'Formal Shoes',
  'Sports Shoes',
  'Slippers',
  'Sandals',
  'Socks',
];

const accessories: string[] = [
  'Caps And Hats',
  'Ties',
  'Handkerchiefs',
  'Belts',
  'Bags',
  'Wallets',
  'Watches',
  'Sun glass',
];

const innerWear: string[] = ['Briefs', 'Boxers', 'Vests'];
const sizesForShirts: string[] = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const sizesForPants: string[] = ['28', '30', '32', '36', '38', '40', '42'];

const footWears: string[] = ['6', '7', '8', '9', '10'];

const empty: string[] = ['Quanity'];

export {
  accessories,
  innerWear,
  bottom,
  ethnic,
  top,
  footwear,
  sports,
  sizesForShirts,
  sizesForPants,
  footWears,
  empty,
};
