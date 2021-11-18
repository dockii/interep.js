import { poseidon } from "circomlibjs"
import { MerkleTree } from "../src"

describe("InterRep Merkle Tree", () => {
    const depth = 16

    let tree: MerkleTree

    describe("Merkle Tree class", () => {
        beforeEach(() => {
            tree = new MerkleTree(poseidon, depth)
        })

        it("Should not initialize a Merkle tree with depth > 32", () => {
            const fun = () => new MerkleTree(poseidon, 33, BigInt(0))

            expect(fun).toThrow("The tree depth must be between 1 and 32")
        })

        it("Should initialize a Merkle tree", () => {
            expect(tree.depth).toEqual(depth)
            expect(tree.root).toEqual(
                BigInt("19217088683336594659449020493828377907203207941212636669271704950158751593251")
            )
            expect(tree.nodes[0]).toHaveLength(0)
            expect(tree.zeroes).toHaveLength(depth)
        })

        it("Should not insert a zero leaf", () => {
            const fun = () => tree.insert(BigInt(0))

            expect(fun).toThrow("The leaf cannot be a zero value")
        })

        it("Should not insert a leaf in a full tree", () => {
            const fullTree = new MerkleTree(poseidon, 1)

            fullTree.insert(BigInt(1))
            fullTree.insert(BigInt(2))

            const fun = () => fullTree.insert(BigInt(3))

            expect(fun).toThrow("The tree is full")
        })

        it("Should insert a leaf", () => {
            tree.insert(BigInt(1))

            expect(tree.root).toEqual(
                BigInt("16211261537006706331557500769845541584780950636316907182067421710925347020533")
            )
            expect(tree.nodes[0]).toHaveLength(1)
        })

        it("Should not delete a leaf that does not exist", () => {
            const fun = () => tree.delete(0)

            expect(fun).toThrow("The leaf does not exist in this tree")
        })

        it("Should delete a leaf", () => {
            tree.insert(BigInt(1))

            tree.delete(0)

            expect(tree.root).toEqual(
                BigInt("19217088683336594659449020493828377907203207941212636669271704950158751593251")
            )
            expect(tree.nodes[0][0]).toEqual(BigInt(0))
        })

        it("Should delete all the leaves of a tree", () => {
            tree.insert(BigInt(1))
            tree.insert(BigInt(2))
            tree.insert(BigInt(3))

            tree.delete(0)
            tree.delete(1)
            tree.delete(2)

            expect(tree.root).toEqual(
                BigInt("19217088683336594659449020493828377907203207941212636669271704950158751593251")
            )
        })

        it("Should return the index of a leaf", () => {
            tree.insert(BigInt(1))
            tree.insert(BigInt(2))

            const index = tree.indexOf(BigInt(2))

            expect(index).toEqual(1)
        })

        it("Should not create any proof if the leaf does not exist", () => {
            tree.insert(BigInt(1))

            const fun = () => tree.createProof(1)

            expect(fun).toThrow("The leaf does not exist in this tree")
        })

        it("Should create a valid proof", () => {
            tree.insert(BigInt(1))
            tree.insert(BigInt(2))
            tree.insert(BigInt(3))
            tree.insert(BigInt(4))
            tree.insert(BigInt(5))

            tree.delete(0)
            tree.delete(2)

            for (let i = 0; i < 5; i += 1) {
                const proof = tree.createProof(i)

                expect(tree.verifyProof(proof)).toBeTruthy()
            }
        })
    })
})
