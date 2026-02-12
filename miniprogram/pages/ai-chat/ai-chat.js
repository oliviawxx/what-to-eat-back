Page({
  data: {
    inputText: '',
    messages: [],
    scrollToId: '',
    nextId: 1
  },

  onInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  onSend() {
    const text = (this.data.inputText || '').trim();
    if (!text) return;

    const id = this.data.nextId;
    const userMsg = { 
      id: id, 
      text: text, 
      role: 'user' // 明确身份为用户
    };

    this.setData({
      inputText: '',
      messages: this.data.messages.concat(userMsg),
      nextId: id + 1,
      scrollToId: 'bottom-anchor'
    });

    // 模拟 AI 回复
    setTimeout(() => {
      const aiId = this.data.nextId;
      const aiMsg = {
        id: aiId,
        text: '收到！小云吞正在为你思考...',
        role: 'ai'
      };
      this.setData({
        messages: this.data.messages.concat(aiMsg),
        nextId: aiId + 1,
        scrollToId: 'bottom-anchor'
      });
    }, 800);
  }
});