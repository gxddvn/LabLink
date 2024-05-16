import React, {Fragment} from 'react'
import { NavLink } from "react-router-dom";
import { Menu, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectProfileData } from '../../Store/Slices/profile';

function MenuIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}

const Header = () => {
  const dispatch = useDispatch();
  const profileData = useSelector(selectProfileData);
  return (
    <div className='px-12 py-5'>
      <div className='flex items-center justify-between'>
        <NavLink to='/'><span className="text-3xl font-semibold">Lab<span className='text-3xl font-semibold text-sky-400'>Link</span></span></NavLink>
        {profileData.IsAuth ? (
          <Menu as="div" className="relative inline-block text-left z-50">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-all ease-linear hover:bg-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                <MenuIcon className="h-5 w-5" aria-hidden="true"/>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink to='/profile' className={`${ active ? 'bg-sky-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        Мій кабінет
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink to="/analyzesresult" className={`${ active ? 'bg-sky-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        Результати аналізів
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={() => window.confirm("Ви впевнені, що хочете вийти?") ? dispatch(logout()) : "" } className={`${active ? 'bg-sky-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        Вихід
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <NavLink to='/signin'><span className="text-base font-normal transition-all ease-linear hover:text-sky-300">Вхід/Реєстрація</span></NavLink>
        )}
        {/* <NavLink to='/signin'><span className="text-base font-normal transition-all ease-linear hover:text-sky-300">Вхід/Реєстрація</span></NavLink> */}
        
      </div>
    </div>
  )
}

export default Header