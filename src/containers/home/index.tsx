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
      <div>
        <h1>Repo Explorer</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter username' />
          <button type='submit'>Search</button>
        </form>
      </div>

      <div>
        {!isFetching && allItems.length === 0 && username && <p>No users found for "{username}"</p>}
        {totalCount > 0 && <p>Total users found: {totalCount}</p>}
        {allItems.map((user) => (
          <ItemUser key={user.id} data={user} onClick={() => setSelectedUser(user.login)} />
        ))}
        {hasNextPage && !isFetching && (
          <button onClick={() => fetchNextPage()}>Load More</button>
        )}
        {isFetching && <p>Loading...</p>}
      </div>

      {selectedUser && <ModalUser login={selectedUser} onClose={() => setSelectedUser(null)} />}
    </>
  )
}



export default Home;