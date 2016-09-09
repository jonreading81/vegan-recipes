import paginate from 'array-page';

export default function pageinateArray(array, perPage, page ){
   const pagination = paginate(array, page, perPage);
   return {
      docs : pagination,
      total: pagination._page.total,
      limit: perPage,
      page: page,
      pages: pagination._page.count
    }
}