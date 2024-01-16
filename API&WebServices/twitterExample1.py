import tweepy

ak = 'UVCX7EfWicb2FPWiwSPoT51tw'

aks = 'NQ0kBjsNgte7BK1QjCL3hDWKyutPiioQD19ro9egp9lrmFyoBr'

at = '1746859804939976704-prpBXuUSrUhroaZEiTItavlyQTI7as'


ats = '5meYfirgACuNBNj36nQAJXo6mWu9w4Itgp6fe0FfCb5gr'

def OAuth():
    try:
        auth = tweepy.OAuthHandler(ak,aks)
        auth.set_access_token(at, ats)
        return auth
    except Exception as e:
            return none
            
oauth = OAuth()
apicall = tweepy.API(oauth)
apicall.update_status("Here is sample Tweet.")
print('Tweet created')