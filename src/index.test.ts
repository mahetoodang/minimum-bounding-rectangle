import { describe, expect, it } from 'vitest';
import { findMinBoundingRect } from './index';

describe('findMinBoundingRect', () => {
	it('should return a bounding box for a simple square polygon', () => {
		const polygon: [number, number][] = [
			[0, 0],
			[1, 0],
			[1, 1],
			[0, 1],
		];
		const bbox = findMinBoundingRect(polygon);
		expect(bbox.length).toEqual(5);
		expect(bbox[0][0]).toEqual(bbox[4][0]);
		expect(bbox[0][1]).toEqual(bbox[4][1]);
	});

	it('should return a bounding box for a simple convex polygon', () => {
		const polygon: [number, number][] = [
			[0, 0],
			[1, 0],
			[1, 0.5],
			[0.5, 0.5],
			[0.5, 1],
			[0, 1],
		];
		const bbox = findMinBoundingRect(polygon);
		expect(bbox.length).toEqual(5);

		const xValues = bbox.map((point) => point[0]);
		expect(Math.min(...xValues)).toBeCloseTo(0, 6);
		expect(Math.max(...xValues)).toBeCloseTo(1, 6);

		const yValues = bbox.map((point) => point[1]);
		expect(Math.min(...yValues)).toBeCloseTo(0, 6);
		expect(Math.max(...yValues)).toBeCloseTo(1, 6);

		expect(bbox[0][0]).toEqual(bbox[4][0]);
		expect(bbox[0][1]).toEqual(bbox[4][1]);
	});

	it('should return a bounding box for a polygon', () => {
		const polygon: [number, number][] = [
			[2.3, 4.7],
			[5.1, 3.2],
			[7.6, 6.9],
			[6.4, 9.2],
			[3.8, 8.1],
			[1.2, 6.4],
		];
		const bbox = findMinBoundingRect(polygon);
		expect(bbox.length).toEqual(5);

		const xValues = bbox.map((point) => point[0]);
		expect(Math.min(...xValues)).toBeCloseTo(1.191, 2);
		expect(Math.max(...xValues)).toBeCloseTo(8.758, 2);

		const yValues = bbox.map((point) => point[1]);
		expect(Math.min(...yValues)).toBeCloseTo(2.366, 2);
		expect(Math.max(...yValues)).toBeCloseTo(9.62, 2);

		expect(bbox[0][0]).toEqual(bbox[4][0]);
		expect(bbox[0][1]).toEqual(bbox[4][1]);
	});
});
