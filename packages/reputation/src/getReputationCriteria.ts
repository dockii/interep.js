import githubCriteria from "./criteria/github"
import redditCriteria from "./criteria/reddit"
import twitterCriteria from "./criteria/twitter"
import stackOverflowCriteria from "./criteria/stackoverflow"
import { ReputationCriteria, OAuthProvider } from "./types/criteria"

/**
 * Returns the criteria used for a provider.
 * @param provider The provider.
 * @returns The provider criteria.
 */
export default function getReputationCriteria(provider: OAuthProvider): ReputationCriteria {
    switch (provider) {
        case OAuthProvider.TWITTER:
            return twitterCriteria
        case OAuthProvider.GITHUB:
            return githubCriteria
        case OAuthProvider.REDDIT:
            return redditCriteria
        case OAuthProvider.STACKOVERFLOW:
            return stackOverflowCriteria
        default:
            throw new Error(`Provider '${provider}' is not supported`)
    }
}
