
module.exports = {
    votes: votes => {
        return votes.reduce((result, voteHeader) => {
            result.push({
                "voteId": voteHeader["VoteId"],
                "voteProtocolNo": voteHeader["VoteProtocolNo"],
                "voteDate": voteHeader["VoteDate"],
                "voteType": voteHeader["VoteType"],
                "itemTitle": voteHeader["ItemTitle"],
                "knessetId": voteHeader["KnessetId"],
                "sessionId": voteHeader["SessionId"]
            });
            return result;
        }, []);
    }
}