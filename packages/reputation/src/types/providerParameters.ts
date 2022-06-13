export type TwitterParameters = {
    followers?: number
    botometerOverallScore?: number
    verifiedProfile?: boolean
}

export type GithubParameters = {
    followers?: number
    receivedStars?: number
    proPlan?: boolean
}

export type RedditParameters = {
    premiumSubscription?: boolean
    karma?: number
    coins?: number
    linkedIdentities?: number
}

export type StackOverflowParameters = {
    reputation?: number
}

export type ProviderParameters = TwitterParameters | GithubParameters | RedditParameters | StackOverflowParameters
