import { TestBed } from '@angular/core/testing';
import { SIDEBAR_COLLAPSED_STORAGE_KEY, SidebarService } from './sidebar.service';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    localStorage.removeItem(SIDEBAR_COLLAPSED_STORAGE_KEY);
    delete document.documentElement.dataset['sidebarCollapsed'];

    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarService);
  });

  afterEach(() => {
    localStorage.removeItem(SIDEBAR_COLLAPSED_STORAGE_KEY);
    delete document.documentElement.dataset['sidebarCollapsed'];
  });

  it('should default to expanded', () => {
    expect(service.collapsed()).toBe(false);
    expect(document.documentElement.dataset['sidebarCollapsed']).toBeUndefined();
  });

  it('should toggle collapsed state and persist to localStorage', () => {
    service.toggle();

    expect(service.collapsed()).toBe(true);
    expect(document.documentElement.dataset['sidebarCollapsed']).toBe('');
    expect(localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY)).toBe('1');

    service.toggle();

    expect(service.collapsed()).toBe(false);
    expect(document.documentElement.dataset['sidebarCollapsed']).toBeUndefined();
    expect(localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY)).toBe('0');
  });

  it('should restore collapsed state from localStorage', () => {
    TestBed.resetTestingModule();
    localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, '1');
    TestBed.configureTestingModule({});

    const restored = TestBed.inject(SidebarService);

    expect(restored.collapsed()).toBe(true);
    expect(document.documentElement.dataset['sidebarCollapsed']).toBe('');
  });
});
