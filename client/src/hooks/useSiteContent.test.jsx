import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import defaultContent from '../constants/defaultContent';
import { store } from '../redux/store/Store';
import { mockAxios } from '../test/setupTests';

import { useSiteContent } from './useSiteContent';

const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('useSiteContent', () => {
  it('renders bundled content immediately and still works when the API is down', async () => {
    mockAxios.get.mockRejectedValue(new Error('Network Error'));
    const { result } = renderHook(() => useSiteContent(), { wrapper });
    expect(result.current.globalState.hero).toEqual(defaultContent.hero);
    expect(result.current.globalState.training.tracks.length).toBe(3);
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    expect(result.current.globalState.hero).toEqual(defaultContent.hero);
  });

  it('makes a single request and applies API content over the defaults', async () => {
    mockAxios.get.mockResolvedValue({ data: { band: { title: 'From API', desc: 'x' }, hero: {} } });
    const { result } = renderHook(() => useSiteContent(), { wrapper });
    await waitFor(() => expect(result.current.globalState.ctaBand.title).toBe('From API'));
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    // An empty section from the API must not blank out the default.
    expect(result.current.globalState.hero).toEqual(defaultContent.hero);
  });
});
