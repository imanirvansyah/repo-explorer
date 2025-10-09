import { NegativeCase } from '@/components/fragments/negative-case';
import { ToggleTheme } from '@/components/fragments/toggle-theme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/logo';
import { ERROR, NO_DATA } from '@/constants/negative-case';
import { useState } from 'react';
import ItemUser from './fragments/item-user';
import { LoadingPlaceholder } from './fragments/loading';
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
    totalCount,
    isError,
    refetch
  } = useActions();

  return (
    <>
      <div className='p4 flex flex-col gap-3 border-b border-muted '>
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-14">
            <Logo />
            <ToggleTheme />
          </div>
          <form onSubmit={handleSubmit} className='flex items-center gap-2 mt-2'>
            <Input icon='iconamoon:search-light' placeholder='Ex: Justin bieber' />
            <Button>Submit</Button>
          </form>
          {totalCount > 0 && <p className='text-xs text-foreground text-right mt-4'>Users found: {totalCount}</p>}
        </div>
      </div>
      <div className='container mt-4 mx-auto p-4'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
          {allItems.map((user) => (
            <ItemUser key={user.id} data={user} onClick={() => setSelectedUser(user.login)} />
          ))}
        </div>
        {isError && (
          <NegativeCase
            title={ERROR.title}
            subtitle={ERROR.subtitle}
            image={ERROR.image}
            onRefresh={() => refetch()}

          />
        )}
        {!isFetching && !isError && allItems.length === 0 && username &&
          <NegativeCase
            title={NO_DATA.title}
            subtitle={NO_DATA.subtitle}
            image={NO_DATA.image}
          />}
        {hasNextPage && !isFetching && (
          <div className='text-center mt-8'>
            <Button variant="link" onClick={() => fetchNextPage()}>Load More</Button>
          </div>
        )}
        {isFetching && <LoadingPlaceholder />}
        {selectedUser && <ModalUser login={selectedUser} onClose={() => setSelectedUser(null)} />}
      </div >
    </>
  )
}

export default Home;