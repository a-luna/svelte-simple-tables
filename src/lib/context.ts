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

function initTableState<R>(tableState: TableState<R>): TableState<R> {
	const key = `${get(tableState).tableId}-state`;
	return setService<TableState<R>>(key, tableState);
}

function initTableSize<R>(tableState: TableState<R>): Readable<ComponentWidth> {
	const key = `${get(tableState).tableId}-size`;
	const tableSize = createComponentWidthStore<R>(tableState);
	return setService<Readable<ComponentWidth>>(key, tableSize);
}

export function initTableStores<R>(tableState: TableState<R>): [TableState<R>, Readable<ComponentWidth>] {
	return [initTableState<R>(tableState), initTableSize<R>(tableState)];
}

export function getTableState<R>(tableId: string): TableState<R> {
	const key = `${tableId}-state`;
	return getService<TableState<R>>(key)();
}

export function getTableSize(tableId: string): Readable<ComponentWidth> {
	const key = `${tableId}-size`;
	return getService<Readable<ComponentWidth>>(key)();
}
