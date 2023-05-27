import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLoggedUser } from '../redux/loggedUserSlice';
import apiAuthGet from '../hooks/apiAuthGet';
import apiPutData from '../utils/api/apiPutData';
import Loader from '../components/ui/Loader';
import BookingCard from '../components/ui/BookingCard';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Account() {
  const userData = useSelector((state) => state.isLoggedIn.userData);
  const dispatch = useDispatch();
  const [urlError, setUrlError] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const { data, isLoading, error } = apiAuthGet(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${userData.name}?_bookings=true`
  );

  const updateUser = async () => {
    let newUserData = { ...userData };
    try {
      await apiPutData(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${userData.name}/media`,
        { avatar: newAvatarUrl }
      );
      newUserData.avatar = newAvatarUrl;
      dispatch(updateLoggedUser(newUserData));
      setNewAvatarUrl('');
      setUrlError(false);
    } catch (error) {
      console.log('Error updating user:', error);
      setUrlError(true);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="mx-auto mt-10 text-red-600 text-lg font-bold">
        Sorry, something went wrong. {error.message}
      </div>
    );
  }
  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-red-main lg:pr-8">
            <h1 className="text-2xl font-bold text-blue-main sm:text-3xl">
              {data.name} - {data.email}
            </h1>
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Profile image</h2>
            {userData.avatar ? (
              <div
                className={`mx-auto h-44 w-44 border rounded-full border-blue-main`}
              >
                <img
                  src={userData.avatar}
                  alt="Avatar image"
                  className="h-full w-full object-cover object-center rounded-full"
                />
              </div>
            ) : (
              <UserCircleIcon className="mx-auto h-44 w-44 text-blue-main" />
            )}
            <form className="mt-10 p-3 border">
              <p className={`text-red-600 ${urlError ? 'flex' : 'hidden'}`}>
                Please check if you provide a valid URL
              </p>
              <div className="col-span-6">
                <label htmlFor="userAvatar">Set new avatar:</label>
                <input
                  type="text"
                  id="userAvatar"
                  name="userAvatar"
                  value={newAvatarUrl}
                  placeholder="Enter new image URL"
                  className="mt-2 block w-full border-0 border-b-2 p-1.5 focus:ring-0 select-none text-blue-main shadow-sm sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setNewAvatarUrl(e.target.value);
                    setUrlError(false);
                  }}
                />
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="mt-10 mx-2 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-main px-8 py-3 text-base font-medium text-white outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
                  onClick={() =>
                    newAvatarUrl ? updateUser() : setUrlError(true)
                  }
                >
                  Change
                </button>
                <button
                  type="button"
                  className="mt-10 mx-2 flex w-full items-center justify-center rounded-md border border-transparent bg-red-main px-8 py-3 text-base font-medium text-gray-900 outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
                  onClick={() => {
                    setNewAvatarUrl('');
                    updateUser();
                  }}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-red-main lg:pb-16 lg:pr-8 lg:pt-6">
            <BookingCard bookings={data.bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}
