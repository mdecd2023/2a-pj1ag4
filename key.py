import configparser

# 開啟並讀取.git/config檔案
config = configparser.ConfigParser()
config.read('.git/config')

# 讀取key檔案的值
with open('C:\\Users\\alin\\Downloads\\key.txt', 'r') as keyfile:
    special_word = keyfile.read().strip()

# 讀取url設定的值
url = config.get('remote "origin"', 'url')

# 找到原有的子字符串，删除它并在其之前添加新字符串
start = url.find('https://')
end = url.rfind('github.com')
new_url = url[:start] + 'https://' + special_word + '@'  + url[end:]

# 更新url設定的值
config.set('remote "origin"', 'url', new_url)

# 將更新後的.git/config檔案寫入
with open('.git/config', 'w') as configfile:
    config.write(configfile)