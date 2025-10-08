import { NegativeCase } from '@/components/fragments/negative-case';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/logo';
import Skeleton from '@/components/ui/skeleton';
import { NO_DATA } from '@/constants/negative-case';
import { useState } from 'react';
import ItemUser from './fragments/item-user';
import ModalUser from './fragments/modal-user';
import { useActions } from './hooks/useActions';

const Home = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const {
    allItems,
    username,
    isFetching,
    hasNextPage,
    fetchNextPage,
    handleSubmit,
    totalCount
  } = useActions();

  return (
    <>
      <div className='pt-14 pb-4 px-4 flex flex-col gap-3 border-b border-gray-200 '>
        <div className="container mx-auto p-4">
          <Logo />
          <form onSubmit={handleSubmit} className='flex items-center gap-2 mt-2'>
            <Input icon='iconamoon:search-light' placeholder='Ex: Justin bieber' />
            <Button>Submit</Button>
          </form>
          {totalCount > 0 && <p className='text-xs text-gray-500 text-right mt-4'>Total users found: {totalCount}</p>}
        </div>
      </div>
      <div className='container mt-4 mx-auto p-4'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {allItems.map((user) => (
            <ItemUser key={user.id} data={user} onClick={() => setSelectedUser(user.login)} />
          ))}
        </div>
        {!isFetching && allItems.length === 0 && username &&
          <NegativeCase
            title={NO_DATA.title}
            subtitle={NO_DATA.subtitle}
            image={NO_DATA.image}
          />}
        {hasNextPage && !isFetching && (
          <button onClick={() => fetchNextPage()}>Load More</button>
        )}
        {isFetching && <LoadingPlaceholder />}
        {selectedUser && <ModalUser login={selectedUser} onClose={() => setSelectedUser(null)} />}
      </div>
    </>
  )
}


const LoadingPlaceholder = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-48" />
      ))}
    </div>
  )
}


export default Home;