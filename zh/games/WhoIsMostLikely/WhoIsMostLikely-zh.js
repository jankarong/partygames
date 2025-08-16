const questions = [
    // 聚会搞笑类
    "...在聚会上跳桌子舞",
    "...第一次约会就接吻",
    "...在公共场所大声唱歌",
    "...半夜偷吃零食",
    "...酒后给前任打电话",
    "...旅行时迷路",
    "...在电影院睡着并打呼噜",
    "...在社交媒体上发太多自拍",
    "...在聚会上讲尴尬的故事",
    "...在朋友面前放屁并甩锅给别人",
    "...在婚礼上接到捧花",
    "...在聚会上尝试危险的大冒险",
    "...在公共场所穿不搭配的衣服",
    "...KTV唱歌唱到失声",
    "...在朋友面前哭",
    "...在聚会上跟陌生人调情",
    "...旅行时忘记带护照",
    "...在聚会上待到最晚",
    "...在朋友面前泄露秘密",
    "...跳舞但跳得很失败",

    // 日常尴尬类
    "...在公共场所绊倒",
    "...喝醉时开始谈论人生哲学",
    "...炫耀自己的成就",
    "...在聚会上尝试奇怪的食物",
    "...旅行时买无用的纪念品",
    "...在聚会上忘记时间",
    "...在朋友面前说出尴尬的真相",
    "...模仿明星",
    "...在公共场所把衣服穿反",
    "...喝醉时开始唱歌",
    "...跟朋友分享奇怪的梦",
    "...在聚会上玩危险游戏",
    "...旅行时迷路找不到酒店",
    "...聚会到天亮",
    "...泄露令人尴尬的秘密",
    "...跳舞失败但很搞笑",
    "...在公共场所绊倒并假装没事",
    "...喝醉时开始讲笑话",
    "...向朋友炫耀新衣服",
    "...在聚会上尝试奇葩食物",

    // 社交媒体类
    "...把消息发错给别人",
    "...在聚会上拍最尴尬的照片",
    "...见面后立刻忘记别人的名字",
    "...意外点赞别人很久以前的朋友圈",
    "...把最辣的菜当做招牌菜",
    "...意外和别人穿同款衣服",
    "...在聚会上创造最疯狂的舞步",
    "...发朋友圈后立刻删除",
    "...在群里发错表情包",
    "...把工作照片发到朋友圈",

    // 生活习惯类
    "...忘记带钥匙被锁在门外",
    "...在重要场合迟到",
    "...忘记关闹钟睡过头",
    "...把重要的事情忘得一干二净",
    "...在电梯里尴尬地碰到前任",
    "...在餐厅点菜时选择困难",
    "...买了很多不需要的东西",
    "...为了追剧熬夜到天亮",
    "...因为懒而点外卖一个月",
    "...把手机掉进厕所",

    // 恋爱情感类
    "...暗恋别人被发现",
    "...在朋友面前说甜腻的情话",
    "...为了恋爱改变自己的风格",
    "...在约会时紧张得说不出话",
    "...给暗恋的人发消息秒删",
    "...在朋友圈晒恩爱",
    "...为了见喜欢的人特意打扮",
    "...因为分手而大哭",
    "...偷偷关注前任的社交媒体",
    "...在情人节收到最多礼物",

    // 学习工作类
    "...在会议上睡着",
    "...上班时间偷偷刷手机",
    "...因为迟到编造奇葩理由",
    "...在办公室吃味道很重的食物",
    "...忘记重要的截止日期",
    "...在视频会议时忘记关麦克风",
    "...把私人消息发到工作群",
    "...在公司聚会上表现最活跃",
    "...因为加班而错过朋友聚会",
    "...在办公室里迷路",

    // 兴趣爱好类
    "...为了追星花光所有钱",
    "...为了游戏熬夜不睡觉",
    "...买了很多手办或周边",
    "...因为偶像而学习一门新语言",
    "...参加粉丝见面会排队最久",
    "...为了演唱会从外地赶来",
    "...在朋友面前安利自己的爱豆",
    "...因为追剧而哭得稀里哗啦",
    "...为了看比赛熬夜看直播",
    "...买了很多同一个明星的专辑",

    // 饮食相关类
    "...点外卖时选择困难",
    "...吃辣椒辣得眼泪直流还要继续吃",
    "...为了美食排队最久",
    "...在餐厅拍照拍到菜都凉了",
    "...尝试最奇怪的食物组合",
    "...因为减肥而拒绝所有美食",
    "...半夜饿了起床找吃的",
    "...为了省钱连续吃泡面",
    "...在火锅店吃到最后一个离开",
    "...把甜品当正餐吃",

    // 运动健康类
    "...办了健身卡但从不去",
    "...跑步五分钟就累得不行",
    "...为了拍照而假装运动",
    "...在健身房迷路找不到器械",
    "...因为懒而放弃所有运动计划",
    "...在瑜伽课上睡着",
    "...买了很多运动装备但不运动",
    "...为了健康而制定各种计划但不执行",
    "...在运动时受最轻微的伤",
    "...把散步当做激烈运动",

    // 旅行出游类
    "...旅行时行李超重",
    "...在景点拍照拍到忘记看风景",
    "...旅行时迷路但不愿意问路",
    "...为了省钱选择最便宜的住宿",
    "...旅行时买最多纪念品",
    "...在飞机上睡得最死",
    "...旅行时忘记带重要物品",
    "...为了旅行而学习当地语言",
    "...在旅行中结识最多朋友",
    "...旅行回来后最舍不得回到现实"
];

let usedQuestions = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    nextQuestionBtn.textContent = '开始游戏';
    nextQuestionBtn.addEventListener('click', nextQuestion);
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }
    
    // 初始化问题显示
    document.getElementById('questionText').textContent = '点击"开始游戏"获取第一个问题！';
});

function nextQuestion() {
    // 第一次点击后改变按钮文字
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = '下一题';
    
    // 获取未使用的问题
    let availableQuestions = questions.filter(q => !usedQuestions.has(q));
    if (availableQuestions.length === 0) {
        usedQuestions.clear();
        availableQuestions = questions;
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions[randomIndex];
    usedQuestions.add(currentQuestion);
    
    // 显示问题
    document.getElementById('questionText').innerHTML = `谁最可能<span class="highlight">${currentQuestion}</span>？`;
}

function resetGame() {
    usedQuestions.clear();
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = '开始游戏';
    document.getElementById('questionText').textContent = '点击"开始游戏"获取第一个问题！';
}