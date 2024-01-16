import requests

url = "https://gmail.googleapis.com/gmail/v1/users/phitesh2023@gmail.com/messages"

payload = {}
headers = {
  'Authorization': 'Bearer ya29.a0AfB_byCiqsE-BsKRVVrvHncxlfwBLKDdo6z11OngfPr0wzgqmuTitmXUwS8vlUkoIega8qlNdTp-9CTdyWc1CCXlB6VzHLKF-QRmJqpXbSnGNqLbbT5LiYkryDH6LMo7QxVFIsDB2QeTNuCshG7iIqe-F6UFfZ4r15MNaCgYKAZ8SARESFQHGX2MibUe7JNHcx5_dfTjuzTui2g0171'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
