/**
 * Hardcoded dummy state for Fase 1.
 * Shape matches the normalized state model from master-plan-kanban-board.md §6.1.
 * This will be replaced with useReducer + Context in Fase 2.
 */
export const dummyState = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Setup ESLint dan Prettier',
      description: 'Konfigurasi linting dan format otomatis untuk menjaga konsistensi kode.',
      priority: 'high',
      dueDate: null,
      labels: ['setup'],
      createdAt: '2026-10-01T08:00:00.000Z',
    },
    'task-2': {
      id: 'task-2',
      title: 'Desain sistem warna dan token',
      description: 'Tentukan palet, radius, shadow, dan font-stack sebelum komponen apapun disentuh.',
      priority: 'high',
      dueDate: '2026-10-10T00:00:00.000Z',
      labels: ['desain', 'css'],
      createdAt: '2026-10-02T08:00:00.000Z',
    },
    'task-3': {
      id: 'task-3',
      title: 'Buat komponen Button dan Badge',
      description: null,
      priority: 'medium',
      dueDate: null,
      labels: ['ui'],
      createdAt: '2026-10-03T08:00:00.000Z',
    },
    'task-4': {
      id: 'task-4',
      title: 'Implementasi komponen Modal',
      description: 'Perlu focus trap dan tutup via Esc agar aksesibel.',
      priority: 'medium',
      dueDate: '2026-10-12T00:00:00.000Z',
      labels: ['ui', 'a11y'],
      createdAt: '2026-10-03T09:00:00.000Z',
    },
    'task-5': {
      id: 'task-5',
      title: 'Buat komponen TaskCard',
      description: null,
      priority: 'medium',
      dueDate: null,
      labels: ['board'],
      createdAt: '2026-10-04T08:00:00.000Z',
    },
    'task-6': {
      id: 'task-6',
      title: 'Integrasi Tailwind CSS v4',
      description: 'Aktifkan via @tailwindcss/vite plugin di vite.config.js.',
      priority: 'low',
      dueDate: null,
      labels: ['setup'],
      createdAt: '2026-10-04T10:00:00.000Z',
    },
    'task-7': {
      id: 'task-7',
      title: 'Baca dokumentasi dnd-kit',
      description: null,
      priority: 'low',
      dueDate: '2026-10-08T00:00:00.000Z',
      labels: ['drag-drop'],
      createdAt: '2026-10-01T07:00:00.000Z',
    },
    'task-8': {
      id: 'task-8',
      title: 'Setup repo GitHub',
      description: 'Branch utama: main. Buat branch feature/fase-1.',
      priority: null,
      dueDate: null,
      labels: [],
      createdAt: '2026-09-30T08:00:00.000Z',
    },
  },
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: ['task-3', 'task-4', 'task-5'],
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-6', 'task-7', 'task-8'],
    },
  },
  columnOrder: ['todo', 'in-progress', 'done'],
}
