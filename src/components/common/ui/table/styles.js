import clsx from 'clsx';

export const table = clsx(['min-w-full', 'divide-y', 'divide-gray-200']);
export const thead = clsx(['bg-gray-50']);
export const th = clsx(['px-6', 'py-3', 'text-left', 'text-xs', 'font-medium', 'text-gray-500', 'uppercase', 'tracking-wider']);
export const th_last = clsx(['relative', 'px-6 py-3']);
export const tbody = clsx(['bg-white', 'divide-y', 'divide-gray-200'])
export const td = clsx(['px-6', 'py-4', 'whitespace-nowrap', 'text-sm']);
export const td_last = clsx(['px-6', 'py-4', 'whitespace-nowrap', 'text-right', 'text-sm', 'font-medium']);
export const op_link = clsx(['text-indigo-600', 'hover:text-indigo-900']);