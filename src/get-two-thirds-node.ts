import type { Node } from "./node.ts";

export function getTwoThirdsNode<T>(head: Node<T> | null): Node<T> | null {
	if (head?.next == null) {
		return null;
	}

	let res = head;
	let len = 2;
	let curr = head.next.next;

	while (curr !== null) {
		len++;

		if (len % 3 !== 1) {
			res = res.next!;
		}
		curr = curr.next;
	}

	return res;
}
