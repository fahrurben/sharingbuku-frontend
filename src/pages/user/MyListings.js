import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/ui/Button';
import ProfileSidebar from '../../components/common/ui/sidebar/ProfileSidebar';
import { fetchMyListings } from '../../redux/slices/myListingsSlice';
import Pagination from '../../components/common/ui/table/Pagination';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function MyListings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const listing_data = useSelector((state) => state.myListings.data);
  const listing_meta = useSelector((state) => state.myListings.meta);

  useEffect(() => {
    dispatch(fetchMyListings(1));
  }, []);

  function gotoPage(page) {
    dispatch(fetchMyListings(page));
  }

  function addBookClicked() {
    history.push('/add_book');
  }

  return (
    <>
      <aside className="flex-initial w-60 hidden md:block" style={{minWidth: '250px'}}>
        <ProfileSidebar/>
      </aside>
      <div className="flex-auto px-6">
        <div className="py-3 border-b">
          <h3 className="float-left text-2xl font-bold">My Books</h3>
          <div className="float-right"><Button onClick={addBookClicked}>Add Book</Button></div>
          <div className="clear-both" />
        </div>

        <div className="flex-auto py-4">
          <div className="flex flex-wrap gap-y-2">
            {
              listing_data.map((book) => {
                return (
                  <div className="book-item-wrapper w-1/2 sm:w-1/3 md:w-1/5 px-2">
                    <a href="#" className="book-item mt-3 pb-2 block border hover:shadow-xl">
                      <div className="thumbnail overflow-hidden" style={{height: '200px'}}>
                        {
                          book.image ?
                            (<img src={baseUrl + '/storage/books/' + book.image} alt=""  className="w-full h-full"/>) :
                            (<img src={baseUrl + '/img/book_placeholder.jpg'} alt="" className="w-full h-full"/>)
                        }
                      </div>
                      <h6 className="title p-2 overflow-hidden"  style={{height: '60px'}}>{book.title}</h6>
                    </a>
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
  );
}

export default MyListings;