let subsCenter = {
  eventList: {},
  on: function (key, fn) {
    if (!this.eventList[key]) {
      this.eventList[key] = []
    }
    this.eventList[key].push(fn)
  },
  emit: function(key, ...args) {
    if (!this.eventList[key] || this.eventList[key].length === 0) return
    this.eventList[key].forEach(cb => {
      cb.apply(this, args)
    });
  }
}

subsCenter.on('join', (position, salary) => {
  console.log('你的职位是：' + position);
  console.log('期望薪水：' + salary);
});
subsCenter.on('other', (skill, hobby) => {
  console.log('你的技能有： ' + skill);
  console.log('爱好： ' + hobby);
});

subsCenter.emit('join', '前端', 10000);
subsCenter.emit('join', '后端', 10000);
subsCenter.emit('other', '端茶和倒水', '足球');

