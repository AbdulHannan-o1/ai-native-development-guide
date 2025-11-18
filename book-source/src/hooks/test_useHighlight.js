import { renderHook, act } from '@testing-library/react-hooks';
import useHighlight from '../src/hooks/useHighlight';

// Mock window.getSelection
const mockGetSelection = (text = '') => {
  return {
    rangeCount: text ? 1 : 0,
    toString: () => text,
    getRangeAt: () => ({}), // Mock range object
  };
};

describe('useHighlight', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Mock global objects
    Object.defineProperty(window, 'getSelection', {
      value: jest.fn(() => mockGetSelection()),
      writable: true,
    });
    Object.defineProperty(document, 'addEventListener', {
      value: jest.fn(),
      writable: true,
    });
    Object.defineProperty(document, 'removeEventListener', {
      value: jest.fn(),
      writable: true,
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHighlight());

    expect(result.current.highlightedContent).toBeNull();
    expect(result.current.isPopupVisible).toBe(false);
    expect(result.current.showDialog).toBe(false);
    expect(result.current.aiResponse).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should detect selection and show popup on mouseup', () => {
    const { result } = renderHook(() => useHighlight());

    act(() => {
      window.getSelection.mockReturnValue(mockGetSelection('test selection'));
      document.dispatchEvent(new MouseEvent('mouseup'));
    });

    expect(result.current.highlightedContent).toEqual({ type: 'TEXT', value: 'test selection' });
    expect(result.current.isPopupVisible).toBe(true);
  });

  it('should hide popup if selection is empty on mouseup', () => {
    const { result } = renderHook(() => useHighlight());

    act(() => {
      window.getSelection.mockReturnValue(mockGetSelection('test selection'));
      document.dispatchEvent(new MouseEvent('mouseup'));
    });
    expect(result.current.isPopupVisible).toBe(true);

    act(() => {
      window.getSelection.mockReturnValue(mockGetSelection(''));
      document.dispatchEvent(new MouseEvent('mouseup'));
    });
    expect(result.current.isPopupVisible).toBe(false);
    expect(result.current.highlightedContent).toBeNull();
  });

  it('should trigger AI request directly on Ctrl+Shift+G shortcut', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHighlight());

    act(() => {
      window.getSelection.mockReturnValue(mockGetSelection('code snippet'));
      const event = new KeyboardEvent('keydown', { ctrlKey: true, shiftKey: true, key: 'G' });
      document.dispatchEvent(event);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.showDialog).toBe(true);
    expect(result.current.highlightedContent).toEqual({ type: 'TEXT', value: 'code snippet' });

    // Wait for the simulated async call to complete
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.aiResponse).toBeDefined();
    expect(result.current.aiResponse.explanation).toContain('code snippet');
  });

  it('should cancel popup and clear content', () => {
    const { result } = renderHook(() => useHighlight());

    act(() => {
      window.getSelection.mockReturnValue(mockGetSelection('some text'));
      document.dispatchEvent(new MouseEvent('mouseup'));
    });
    expect(result.current.isPopupVisible).toBe(true);

    act(() => {
      result.current.handleCancel();
    });
    expect(result.current.isPopupVisible).toBe(false);
    expect(result.current.highlightedContent).toBeNull();
  });

  it('should close dialog and clear state', () => {
    const { result } = renderHook(() => useHighlight());

    act(() => {
      result.current.setShowDialog(true); // Simulate dialog being open
      result.current.setAiResponse({ explanation: 'test' }); // Simulate response
      result.current.handleCloseDialog();
    });
    expect(result.current.showDialog).toBe(false);
    expect(result.current.aiResponse).toBeNull();
    expect(result.current.highlightedContent).toBeNull();
  });
});
