import { createComponentWidthStore } from '$lib/stores';
import type { ComponentWidth, TableState } from '$lib/types';
import { getContext, setContext } from 'svelte';
import type { Readable } from 'svelte/store';
import { get } from 'svelte/store';

function setService<T>(key: string, service: T): T {
	setContext(key, service);
	return service;
}

function getService<T>(key: string): () => T {
	return () => getContext(key);
}

export function initTableState(tableState: TableState): TableState {
	const key = `${get(tableState).tableId}-state`;
	return setService<TableState>(key, tableState);
}

export function getTableState(tableId: string): TableState {
	const key = `${tableId}-state`;
	return getService<TableState>(key)();
}

export function initTableSize(tableState: TableState): Readable<ComponentWidth> {
	const key = `${get(tableState).tableId}-size`;
	const tableSize = createComponentWidthStore(tableState);
	return setService<Readable<ComponentWidth>>(key, tableSize);
}

export function getTableSize(tableId: string): Readable<ComponentWidth> {
	const key = `${tableId}-size`;
	return getService<Readable<ComponentWidth>>(key)();
}
