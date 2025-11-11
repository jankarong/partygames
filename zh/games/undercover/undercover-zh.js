let gameState = {
    players: [],
    currentPlayer: 0,
    civilianWord: '',
    undercoverWord: '',
    eliminatedPlayers: new Set(),
    selectedCategories: ['食物饮品', '动物', '物品', '职业角色', '娱乐', '自然天气', '搞笑'],
    premiumCategories: ['运动健身', '科技数码', '旅行地点', '情感关系', '品牌名称', '历史人物'],
    wordsByCategory: {
        '食物饮品': [
            ['披萨', '汉堡'],
            ['咖啡', '茶'],
            ['可乐', '果汁'],
            ['苹果', '橙子'],
            ['巧克力', '糖果'],
            ['辣椒酱', '番茄酱'],
            ['马芬', '纸杯蛋糕'],
            ['面包', '吐司'],
            ['牛奶', '奶油'],
            ['冰淇淋', '蛋糕'],
            ['培根', '火腿'],
            ['汤', '沙拉'],
            ['饼干', '布朗尼'],
            ['浓缩咖啡', '拿铁'],
            ['三明治', '卷饼'],
            ['意大利面', '米饭'],
            ['奶酪', '黄油'],
            ['拉面', '河粉'],
            ['矿泉水', '苏打水'],
            ['鸡肉', '鱼肉'],
            ['香蕉', '葡萄'],
            ['酸奶', '布丁'],
            ['甜甜圈', '贝果'],
            ['蜂蜜', '白糖'],
            ['牛排', '猪肉'],
            ['红酒', '啤酒'],
            ['麦片', '燕麦'],
            ['面条', '粉丝'],
            ['鸡蛋', '煎蛋'],
            ['泡菜', '橄榄'],
            ['火锅', '烧烤'],
            ['包子', '饺子'],
            ['粥', '汤面'],
            ['豆浆', '牛奶'],
            ['月饼', '汤圆'],
            ['炸鸡', '烤鸭'],
            ['小笼包', '煎饺'],
            ['奶茶', '果茶'],
            ['寿司', '刺身'],
            ['麻辣烫', '关东煮']
        ],
        '动物': [
            ['猫', '狗'],
            ['狮子', '老虎'],
            ['小狗', '兔子'],
            ['鸟', '鱼'],
            ['牛', '马'],
            ['金鱼', '热带鱼'],
            ['孔雀', '火鸡'],
            ['水獭', '海狸'],
            ['老鼠', '田鼠'],
            ['鸭子', '鹅'],
            ['熊', '狼'],
            ['螃蟹', '龙虾'],
            ['蛇', '蜥蜴'],
            ['山羊', '绵羊'],
            ['老鹰', '鹰'],
            ['青蛙', '癞蛤蟆'],
            ['猴子', '猩猩'],
            ['鹿', '麋鹿'],
            ['蝴蝶', '飞蛾'],
            ['蜜蜂', '黄蜂'],
            ['猪', '野猪'],
            ['鸡', '公鸡'],
            ['大象', '犀牛'],
            ['斑马', '驴'],
            ['鲸鱼', '海豚'],
            ['鲨鱼', '魔鬼鱼'],
            ['乌龟', '陆龟'],
            ['猫头鹰', '乌鸦'],
            ['狐狸', '浣熊'],
            ['松鼠', '花栗鼠'],
            ['熊猫', '浣熊'],
            ['企鹅', '海豹'],
            ['袋鼠', '考拉'],
            ['长颈鹿', '河马'],
            ['蜘蛛', '蝎子']
        ],
        '物品': [
            ['手机', '平板'],
            ['椅子', '沙发'],
            ['书', '杂志'],
            ['笔', '铅笔'],
            ['汽车', '公交车'],
            ['手表', '时钟'],
            ['包', '背包'],
            ['杯子', '玻璃杯'],
            ['钥匙', '锁'],
            ['鞋子', '靴子'],
            ['帽子', '鸭舌帽'],
            ['相机', '摄像头'],
            ['台灯', '蜡烛'],
            ['镜子', '窗户'],
            ['盘子', '碗'],
            ['勺子', '叉子'],
            ['毛巾', '抹布'],
            ['枕头', '毯子'],
            ['遥控器', '手柄'],
            ['钱包', '手提包'],
            ['自行车', '摩托车'],
            ['电脑', '笔记本电脑'],
            ['电视', '显示器'],
            ['冰箱', '冷冻柜'],
            ['微波炉', '烤箱'],
            ['刷子', '梳子'],
            ['刀', '剪刀'],
            ['雨伞', '雨衣'],
            ['瓶子', '罐头'],
            ['盒子', '袋子'],
            ['充电器', '数据线'],
            ['耳机', '音响'],
            ['键盘', '鼠标'],
            ['打印机', '扫描仪'],
            ['风扇', '空调']
        ],
        '职业角色': [
            ['老师', '学生'],
            ['医生', '护士'],
            ['厨师', '服务员'],
            ['警察', '保安'],
            ['司机', '飞行员'],
            ['歌手', '舞蹈家'],
            ['作家', '编辑'],
            ['农民', '园丁'],
            ['艺术家', '设计师'],
            ['法官', '律师'],
            ['银行家', '收银员'],
            ['演员', '导演'],
            ['机械师', '工程师'],
            ['经理', '老板'],
            ['职员', '秘书'],
            ['士兵', '队长'],
            ['牙医', '心理医生'],
            ['理发师', '造型师'],
            ['邮递员', '快递员'],
            ['清洁工', '保洁员'],
            ['图书管理员', '档案员'],
            ['摄影师', '模特'],
            ['销售员', '顾客'],
            ['建筑工', '建筑师'],
            ['科学家', '研究员'],
            ['音乐家', '作曲家'],
            ['记者', '主播'],
            ['会计', '审计员'],
            ['翻译', '口译员'],
            ['教练', '训练师'],
            ['程序员', '黑客'],
            ['消防员', '救护员'],
            ['导游', '旅客'],
            ['裁缝', '模特'],
            ['厨师', '美食家']
        ],
        '娱乐': [
            ['电影', '电视剧'],
            ['音乐', '歌曲'],
            ['游戏', '运动'],
            ['聚会', '舞蹈'],
            ['小说', '故事'],
            ['剧院', '电影院'],
            ['演唱会', '表演'],
            ['喜剧', '戏剧'],
            ['魔术', '杂技'],
            ['动画', '漫画'],
            ['节日', '嘉年华'],
            ['竞猜', '比赛'],
            ['爱好', '活动'],
            ['笑话', '恶作剧'],
            ['表演', '演出'],
            ['广播', '播客'],
            ['卡拉OK', '唱歌'],
            ['象棋', '跳棋'],
            ['拼图', '谜语'],
            ['赛车', '跑步'],
            ['游泳', '跳水'],
            ['保龄球', '高尔夫'],
            ['网球', '羽毛球'],
            ['篮球', '足球'],
            ['棒球', '乒乓球'],
            ['绘画', '素描'],
            ['烹饪', '烘焙'],
            ['阅读', '写作'],
            ['购物', '逛街'],
            ['旅游', '徒步'],
            ['钓鱼', '野餐'],
            ['桌游', '手游'],
            ['直播', '短视频'],
            ['摄影', '摄像'],
            ['健身', '瑜伽']
        ],
        '自然天气': [
            ['太阳', '月亮'],
            ['雨', '雪'],
            ['树', '花'],
            ['山', '丘陵'],
            ['海洋', '湖泊'],
            ['风', '微风'],
            ['云', '天空'],
            ['河流', '小溪'],
            ['海滩', '沙漠'],
            ['森林', '花园'],
            ['岩石', '石头'],
            ['火', '冰'],
            ['星星', '行星'],
            ['山谷', '峡谷'],
            ['岛屿', '海岸'],
            ['雷声', '闪电'],
            ['雾', '薄雾'],
            ['日落', '日出'],
            ['春天', '夏天'],
            ['冬天', '秋天'],
            ['草', '苔藓'],
            ['叶子', '树枝'],
            ['池塘', '水池'],
            ['田野', '草地'],
            ['洞穴', '隧道'],
            ['悬崖', '山脊'],
            ['火山', '地震'],
            ['潮汐', '波浪'],
            ['沙子', '泥土'],
            ['彩虹', '极光'],
            ['台风', '暴雨'],
            ['霜', '露水'],
            ['冰雹', '雪花'],
            ['龙卷风', '飓风'],
            ['干旱', '洪水']
        ],
        '搞笑': [
            ['香蕉', '黄瓜'],
            ['洗澡', '淋浴'],
            ['肚子', '屁股'],
            ['蛋糕', '便便'],
            ['糖果', '药片'],
            ['避孕套', '气球'],
            ['放屁', '打嗝'],
            ['手指', '脚趾'],
            ['头发', '毛发'],
            ['亲吻', '拍打'],
            ['口红', '蜡笔'],
            ['按摩', '挠痒'],
            ['牛奶', '汗水'],
            ['胡子', '眉毛'],
            ['乳头', '肚脐'],
            ['鼻子', '屁股'],
            ['睡衣', '内衣'],
            ['内裤', '短裤'],
            ['枕头', '胸部'],
            ['肥皂', '洗发水'],
            ['袜子', '手套'],
            ['毛衣', '胸罩'],
            ['卫生纸', '餐巾纸'],
            ['牙刷', '毛刷'],
            ['牙膏', '面霜'],
            ['内衣', '比基尼'],
            ['舔', '吸'],
            ['挠痒', '戳'],
            ['喷射', '喷洒'],
            ['挤压', '捏'],
            ['上厕所', '洗手间'],
            ['尿尿', '便便'],
            ['鼻屎', '耳屎'],
            ['口水', '鼻涕'],
            ['打呼噜', '磨牙']
        ],
        '运动健身': [
            ['瑜伽', '普拉提'],
            ['跑步', '快走'],
            ['健身房', '操场'],
            ['跑步机', '动感单车'],
            ['哑铃', '杠铃'],
            ['俯卧撑', '仰卧起坐'],
            ['蛋白粉', '增肌粉'],
            ['瑜伽垫', '运动垫'],
            ['跑鞋', '板鞋'],
            ['深蹲', '硬拉'],
            ['有氧', '无氧'],
            ['私教', '团课'],
            ['拉伸', '热身'],
            ['卧推', '划船'],
            ['波比跳', '开合跳'],
            ['平板支撑', '卷腹'],
            ['骑车', '跑步'],
            ['撸铁', '跑步'],
            ['拳击', '散打'],
            ['跳绳', '跑步'],
            ['引体向上', '俯卧撑'],
            ['游泳', '跑步'],
            ['运动背心', '速干衣'],
            ['水壶', '保温杯'],
            ['护腕', '护膝'],
            ['泡沫轴', '筋膜枪'],
            ['运动手环', '计步器'],
            ['休息日', '训练日'],
            ['增肌', '减脂'],
            ['组数', '次数'],
            ['慢跑', '暴走'],
            ['腹肌', '马甲线'],
            ['麒麟臂', '蝴蝶袖'],
            ['晨跑', '夜跑'],
            ['爬山', '徒步'],
            ['广场舞', '健身操'],
            ['打卡', '偷懒'],
            ['撸铁', '跳操'],
            ['力竭', '保留'],
            ['增重', '减重'],
            ['塑形', '增肌'],
            ['体脂', '体重'],
            ['代餐', '轻食'],
            ['健身餐', '水煮鸡胸'],
            ['蛋白棒', '能量棒'],
            ['运动饮料', '盐水'],
            ['健身镜', '体重秤'],
            ['健身包', '运动包'],
            ['运动鞋', '跑鞋'],
            ['发带', '头巾']
        ],
        '科技数码': [
            ['手机', '平板'],
            ['WiFi', '流量'],
            ['APP', '小程序'],
            ['微信', 'QQ'],
            ['朋友圈', '微博'],
            ['在线看', '下载'],
            ['网盘', '硬盘'],
            ['密码', '指纹'],
            ['截图', '录屏'],
            ['话题', '热搜'],
            ['点赞', '转发'],
            ['粉丝', '关注'],
            ['消息', '通知'],
            ['表情包', '贴纸'],
            ['视频通话', '语音通话'],
            ['百度', '搜狗'],
            ['网站', 'APP'],
            ['上传', '下载'],
            ['登录', '扫码'],
            ['更新', '升级'],
            ['Bug', '卡顿'],
            ['AI', '智能'],
            ['VR', 'AR'],
            ['虚拟币', '区块链'],
            ['数字藏品', 'NFT'],
            ['播客', '音频'],
            ['电子书', 'PDF'],
            ['U盘', '移动硬盘'],
            ['路由器', '光猫'],
            ['杀毒', '防火墙'],
            ['备份', '云同步'],
            ['缓存', '内存'],
            ['垃圾短信', '骚扰电话'],
            ['文件夹', '压缩包'],
            ['文档', '表格'],
            ['复制', '粘贴'],
            ['保存', '另存为'],
            ['键盘', '鼠标'],
            ['触屏', '手写'],
            ['充电器', '数据线'],
            ['笔记本', '台式机'],
            ['固态', '机械'],
            ['内存条', '硬盘'],
            ['CPU', 'GPU'],
            ['显卡', '集显'],
            ['分辨率', '刷新率'],
            ['帧数', '延迟'],
            ['网速', '延迟'],
            ['云服务器', '服务器'],
            ['域名', 'IP']
        ],
        '旅行地点': [
            ['机场', '高铁站'],
            ['酒店', '民宿'],
            ['护照', '身份证'],
            ['行李箱', '背包'],
            ['机票', '高铁票'],
            ['游客', '导游'],
            ['黄金周', '小长假'],
            ['邮轮', '游船'],
            ['露营', '农家乐'],
            ['故宫', '长城'],
            ['古镇', '古城'],
            ['一线城市', '二线城市'],
            ['北上广深', '新一线'],
            ['火锅店', '烧烤店'],
            ['奶茶店', '咖啡厅'],
            ['商场', '步行街'],
            ['公园', '广场'],
            ['动物园', '海洋馆'],
            ['寺庙', '道观'],
            ['景区', '网红地'],
            ['海边', '山区'],
            ['特产', '纪念品'],
            ['高德', '百度地图'],
            ['跟团游', '自由行'],
            ['登机牌', '健康码'],
            ['办理入住', '退房'],
            ['倒时差', '调时差'],
            ['换钱', '刷卡'],
            ['免税店', '代购'],
            ['行程单', '攻略'],
            ['打车', '网约车'],
            ['公交', '地铁'],
            ['地铁', '高铁'],
            ['轮渡', '索道'],
            ['租车', '包车'],
            ['快捷酒店', '客栈'],
            ['民宿', '青旅'],
            ['五星酒店', '度假酒店'],
            ['团餐', '自助餐'],
            ['小吃街', '夜市'],
            ['观景台', '玻璃栈道'],
            ['沙滩', '海岛'],
            ['雪山', '冰川'],
            ['峡谷', '溶洞'],
            ['沙漠', '草原'],
            ['森林', '湿地'],
            ['古刹', '道场'],
            ['皇宫', '园林'],
            ['石窟', '壁画'],
            ['桥梁', '塔楼']
        ],
        '情感关系': [
            ['男朋友', '女朋友'],
            ['老公', '老婆'],
            ['谈恋爱', '处对象'],
            ['相亲', '自由恋爱'],
            ['暗恋', '表白'],
            ['520', '七夕'],
            ['求婚', '订婚'],
            ['领证', '办婚礼'],
            ['蜜月', '旅行结婚'],
            ['浪漫', '仪式感'],
            ['撩', '追'],
            ['分手', '失恋'],
            ['前任', '前女友'],
            ['单身狗', '母胎solo'],
            ['脱单', '恋爱'],
            ['信任', '安全感'],
            ['吃醋', '吃飞醋'],
            ['吵架', '冷战'],
            ['和好', '复合'],
            ['真爱', '命中注定'],
            ['好人卡', '备胎'],
            ['有感觉', '没感觉'],
            ['渣男', '渣女'],
            ['舔狗', '海王'],
            ['宠溺', '偏爱'],
            ['绿茶', '中央空调'],
            ['异地', '同城'],
            ['专一', '花心'],
            ['试婚', '闪婚'],
            ['同居', '合租'],
            ['对象', '另一半'],
            ['宝贝', '老婆大人'],
            ['未婚夫', '未婚妻'],
            ['新婚', '蜜月期'],
            ['约会', '吃饭看电影'],
            ['亲亲', '抱抱'],
            ['牵手', '搂腰'],
            ['夸', '哄'],
            ['送礼物', '发红包'],
            ['玫瑰', '口红'],
            ['情话', '早安晚安'],
            ['想你', '秒回'],
            ['心动', '怦然'],
            ['来电', '默契'],
            ['暧昧', '试探'],
            ['官宣', '公开'],
            ['开放关系', '各玩各的'],
            ['分居', '冷静期'],
            ['放下', '走出来'],
            ['接盘侠', '工具人']
        ],
        '品牌名称': [
            ['苹果', '华为'],
            ['耐克', '阿迪'],
            ['麦当劳', '肯德基'],
            ['可乐', '雪碧'],
            ['星巴克', '瑞幸'],
            ['百度', '搜狗'],
            ['微信', 'QQ'],
            ['抖音', '快手'],
            ['淘宝', '京东'],
            ['爱奇艺', '腾讯视频'],
            ['网易云', 'QQ音乐'],
            ['王者荣耀', '和平精英'],
            ['苹果', '小米'],
            ['联想', '华硕'],
            ['特斯拉', '蔚来'],
            ['奔驰', '宝马'],
            ['本田', '丰田'],
            ['大众', '奥迪'],
            ['宜家', '红星美凯龙'],
            ['盒马', '永辉'],
            ['LV', '香奈儿'],
            ['劳力士', '欧米茄'],
            ['支付宝', '微信支付'],
            ['滴滴', '高德'],
            ['美团', '饿了么'],
            ['必胜客', '达美乐'],
            ['海底捞', '呷哺'],
            ['喜茶', '奈雪'],
            ['优衣库', 'Zara'],
            ['李宁', '安踏'],
            ['美团', '拼多多'],
            ['饿了么', '美团外卖'],
            ['钉钉', '飞书'],
            ['B站', '小红书'],
            ['知乎', '豆瓣'],
            ['斗鱼', '虎牙'],
            ['得物', '识货'],
            ['BOSS直聘', '前程无忧'],
            ['云闪付', '数字人民币'],
            ['花呗', '白条'],
            ['顺丰', '中通'],
            ['圆通', '韵达'],
            ['比亚迪', '吉利'],
            ['理想', '小鹏'],
            ['红旗', '五菱'],
            ['哈弗', '长城'],
            ['古驰', '爱马仕'],
            ['普拉达', '巴宝莉'],
            ['周大福', '周生生'],
            ['茅台', '五粮液']
        ],
        '历史人物': [
            ['秦始皇', '汉武帝'],
            ['唐太宗', '康熙'],
            ['孔子', '老子'],
            ['诸葛亮', '司马懿'],
            ['李白', '杜甫'],
            ['关羽', '张飞'],
            ['岳飞', '文天祥'],
            ['李世民', '朱元璋'],
            ['武则天', '慈禧'],
            ['王昭君', '貂蝉'],
            ['项羽', '刘邦'],
            ['曹操', '刘备'],
            ['花木兰', '穆桂英'],
            ['郑和', '张骞'],
            ['孟子', '荀子'],
            ['成吉思汗', '忽必烈'],
            ['杨贵妃', '西施'],
            ['孙中山', '毛泽东'],
            ['鲁迅', '胡适'],
            ['宋庆龄', '宋美龄'],
            ['马克思', '恩格斯'],
            ['爱因斯坦', '牛顿'],
            ['爱迪生', '特斯拉'],
            ['拿破仑', '恺撒'],
            ['亚历山大', '汉尼拔'],
            ['达芬奇', '米开朗基罗'],
            ['贝多芬', '莫扎特'],
            ['李时珍', '华佗'],
            ['孙武', '吴起'],
            ['屈原', '陶渊明'],
            ['苏轼', '辛弃疾'],
            ['白居易', '李商隐'],
            ['王维', '孟浩然'],
            ['韩愈', '柳宗元'],
            ['欧阳修', '王安石'],
            ['范仲淹', '曾国藩'],
            ['林则徐', '左宗棠'],
            ['荆轲', '聂政'],
            ['张良', '韩信'],
            ['卫青', '霍去病'],
            ['包拯', '海瑞'],
            ['郑成功', '戚继光'],
            ['墨子', '庄子'],
            ['韩非', '商鞅'],
            ['扁鹊', '张仲景'],
            ['唐玄奘', '鉴真'],
            ['玄奘', '慧能'],
            ['黄帝', '炎帝'],
            ['大禹', '后羿'],
            ['苏武', '霍光']
        ]
    }
};

// 检查用户是否有会员权限
async function isPremiumUser() {
    // 使用全局 authManager 检查会员状态
    if (window.authManager) {
        return await window.authManager.checkUserPremiumStatus();
    }
    return false;
}

async function startGame() {
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const undercoverCount = parseInt(document.getElementById('undercoverCount').value);
    const whiteCount = parseInt(document.getElementById('whiteCount').value);
    const useCustomWords = document.getElementById('useCustomWords').checked;
    const selectedCategory = document.getElementById('categorySelect').value;

    if (undercoverCount + whiteCount >= playerCount) {
        alert('卧底和白板玩家人数过多！');
        return;
    }

    // 初始化玩家
    gameState.players = Array(playerCount).fill('平民');

    // 根据自定义输入或随机选择设置词汇
    if (useCustomWords) {
        const civilianWord = document.getElementById('customCivilianWord').value.trim();
        const undercoverWord = document.getElementById('customUndercoverWord').value.trim();

        if (!civilianWord || !undercoverWord) {
            alert('请输入平民和卧底词汇');
            return;
        }

        gameState.civilianWord = civilianWord;
        gameState.undercoverWord = undercoverWord;
    } else {
        let availableWordPairs = [];

        if (selectedCategory === 'all') {
            // 合并所有分类
            Object.values(gameState.wordsByCategory).forEach(categoryPairs => {
                availableWordPairs = availableWordPairs.concat(categoryPairs);
            });
        } else {
            // 使用特定分类
            if (gameState.wordsByCategory[selectedCategory]) {
                availableWordPairs = gameState.wordsByCategory[selectedCategory];
            }
        }

        if (availableWordPairs.length === 0) {
            alert('所选分类没有可用的词汇对！');
            return;
        }

        const wordPair = availableWordPairs[Math.floor(Math.random() * availableWordPairs.length)];
        gameState.civilianWord = wordPair[0];
        gameState.undercoverWord = wordPair[1];
    }

    // 分配卧底玩家
    for (let i = 0; i < undercoverCount; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * playerCount);
        } while (gameState.players[index] !== '平民');
        gameState.players[index] = '卧底';
    }

    // 分配白板玩家
    for (let i = 0; i < whiteCount; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * playerCount);
        } while (gameState.players[index] !== '平民');
        gameState.players[index] = '白板';
    }

    document.getElementById('setup-section').classList.add('hidden');
    document.getElementById('word-section').classList.remove('hidden');
    showWord();
}

function showWord() {
    const playerNum = gameState.currentPlayer + 1;
    document.getElementById('currentPlayer').textContent = playerNum;

    let word;
    const playerRole = gameState.players[gameState.currentPlayer];
    if (playerRole === '平民') {
        word = gameState.civilianWord;
    } else if (playerRole === '卧底') {
        word = gameState.undercoverWord;
    } else { // 白板
        word = '白板';
    }

    document.getElementById('wordDisplay').textContent = word;

    // 重置翻转卡片状态
    const flipCard = document.querySelector('.flip-card');
    flipCard.classList.remove('flipped');

    // 移除之前的点击事件监听器
    flipCard.onclick = null;

    // 添加新的点击事件监听器
    let hasBeenFlipped = false;
    flipCard.onclick = function () {
        if (!hasBeenFlipped) {
            this.classList.add('flipped');
            hasBeenFlipped = true;
        }
    };

    // 始终显示"下一位玩家"按钮
    document.querySelector('button[onclick="nextPlayer()"]').style.display = 'inline-block';
}

function nextPlayer() {
    gameState.currentPlayer++;
    if (gameState.currentPlayer >= gameState.players.length) {
        startVoting();
        return;
    }
    showWord();
}

function startVoting() {
    document.getElementById('word-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    updatePlayerList();
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    gameState.players.forEach((role, index) => {
        const playerNum = index + 1;
        const isEliminated = gameState.eliminatedPlayers.has(index);
        const playerDiv = document.createElement('div');
        playerDiv.className = `player ${isEliminated ? 'eliminated' : ''}`;

        // 为未被淘汰的玩家创建单选按钮
        if (!isEliminated) {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'playerVote';
            radio.value = index;
            radio.id = `player${playerNum}`;
            playerDiv.appendChild(radio);

            const label = document.createElement('label');
            label.htmlFor = `player${playerNum}`;
            label.textContent = ` 玩家 ${playerNum}`;
            playerDiv.appendChild(label);
        } else {
            playerDiv.textContent = `玩家 ${playerNum} (已淘汰)`;
        }

        playerList.appendChild(playerDiv);
    });
}

function eliminatePlayer() {
    const selectedPlayer = document.querySelector('input[name="playerVote"]:checked');
    if (!selectedPlayer) {
        alert('请选择一位玩家淘汰！');
        return;
    }

    const eliminatedIndex = parseInt(selectedPlayer.value);
    gameState.eliminatedPlayers.add(eliminatedIndex);

    const remainingPlayers = gameState.players.filter((_, index) =>
        !gameState.eliminatedPlayers.has(index)
    ).length;

    const remainingCivilians = gameState.players.filter((role, index) =>
        !gameState.eliminatedPlayers.has(index) && role === '平民'
    ).length;

    const remainingUndercover = gameState.players.filter((role, index) =>
        !gameState.eliminatedPlayers.has(index) && role === '卧底'
    ).length;

    updatePlayerList();

    // 检查获胜者
    if (remainingPlayers === 2) {
        // 游戏结束时隐藏淘汰按钮
        document.querySelector('button[onclick="eliminatePlayer()"]').style.display = 'none';

        if (remainingUndercover === 0) {
            alert('平民获胜！所有卧底玩家都被淘汰了！');
        } else if (remainingUndercover === 2) {
            alert('卧底玩家获胜！最后两位玩家都是卧底！');
        } else if (remainingUndercover === 1 && remainingCivilians === 1) {
            alert('卧底玩家获胜！成功潜伏到最后！');
        }
    }
}

function resetGame() {
    const originalWordsByCategory = gameState.wordsByCategory;
    gameState = {
        players: [],
        currentPlayer: 0,
        civilianWord: '',
        undercoverWord: '',
        eliminatedPlayers: new Set(),
        selectedCategories: ['食物饮品', '动物', '物品', '职业角色', '娱乐', '自然天气', '搞笑'],
        wordsByCategory: originalWordsByCategory
    };

    // 游戏重置时再次显示淘汰按钮
    document.querySelector('button[onclick="eliminatePlayer()"]').style.display = 'inline-block';

    document.getElementById('game-section').classList.add('hidden');
    document.getElementById('word-section').classList.add('hidden');
    document.getElementById('setup-section').classList.remove('hidden');
}

// 显示会员弹窗
function showPremiumModal() {
    document.getElementById('premium-modal').classList.remove('hidden');
}

// 关闭会员弹窗
function closePremiumModal() {
    document.getElementById('premium-modal').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const useCustomWordsCheckbox = document.getElementById('useCustomWords');
    const customWordsSection = document.getElementById('customWordsSection');

    useCustomWordsCheckbox.addEventListener('change', function () {
        customWordsSection.style.display = this.checked ? 'block' : 'none';
    });
});