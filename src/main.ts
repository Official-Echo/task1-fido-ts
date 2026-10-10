#!/usr/bin/env node
import { createInterface } from "node:readline";
import { Command, InvalidArgumentError } from "commander";
import { Node, getTwoThirdsNode } from "./index.ts";

const ARROW = /\-\>/;

function parseInput(input: string): string[] {
	const text = input.trim();
	if (text === "") {
		throw new InvalidArgumentError("no input");
	}

	if (/^\d+$/.test(text)) {
		const n = Number(text);
		return Array.from({ length: n }, (_, i) => String(i));
	}

	if (!ARROW.test(text)) {
		throw new InvalidArgumentError("expected a number or values separated by '->'");
	}

	const values = text.split(ARROW).map((value) => value.trim());
	if (values.includes("")) {
		throw new InvalidArgumentError("empty value between arrows");
	}
	return values;
}

async function readLine(prompt: string): Promise<string> {
	process.stdout.write(prompt);
	const rl = createInterface({ input: process.stdin });
	for await (const line of rl) {
		rl.close();
		return line;
	}
	return "";
}

const program = new Command()
	.name("node-task")
	.description("")
	.argument(
		"[input]",
		"",
		parseInput,
	)
	.action(async (values: string[] | undefined) => {
		if (values === undefined) {
			try {
				values = parseInput(await readLine("n or a -> b -> c: "));
			} catch (e) {
				if (e instanceof InvalidArgumentError) {
					program.error(`error: ${e.message}`);
				}
				throw e;
			}
		}

		const head = values.reduceRight<Node<string> | null>(
			(next, data) => new Node(data, next),
			null,
		);

		console.log(getTwoThirdsNode(head)?.data ?? "null");
	})
	.addHelpText(
		"before",
		`Usage: node-task <n | "a -> b -> c">
  n            list of n nodes with data 0..n-1
  a -> b -> c  list of the given values. Use quotes to write since > redirects in shell
  (no args)    input is read from the console

`,
	);

await program.parseAsync();