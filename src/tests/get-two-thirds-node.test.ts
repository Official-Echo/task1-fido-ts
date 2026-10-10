import { describe, expect, it } from "vitest";
import { Node, getTwoThirdsNode } from "../index.ts";

describe("getTwoThirdsNode", () => {
	it("returns null for an empty list", () => {
		expect(getTwoThirdsNode(null)).toBeNull();
	});

	it("returns null for a single node", () => {
		expect(getTwoThirdsNode(new Node(0))).toBeNull();
	});

	it("returns index 0 for two nodes", () => {
		const head = new Node(0, new Node(1));

		expect(getTwoThirdsNode(head)?.data).toBe(0);
	});

	it("task example: three nodes return 1", () => {
		const head = new Node(0, new Node(1, new Node(2)));

		expect(getTwoThirdsNode(head)?.data).toBe(1);
	});

	it("task example: four nodes return 1", () => {
		const head = new Node(0, new Node(1, new Node(2, new Node(3))));

		expect(getTwoThirdsNode(head)?.data).toBe(1);
	});

	it("task example: five nodes return 2", () => {
		const head = new Node(0, new Node(1, new Node(2, new Node(3, new Node(4)))));

		expect(getTwoThirdsNode(head)?.data).toBe(2);
	});

	it("returns the node itself, not a copy", () => {
		const head = new Node(0, new Node(1, new Node(2, new Node(3, new Node(4)))));

		expect(getTwoThirdsNode(head)).toBe(head.next?.next);
	});

	it("never returns the head for three or more nodes", () => {
		const head = new Node(0, new Node(1, new Node(2)));

		expect(getTwoThirdsNode(head)).not.toBe(head);
	});

	it("never returns the last node", () => {
		const last = new Node(4);
		const head = new Node(0, new Node(1, new Node(2, new Node(3, last))));

		expect(getTwoThirdsNode(head)).not.toBe(last);
	});

	it("does not modify the list", () => {
		const head = new Node(0, new Node(1, new Node(2, new Node(3, new Node(4)))));

		getTwoThirdsNode(head);

		expect(head).toEqual(
			new Node(0, new Node(1, new Node(2, new Node(3, new Node(4))))),
		);
	});

	it("returns the same result when called repeatedly", () => {
		const head = new Node(0, new Node(1, new Node(2, new Node(3))));

		expect(getTwoThirdsNode(head)).toBe(getTwoThirdsNode(head));
	});

	it("works with string data", () => {
		const head = new Node("a", new Node("b", new Node("c")));

		expect(getTwoThirdsNode(head)?.data).toBe("b");
	});

	it("works with object data", () => {
		const head = new Node({ id: 1 }, new Node({ id: 2 }, new Node({ id: 3 })));

		expect(getTwoThirdsNode(head)?.data).toEqual({ id: 2 });
	});

	it("works with undefined and null data", () => {
		const head = new Node<number | null | undefined>(undefined, new Node(null, new Node(0)));

		expect(getTwoThirdsNode(head)?.data).toBeNull();
	});

	it.each([
		[100, 65],
		[1000, 665],
		[100_000, 66_665],
	])("large list of %i nodes returns %i", (n, expected) => {
		const head = Array.from({ length: n }, (_, i) => i).reduceRight<Node<number> | null>(
			(next, data) => new Node(data, next),
			null,
		);

		expect(getTwoThirdsNode(head)?.data).toBe(expected);
	});

	it.each(Array.from({ length: 99 }, (_, i) => i + 2))(
		"range sweep: n = %i returns floor(2n / 3) - 1",
		(n) => {
			const head = Array.from({ length: n }, (_, i) => i).reduceRight<Node<number> | null>(
				(next, data) => new Node(data, next),
				null,
			);

			expect(getTwoThirdsNode(head)?.data).toBe(Math.floor((2 * n) / 3) - 1);
		},
	);
});