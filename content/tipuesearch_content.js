var tipuesearch = {"pages": [{'title': 'About', 'text': '團員:41023125 41023128 \n 倉儲: https://github.com/mdecd2023/2a-pj1ag4/ \n 網站: https://mdecd2023.github.io/2a-pj1ag4/ \n', 'tags': '', 'url': 'About.html'}, {'title': 'w3', 'text': 'w3 - 2023.03.10.16 已經完成分組網頁者, 可以得到分組網頁評分 \n w3 - 請各組寫一個程式判定 2a 哪一組已經完成網頁建置. \n w3 開始執行 \xa0 https://mde.tw/pjcopsim/content/bubbleRobTutorial.html \n 星期四補課時間, 要驗收 Tutorial1 (心得, 展示頁面說明各組員所完成項目, 說明該組的專案規劃) \n \n \n \n \xa0 \n 編寫檢查網頁建置程式 : cmsimde_site (mdecd2023.github.io) \n', 'tags': '', 'url': 'w3.html'}, {'title': 'w5', 'text': '3/24 完成將bubbleRob 雙輪車調整成手動模式 \n 利用awsd鍵進行移動 \n 觸發特定條件使 bubbleRob 雙輪車 回到原位 \n \n 待解決問題: \n 記分板製作 \n 足球框製作 \n 足球製作 \n 觸發條件設定製作 \n 連機問題 \n \n \n 3/25 完成足球製作以及 觸發條件設定製作 \n 使球觸碰到球門的感測器後重製球場 \n \n 待解決問題: \n 增設另一邊的感測器 \n 設定感測器只感測球 \n 記分板製作 \n 連機問題 \n 球大小調整 \n 不適合推球的問題 \n 刪除多餘程式 \n \n \n \n 3/26 增加放開鍵盤會停止、倒數計時、記分板 \n 增加放開鍵盤一段時間後會將速度設為0直到按下鍵盤 \n \n 增加倒數計時與分數的面板 \n 開始後開始倒數計時 \n 時間到則結束 \n \n 兩邊感測與計算皆完成 \n \n 待解決問題: \n 連機問題 \n 球大小調整 \n 設定感測器只感測球(如果將bubbleRob被感測關掉可以直接解決) \n bubbleRob-time -score.ttt', 'tags': '', 'url': 'w5.html'}, {'title': 'Tutorial1', 'text': '\n \n \n \n bubbleRob本體 \n slider \n wheels \n 程式解析 \n 心得: \n \xa041023125: \n \xa0一開始編 寫一個程式判定 2a 哪一組已經完成網頁建置的作業中 \n \xa0最初始使用python中的 requests與 lxml模組編寫出\xa0 checkpy.txt \n \xa0之後將其導入Brython發現出現錯誤ModuleNotFoundError: requests \n \xa0發現 brython 中沒有  requests  模組 \n \xa0之後多次嘗試後參考 https://mdecd2023.github.io/2a-pj1agx/content/2apj1.html \xa0 \n \xa0提取出來網站網址與倉儲網址且檢查網站是否建立完成且只列出字串 \n \xa0做出 check.txt \xa0並將每段程式添加了註解\xa0 \n \xa0製作BubbleRob tutorial學到了 感測器的組裝 \n \xa0在CoppeliaSim中的python程式中 \n \xa0發現程式中的許多元件如左右馬達、感測器、畫面等都是 CoppeliaSim 中的物件，而程式中的\xa0 \n \xa0sysCall_init、sysCall_sensing、sysCall_actuation、sysCall_cleanup 等則是 CoppeliaSim 定義好 \n \xa0的 callback function，當特定事件發生時 CoppeliaSim 會呼叫相對應的 callback function 來執行特定 \n \xa0的操作，例如 sysCall_actuation 則是當 CoppeliaSim 模擬器處理 actuation 時會被呼叫的 callback \n \xa0function。 \n \xa0透過這個程式範例，可以學習到 CoppeliaSim 中如何透過程式操控模擬器中的物件，以及如何透過\xa0 \xa0callback function 執行特定操作的方法 \n \xa0雖然還是不太熟悉 \n \xa0但至少能稍微理解 \n', 'tags': '', 'url': 'Tutorial1.html'}, {'title': '程式解析', 'text': 'function speedChange_callback(ui,id,newVal)\n    speed=minMaxSpeed[1]+(minMaxSpeed[2]-minMaxSpeed[1])*newVal/100\nend\n  \nfunction sysCall_init()\n    -- This is executed exactly once, the first time this script is executed\n    bubbleRobBase=sim.getObject(\'.\') -- this is bubbleRob\'s handle\n    leftMotor=sim.getObject("./leftMotor") -- Handle of the left motor\n    rightMotor=sim.getObject("./rightMotor") -- Handle of the right motor\n    noseSensor=sim.getObject("./sensingNose") -- Handle of the proximity sensor\n    minMaxSpeed={50*math.pi/180,300*math.pi/180} -- Min and max speeds for each motor\n    backUntilTime=-1 -- Tells whether bubbleRob is in forward or backward mode\n    robotCollection=sim.createCollection(0)\n    sim.addItemToCollection(robotCollection,sim.handle_tree,bubbleRobBase,0)\n    distanceSegment=sim.addDrawingObject(sim.drawing_lines,4,0,-1,1,{0,1,0})\n    robotTrace=sim.addDrawingObject(sim.drawing_linestrip+sim.drawing_cyclic,2,0,-1,200,{1,1,0})\n    graph=sim.getObject(\'./graph\')\n    distStream=sim.addGraphStream(graph,\'bubbleRob clearance\',\'m\',0,{1,0,0})\n    -- Create the custom UI:\n        xml = \'<ui title="\'..sim.getObjectAlias(bubbleRobBase,1)..\' speed" closeable="false" resizeable="false" activate="false">\'..[[\n        <hslider minimum="0" maximum="100" onchange="speedChange_callback" id="1"/>\n        <label text="" style="* {margin-left: 300px;}"/>\n        </ui>\n        ]]\n    ui=simUI.create(xml)\n    speed=(minMaxSpeed[1]+minMaxSpeed[2])*0.5\n    simUI.setSliderValue(ui,1,100*(speed-minMaxSpeed[1])/(minMaxSpeed[2]-minMaxSpeed[1]))\nend\n  \nfunction sysCall_sensing()\n    local result,distData=sim.checkDistance(robotCollection,sim.handle_all)\n    if result>0 then\n        sim.addDrawingObjectItem(distanceSegment,nil)\n        sim.addDrawingObjectItem(distanceSegment,distData)\n        sim.setGraphStreamValue(graph,distStream,distData[7])\n    end\n    local p=sim.getObjectPosition(bubbleRobBase,-1)\n    sim.addDrawingObjectItem(robotTrace,p)\nend\n  \nfunction sysCall_actuation()\n    result=sim.readProximitySensor(noseSensor) -- Read the proximity sensor\n    -- If we detected something, we set the backward mode:\n    if (result>0) then backUntilTime=sim.getSimulationTime()+4 end\n  \n    if (backUntilTime<sim.getSimulationTime()) then\n        -- When in forward mode, we simply move forward at the desired speed\n        sim.setJointTargetVelocity(leftMotor,speed)\n        sim.setJointTargetVelocity(rightMotor,speed)\n    else\n        -- When in backward mode, we simply backup in a curve at reduced speed\n        sim.setJointTargetVelocity(leftMotor,-speed/2)\n        sim.setJointTargetVelocity(rightMotor,-speed/8)\n    end\nend\n  \nfunction sysCall_cleanup()\n    simUI.destroy(ui)\nend \n 此為一段 Lua 腳本程式碼，用於控制 BubbleRob 模型在 V-REP 模擬環境中的行為。程式碼主要由四個函數組成：sysCall_init()、sysCall_sensing()、sysCall_actuation()、sysCall_cleanup()。 \n sysCall_init() 函數在程式一開始執行時被呼叫，主要用來初始化 BubbleRob 模型與 UI 介面。其中包括了建立 BubbleRob 模型的各種物件、建立畫布物件用來繪製 BubbleRob 移動的軌跡、建立 UI 介面等。 \n sysCall_sensing() 函數用於定期檢查 BubbleRob 前方是否有障礙物，若有則繪製出距離 BubbleRob 的距離測量值，同時也會繪製出 BubbleRob 移動的軌跡。 \n sysCall_actuation() 函數則用於根據 BubbleRob 的前方是否有障礙物來控制 BubbleRob 的移動。若前方無障礙物，則直接以固定速度向前移動；若前方有障礙物，則 BubbleRob 會以較慢的速度向後退，並且向右彎曲以避開障礙物。 \n sysCall_cleanup() 函數則在程式結束時被呼叫，主要用來清除創建的 UI 介面。 \n \n', 'tags': '', 'url': '程式解析.html'}, {'title': 'coppeliasim lua', 'text': "sim.getObject('.') \n \xa0 \n sim.getObject('.') 的作用是獲取當前對象的句柄。在CoppeliaSim的Lua腳本中，'.' 表示當前腳本所屬的對象，因此 sim.getObject('.') 會返回當前腳本的句柄。 \n sim.createCollection(0) \n sim.createCollection(0) 的作用是創建一個新的對象集合，並返回該對象集合的句柄。參數0指定了創建的對象集合是空的。 \n sim.addItemToCollection(robotCollection,sim.handle_tree,bubbleRobBase,0) \n sim.addItemToCollection(robotCollection, sim.handle_tree, bubbleRobBase, 0) 的作用是將物體添加到指定的物體集合中。其中，robotCollection 是物體集合的句柄，sim.handle_tree 指定添加物體的關係類型，bubbleRobBase 是要添加的物體的句柄，0 表示不遞歸添加。該函數執行後，bubbleRobBase 將被添加到 robotCollection 物體集合中。 \n sysCall_actuation() \n sysCall_actuation()是CoppeliaSim Lua脚本中的一個函數，它是一個回調函數，會在每個仿真步驟中自動被調用。在這個函數中，你可以實現你的控制演算法，使得機器人可以移動、感知環境等等。通常，這個函數中會包含循環，來使得機器人可以持續執行控制演算法。 \n sim.message_keypress \n sim.message_keypress表示當用戶按下一個鍵時觸發的事件 \n", 'tags': '', 'url': 'coppeliasim lua.html'}, {'title': 'notes', 'text': '', 'tags': '', 'url': 'notes.html'}, {'title': '可攜程式研究', 'text': '', 'tags': '', 'url': '可攜程式研究.html'}, {'title': 'cms', 'text': '#! /bin/bash\n# for Linux and Mac\npython3 cmsimde/wsgi.py \n 啟動wsgi.py \n 在前面可以加入 \n @echo off\nREM 關閉命令行窗口的回顯\nstart https://127.0.0.1:9443/\nREM 啟動默認瀏覽器並打開指定網址\n\n \n \n \n 能在執行CMS開啟 wsgi.py的同時將要開啟的網頁打開', 'tags': '', 'url': 'cms.html'}, {'title': 'wsgi.py', 'text': '#!/usr/bin/python\n\n"""\nFlask startup script\n"""\n\nimport sys\nimport os\n\n# 將目前檔案所在的目錄加到 Python 搜尋模組的路徑中\nsys.path.append(os.path.join(os.path.dirname(__file__)))\n\n# 載入 flaskapp 模組\nimport flaskapp\n\n# 讀取 flaskapp 模組中的變數值\nuwsgi = flaskapp.uwsgi\nip = flaskapp.ip\nport = flaskapp.dynamic_port\n\nif uwsgi:\n    # 在遠端執行\n    application = flaskapp.app\nelse:\n    # 在本地端執行，開啟 Flask 網路伺服器\n    flaskapp.app.run(\n        host=ip,        # 網路伺服器的 IP 位置\n        port=port,      # 網路伺服器的埠口號碼\n        debug=True,     # 啟用除錯模式\n        ssl_context="adhoc"     # 使用自簽憑證啟用 SSL 加密連線\n    )\n \n flaskapp.py', 'tags': '', 'url': 'wsgi.py.html'}, {'title': 'flaskapp.py', 'text': '', 'tags': '', 'url': 'flaskapp.py.html'}, {'title': 'check', 'text': ' 導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["py_src"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  印出版次與關鍵字程式  \n \n \n \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  Filename:  .py    存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n \n \n', 'tags': '', 'url': 'check.html'}, {'title': '相關網站', 'text': 'pjcopsim (mde.tw) \n CoppeliaSim User Manual (coppeliarobotics.com) \n chatGTP \n cp2021 homework site (41023125.github.io) \n exam.cycu.org', 'tags': '', 'url': '相關網站.html'}]};