import { describe, expect, it } from "vitest";
import { Node } from "../index.ts";

describe("Node", () => {
	it("creates a leaf node", () => {
		const node = new Node(42);

		expect(node.data).toBe(42);
		expect(node.next).toBeNull();
	});

	it("links two nodes", () => {
		const head = new Node(10, new Node(20));

		expect(head.data).toBe(10);
		expect(head.next?.data).toBe(20);
		expect(head.next?.next).toBeNull();
	});

	it("chains multiple nodes", () => {
		const head = new Node(1, new Node(2, new Node(3)));

		expect(head.data).toBe(1);
		expect(head.next?.data).toBe(2);
		expect(head.next?.next?.data).toBe(3);
		expect(head.next?.next?.next).toBeNull();
	});

	it("works with non-primitive types", () => {
		const head = new Node("alpha", new Node("beta"));

		expect(head.data).toBe("alpha");
		expect(head.next?.data).toBe("beta");
	});

	it("allows in-place mutation", () => {
		const node = new Node(10);
		node.data = 99;
		node.next = new Node(100);

		expect(node.data).toBe(99);
		expect(node.next.data).toBe(100);
	});

	it("can be traversed link by link", () => {
		const head = new Node(1, new Node(2, new Node(3)));

		const first = head.next;
		expect(first?.data).toBe(2);

		const second = first?.next;
		expect(second?.data).toBe(3);

		expect(second?.next).toBeNull();
	});
});