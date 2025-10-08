import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserServices } from '../../../../services/users';
import { useActions } from '../useActions';
import type { IUser } from '../../../../types/users';


vi.mock('../../../../services/users', () => {
  return {
    UserServices: {
      getUsers: {
        key: 'get-users',
        call: vi.fn()
      },
      getUserDetail: {
        key: 'get-user-detail',
        call: vi.fn()
      },
      getUserRepos: {
        key: 'get-user-repos',
        call: vi.fn()
      }
    }
  };
});


const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
    },
  });


function TestComponent() {
  const {
    username,
    handleSubmit,
    allItems,
    fetchNextPage,
    hasNextPage,
    isFetching,
    totalCount
  } = useActions();

  return (
    <div>
      <form data-testid="form" onSubmit={handleSubmit}>
        <input data-testid="input" name="q" />
        <button type="submit">Search</button>
      </form>

      <div data-testid="username">username:{username}</div>
      <div data-testid="totalCount">total:{totalCount}</div>
      <div data-testid="isFetching">{String(isFetching)}</div>
      <ul data-testid="items">
        {allItems.map((it: IUser) => (
          <li key={it.id} data-testid="item">{it.login}</li>
        ))}
      </ul>
      <button data-testid="fetchNext" onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        fetchNext
      </button>
      <div data-testid="hasNext">{String(hasNextPage)}</div>
    </div>
  );
}

describe('useActions hook', () => {
  const mocked = vi.mocked(UserServices, true);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('search -> loads first page and sets totalCount & hasNextPage', async () => {
    mocked.getUsers.call.mockImplementation((_username: string, page: number) => {
      if (page === 1) {
        return Promise.resolve({
          total_count: 8,
          incomplete_results: false,
          items: [
            { id: 1, login: 'u1' },
            { id: 2, login: 'u2' },
            { id: 3, login: 'u3' },
            { id: 4, login: 'u4' },
            { id: 5, login: 'u5' },
          ],
        });
      }

      return Promise.resolve({ total_count: 0, incomplete_results: false, items: [] });
    });

    const qc = createQueryClient();
    render(
      <QueryClientProvider client={qc}>
        <TestComponent />
      </QueryClientProvider>
    );

    const input = screen.getByTestId('input') as HTMLInputElement;
    await userEvent.type(input, 'john');
    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => {
      expect(mocked.getUsers.call).toHaveBeenCalledWith('john', 1);
    });

    await waitFor(() => {
      const items = screen.getAllByTestId('item');
      expect(items).toHaveLength(5);
      expect(screen.getByTestId('totalCount')).toHaveTextContent('total:8');
      expect(screen.getByTestId('hasNext')).toHaveTextContent('true');
    });
  });

  it('fetchNextPage -> loads second page and disables hasNextPage when done', async () => {
    mocked.getUsers.call.mockImplementation((_username: string, page: number) => {
      if (page === 1) {
        return Promise.resolve({
          total_count: 8,
          incomplete_results: false,
          items: [
            { id: 1, login: 'u1' },
            { id: 2, login: 'u2' },
            { id: 3, login: 'u3' },
            { id: 4, login: 'u4' },
            { id: 5, login: 'u5' },
          ],
        });
      }
      if (page === 2) {
        return Promise.resolve({
          total_count: 8,
          incomplete_results: false,
          items: [
            { id: 6, login: 'u6' },
            { id: 7, login: 'u7' },
            { id: 8, login: 'u8' },
          ],
        });
      }
      return Promise.resolve({ total_count: 0, incomplete_results: false, items: [] });
    });

    const qc = createQueryClient();
    render(
      <QueryClientProvider client={qc}>
        <TestComponent />
      </QueryClientProvider>
    );

    const input = screen.getByTestId('input') as HTMLInputElement;
    await userEvent.type(input, 'doe');
    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => {
      expect(mocked.getUsers.call).toHaveBeenCalledWith('doe', 1);
    });


    const fetchBtn = screen.getByTestId('fetchNext');
    await waitFor(() => expect(fetchBtn).not.toBeDisabled());
    fireEvent.click(fetchBtn);

    await waitFor(() => {
      expect(mocked.getUsers.call).toHaveBeenCalledWith('doe', 2);
    });

    await waitFor(() => {
      const items = screen.getAllByTestId('item');
      expect(items).toHaveLength(8);
      expect(screen.getByTestId('hasNext')).toHaveTextContent('false');
    });
  });

  it('multiple submits increment searchId and re-fetch', async () => {
    mocked.getUsers.call.mockResolvedValue({
      total_count: 1,
      incomplete_results: false,
      items: [{ id: 10, login: 'single' }],
    });

    const qc = createQueryClient();
    render(
      <QueryClientProvider client={qc}>
        <TestComponent />
      </QueryClientProvider>
    );

    const input = screen.getByTestId('input') as HTMLInputElement;
    await userEvent.type(input, 'a');
    fireEvent.submit(screen.getByTestId('form'));
    await waitFor(() => expect(mocked.getUsers.call).toHaveBeenCalledTimes(1));

    fireEvent.submit(screen.getByTestId('form'));
    await waitFor(() => expect(mocked.getUsers.call).toHaveBeenCalledTimes(2));
  });
});
