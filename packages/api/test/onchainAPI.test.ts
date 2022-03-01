import { OnchainAPI } from "../src"
import request from "../src/request"

jest.mock("../src/request", () => ({
    __esModule: true,
    default: jest.fn()
}))

const requestMocked = request as jest.MockedFunction<typeof request>

describe("Interep onchain API", () => {
    let api: OnchainAPI

    describe("API class", () => {
        it("Should return an api object", () => {
            api = new OnchainAPI()

            expect(api.url).toEqual("https://api.thegraph.com/subgraphs/name/interep-project/interep-groups-kovan")
        })
    })

    describe("Get groups", () => {
        it("Should return all the existing groups", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve({
                    onchainGroups: [
                        {
                            id: "1",
                            depth: 20,
                            size: 2,
                            numberOfLeaves: 2,
                            root: "2",
                            admin: "0x7bcd6f009471e9974a77086a69289d16eadba286"
                        }
                    ]
                })
            )

            const expectedValue = await api.getGroups()

            expect(expectedValue).not.toBeUndefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual({
                id: "1",
                depth: 20,
                size: 2,
                numberOfLeaves: 2,
                root: "2",
                admin: "0x7bcd6f009471e9974a77086a69289d16eadba286"
            })
        })
    })

    describe("Get group", () => {
        it("Should return a specific group", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve({
                    onchainGroups: [
                        {
                            id: "1",
                            depth: 20,
                            size: 2,
                            numberOfLeaves: 2,
                            root: "2",
                            admin: "0x7bcd6f009471e9974a77086a69289d16eadba286"
                        }
                    ]
                })
            )

            const expectedValue = await api.getGroup({
                id: "1"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(expectedValue).toEqual({
                id: "1",
                depth: 20,
                size: 2,
                numberOfLeaves: 2,
                root: "2",
                admin: "0x7bcd6f009471e9974a77086a69289d16eadba286"
            })
        })
    })

    describe("Get members", () => {
        it("Should get the members of a group", async () => {
            requestMocked.mockImplementationOnce(() =>
                Promise.resolve({
                    members: [
                        {
                            id: "0x1",
                            identityCommitment: "1",
                            index: 0
                        },
                        {
                            id: "0x2",
                            identityCommitment: "2",
                            index: 1
                        }
                    ]
                })
            )

            const expectedValue = await api.getMembers({
                groupId: "1"
            })

            expect(expectedValue).not.toBeUndefined()
            expect(Array.isArray(expectedValue)).toBeTruthy()
            expect(expectedValue).toContainEqual({
                id: "0x1",
                identityCommitment: "1",
                index: 0
            })
        })
    })
})