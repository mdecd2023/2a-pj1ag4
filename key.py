import configparser

# 開啟並讀取.git/config檔案
config = configparser.ConfigParser()
config.read('.git/config')

# 讀取url設定的值
url = config.get('remote "origin"', 'url')

# 在url前面加上特定字
special_word = "https://"+"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"+"@"+"github.com"
new_url = special_word + url.split('github.com')[1]

# 更新url設定的值
config.set('remote "origin"', 'url', new_url)

# 將更新後的.git/config檔案寫入
with open('.git/config', 'w') as configfile:
    config.write(configfile)
