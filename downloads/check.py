import requests
from lxml import html


def check_xpath(url):
    xpath = "/html/body/div/h1[2]"
    response = requests.get(url)
    tree = html.fromstring(response.content)
    result = tree.xpath(xpath)
    if len(result) > 0:
        print(f"{url} 網站未建立")
    elif len(tree.xpath("/html/body/div")):
        print(f"{url} 錯誤")
    '''
    else:
        print(f"{url} 正常")
    '''


for i in range(1, 21):
    check_xpath("https://mdecd2023.github.io/2a-pj1ag"+str(i)+"/")
