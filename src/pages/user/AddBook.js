import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextInput from '../../components/common/ui/form/TextInput';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/ui/Button';
import { FAILED, IDLE, SUCCEEDED } from '../../constant';
import { setConfig, timeout } from '../../helpers/AjaxHelper';
import ProfileSidebar from '../../components/common/ui/sidebar/ProfileSidebar';
import axios from 'axios';
import Select from '../../components/common/ui/form/Select';
import { addBookSubmit, fetchCategories, resetForm } from '../../redux/slices/addBookSlice';
import SelectAsync from '../../components/common/ui/form/SelectAsync';
import TextArea from '../../components/common/ui/form/TextArea';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const EXISTING = 'existing';
const NEW = 'new';

function AddBook() {
  const { control, register, getValues, handleSubmit, errors: formErrors } = useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const formStatus = useSelector((state) => state.addBook.formStatus);
  const formError = useSelector((state) => state.addBook.formError);
  const categories = useSelector((state) => state.addBook.categories);

  const [defaultOptions, setDefaultOptions] = useState([]);
  const [bookSelectionType, setBookSelectionType] = useState(EXISTING);
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/api/book/lookup?title=A`, setConfig())
      .then((response) => {
        let bookOptions = response.data.data?.map((book) => ({ value: book.id, label: book.title }));
        setDefaultOptions(bookOptions);
      });
    dispatch(fetchCategories());
  }, []);

  const loadOptions = async (searchQuery) => {
    const response = await axios.get(`${baseUrl}/api/book/lookup?title=${searchQuery}`, setConfig());
    return response.data.data?.map((book) => ({ value: book.id, label: book.title }));
  };

  function bookSelectionTypeChange(e) {
    setBookSelectionType(e.target.value);
  }

  function imageChange(e) {
    setImage(e.target.files[0]);
  }

  function submit(book) {
    book.book_id = book.selectedBook?.value;
    book.is_new = bookSelectionType === NEW;
    book.image = image;
    dispatch(addBookSubmit(book));
  }

  useEffect(() => {
    if (formStatus === SUCCEEDED) {
      toast.success(t('Successfully add new book'));
      timeout(2000).then(() => {
        dispatch(resetForm());
        history.push('/my_listings');
      });
    }
  }, [formStatus]);

  return (
    <>
      <aside className="flex-initial w-60 hidden sm:block">
        <ProfileSidebar/>
      </aside>
      <div className="flex-auto px-6">
        <div className="py-3 border-b mb-4">
          <h3 className="float-left text-2xl font-bold">Add Book</h3>
          <div className="clear-both" />
        </div>

        <div>
          <form>

            <div>
              {formStatus === FAILED && <p className="text-red-600 p-3 bg-red-100 rounded mb-4">{formError}</p>}
            </div>

            <div>
              <input id="book_selection_type_existing" type="radio" value={EXISTING} name="book_selection_type"
                     checked={bookSelectionType === EXISTING} onChange={bookSelectionTypeChange}/>
              <label htmlFor="book_selection_type_existing" className="ml-1">Find existing Book</label>
            </div>
            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <SelectAsync
                  id="selectedBook"
                  name="selectedBook"
                  defaultOptions={defaultOptions}
                  loadOptions={loadOptions}
                  control={control}
                  validationRules={{
                    validate: {
                      requiredForExisting: () => {
                        const { selectedBook } = getValues();
                        return bookSelectionType !== EXISTING || (typeof selectedBook != 'undefined') || t('Existing book is required');
                      },
                    }
                  }}
                  error={formErrors?.selectedBook}
                />
              </div>

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              </div>
            </div>
            {/* -- Form Row End -- */}

            <div>
              <input id="book_selection_type_new" type="radio" value={NEW} name="book_selection_type"
                     checked={bookSelectionType === NEW} onChange={bookSelectionTypeChange}/>
              <label for="book_selection_type_new" className="ml-1">Or add new one if you cannot find</label>
            </div>

            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  id="title"
                  name="title"
                  label={t('Title')}
                  required={true}
                  inputRef={register({
                    validate: {
                      requiredForNew: () => {
                        const { title } = getValues();
                        return bookSelectionType !== NEW || title !== '' || t('Title is required');
                      }
                    }
                  })}
                  error={formErrors?.title}
                />
              </div>

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  id="author"
                  name="author"
                  label={t('Author')}
                  required={true}
                  inputRef={register({
                    validate: {
                      requiredForNew: () => {
                        const { author } = getValues();
                        return bookSelectionType !== NEW || author !== '' || t('Author is required');
                      }
                    }
                  })}
                  error={formErrors?.author}
                />
              </div>
            </div>
            {/* -- Form Row End -- */}

            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <TextArea
                  id="desc"
                  name="desc"
                  label={t('Description')}
                  inputRef={register()}
                  error={formErrors?.desc}
                />
              </div>
            </div>
            {/* -- Form Row End -- */}

            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <Select
                  id="category_id"
                  name="category_id"
                  label={t('Category')}
                  placeholder="- Category -"
                  required={true}
                  inputRef={register({
                    validate: {
                      requiredForNew: () => {
                        const { category_id } = getValues();
                        return bookSelectionType !== NEW || category_id !== '' || t('Category is required');
                      }
                    }
                  })}
                  options={categories}
                  error={formErrors?.category_id}
                />
              </div>

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  id="isbn"
                  name="isbn"
                  label={t('ISBN')}
                  required={true}
                  inputRef={register({
                    validate: {
                      requiredForNew: () => {
                        const { isbn } = getValues();
                        return bookSelectionType !== NEW || isbn !== '' || t('ISBN is required');
                      }
                    }
                  })}
                  error={formErrors?.isbn}
                />
              </div>
            </div>
            {/* -- Form Row End -- */}

            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <input id="image" type="file" name="image" onChange={imageChange} />
              </div>
            </div>

            <div className="flex flex-row-reverse gap-x-2">
              <Button onClick={handleSubmit(submit)}>
                {t('Submit')}
              </Button>

              <Button onClick={() => history.push('/my_listings')} type="secondary">
                {t('Cancel')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBook;