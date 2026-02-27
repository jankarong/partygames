const dirtyParanoiaQuestions = [
  { mode: "热身", text: "在场谁最会不经意散发暧昧感？" },
  { mode: "热身", text: "在场谁最可能半夜先发试探消息？" },
  { mode: "热身", text: "在场谁看起来最稳，其实最会撩？" },
  { mode: "热身", text: "在场谁最容易让人心动又紧张？" },
  { mode: "热身", text: "在场谁最容易被一句话就逗脸红？" },
  { mode: "辛辣", text: "在场谁最可能公开很正经，私下最会说情话？" },
  { mode: "辛辣", text: "在场谁最可能深夜发最冒险的一条消息？" },
  { mode: "辛辣", text: "在场谁最可能偷偷喜欢角色扮演？" },
  { mode: "辛辣", text: "在场谁最可能把普通约会变成高能局？" },
  { mode: "辛辣", text: "在场谁在亲密关系里最有主导气场？" },
  { mode: "辛辣", text: "在场谁最可能为了气氛故意加码问题？" },
  { mode: "辛辣", text: "在场谁最可能有不能公开说的刺激回忆？" },
  { mode: "辛辣", text: "在场谁最会用眼神先让人破防？" },
  { mode: "辛辣", text: "在场谁看着最安静，实际上最敢？" },
  { mode: "辛辣", text: "在场谁最可能策划一个让人难忘的夜晚？" },
  { mode: "高能", text: "在场谁最可能先打破你们的“约法三章”？" },
  { mode: "高能", text: "在场谁最可能同时被两个人暗恋？" },
  { mode: "高能", text: "在场谁最可能消失一周又突然回来很会聊？" },
  { mode: "高能", text: "在场谁最可能不小心把秘密说漏？" },
  { mode: "高能", text: "在场谁最可能嘴上说不在意，心里最在意？" },
  { mode: "高能", text: "在场谁最可能在深夜局里最难让人拒绝？" },
  { mode: "高能", text: "在场谁最可能把这局玩成真故事？" },
  { mode: "高能", text: "在场谁最可能用一条语音让全场炸锅？" },
  { mode: "高能", text: "在场谁最可能成为今晚最危险的吸引力？" },
  { mode: "高能", text: "在场谁最可能一句“就喝一杯”带偏全场？" },
  { mode: "热身", text: "在场谁最可能最会装淡定？" },
  { mode: "热身", text: "在场谁最容易被起哄后接招？" },
  { mode: "热身", text: "在场谁最可能先暴露自己有好感的人？" },
  { mode: "热身", text: "在场谁最容易把玩笑开成暧昧？" },
  { mode: "热身", text: "在场谁最可能稳住局面不尴尬？" },
  { mode: "辛辣", text: "在场谁最可能有隐藏版“反差”一面？" },
  { mode: "辛辣", text: "在场谁最可能主动发第一条撩人消息？" },
  { mode: "辛辣", text: "在场谁最可能会吃醋但假装没事？" },
  { mode: "辛辣", text: "在场谁最可能先打破自己定的规则？" },
  { mode: "辛辣", text: "在场谁最可能靠眼神就控场？" },
  { mode: "辛辣", text: "在场谁最可能喜欢上“不该喜欢”的人？" },
  { mode: "辛辣", text: "在场谁最可能在聚会里先迈出关键一步？" },
  { mode: "辛辣", text: "在场谁最可能最会保守刺激秘密？" },
  { mode: "辛辣", text: "在场谁最可能问出最狠的一题？" },
  { mode: "辛辣", text: "在场谁最可能故意撩一下看反应？" },
  { mode: "高能", text: "在场谁最可能无意间制造三角关系？" },
  { mode: "高能", text: "在场谁最可能中途消失回来带大瓜？" },
  { mode: "高能", text: "在场谁最可能凌晨给前任发消息？" },
  { mode: "高能", text: "在场谁最可能不小心公开群内秘密？" },
  { mode: "高能", text: "在场谁最可能成为全场意外心动对象？" },
  { mode: "高能", text: "在场谁最可能把游戏玩成告白局？" },
  { mode: "高能", text: "在场谁最可能一句话把人分阵营？" },
  { mode: "高能", text: "在场谁最可能最后带走最多故事？" },
  { mode: "高能", text: "在场谁最可能把小传闻放大成大戏？" },
  { mode: "高能", text: "在场谁最可能每一轮都被点名？" }
];

let currentIndex = 0;
function renderQuestion() {
  const q = dirtyParanoiaQuestions[currentIndex];
  document.getElementById("questionNumber").textContent = `第 ${currentIndex + 1} 题 / 共 ${dirtyParanoiaQuestions.length} 题`;
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("questionMode").textContent = q.mode;
}
function nextQuestion() { currentIndex = (currentIndex + 1) % dirtyParanoiaQuestions.length; renderQuestion(); }
function previousQuestion() { currentIndex = (currentIndex - 1 + dirtyParanoiaQuestions.length) % dirtyParanoiaQuestions.length; renderQuestion(); }
function randomQuestion() { currentIndex = Math.floor(Math.random() * dirtyParanoiaQuestions.length); renderQuestion(); }
document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document.getElementById("prevBtn").addEventListener("click", previousQuestion);
  document.getElementById("randomBtn").addEventListener("click", randomQuestion);
});
