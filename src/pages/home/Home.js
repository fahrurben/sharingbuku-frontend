import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as _ from 'lodash';
import ProfileSidebar from '../../components/common/ui/sidebar/ProfileSidebar';
import Button from '../../components/common/ui/Button';
import Pagination from '../../components/common/ui/table/Pagination';
import { fetchMyListings } from '../../redux/slices/myListingsSlice';
import { fetchBooks, fetchCategories, setCategoryId } from '../../redux/slices/homeSlice';
import clsx from 'clsx';
import Select from '../../components/common/ui/form/Select';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const title = useSelector((state) => state.home.title);
  const categoryId = useSelector((state) => state.home.categoryId);
  const categories = useSelector((state) => state.home.categories);
  const listing_data = useSelector((state) => state.home.data);
  const listing_meta = useSelector((state) => state.home.meta);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBooks(1, title));
  }, []);

  function gotoPage(page) {
    setPage(page);
    dispatch(fetchBooks(page, title, categoryId));
  }

  function categoryClicked(categoryId) {
    dispatch(setCategoryId(categoryId));
    dispatch(fetchBooks(page, title, categoryId));
  }

  function categoryChanged(e) {
    let categoryId = e.target.value;
    dispatch(setCategoryId(categoryId));
    dispatch(fetchBooks(page, title, categoryId));
  }

  return (
    <>
      <aside className="flex-initial w-60 hidden md:block" style={{minWidth: '250px'}}>
        <h3 className="text-xl font-bold border-b px-2 py-2">{t('Category')}</h3>
        <ul>
          {categories.map((category) => {
            const linkDefaultStyle = ['block', 'p-2', 'border-b', 'w-full'];
            const linkActiveStyle = _.concat(...linkDefaultStyle, 'bg-gray-200');
            const linkStyle = categoryId == category.id ? clsx(linkActiveStyle) : clsx(linkDefaultStyle);
            return <li><a href="#" onClick={() => categoryClicked(category.id)} className={linkStyle}>{category.name}</a></li>
          })}
        </ul>
      </aside>
      <div className="flex-auto px-6">
        <div className="flex-auto py-4">
          <div className="block md:hidden w-full">
            <Select
              id="category_id"
              name="category_id"
              placeholder="- Category -"
              label={t('Category')}
              options={categories}
              onChange={categoryChanged}
              value={categoryId}
            />
          </div>
          <div className="flex flex-wrap gap-y-2">
            {
              listing_data.map((book) => {
                return (
                  <div className="book-item-wrapper w-1/2 sm:w-1/3 md:w-1/5 px-2">
                    <Link to={`/book/${book.id}`} className="book-item mt-3 pb-2 block border hover:shadow-xl">
                      <div className="thumbnail overflow-hidden" style={{height: '200px'}}>
                        {
                          book.image ?
                            (<img src={baseUrl + '/storage/books/' + book.image} alt=""  className="w-full h-full"/>) :
                            (<img src={baseUrl + '/img/book_placeholder.jpg'} alt="" className="w-full h-full"/>)
                        }
                      </div>
                      <h6 className="title p-2 overflow-hidden"  style={{height: '60px'}}>{book.title}</h6>
                    </Link>
                  </div>
                );
              })
            }
          </div>
          <Pagination
            current_page={listing_meta.current_page}
            total_page={listing_meta.last_page}
            gotoPage={gotoPage}/>
        </div>
      </div>
    </>
  )
}

export default Home;